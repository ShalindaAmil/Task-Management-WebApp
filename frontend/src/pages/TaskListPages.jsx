import{useState,useEffect}from 'react';
import {link, useActionData} from 'react-router-dom';
import axios from 'axios';
import{FiEdit,FiTrash2,FiPlus}from 'react-icons/fi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function TaskListPage(){
    const[tasks,setTasks]=useState([]);
    const[loading,setLoading]=useState(true);
    const[filter,setFilter]=useState('all');

    useEffect(()=>{
        const fetchTasks=async()=>{
            try {
                const {data}=await axios.get('./api/tasks',{withCredentials:true});
                setTasks(data);
            } catch (error) {
                console.error('Failed to fetch tasks');
            }finally{
                setLoading(false);
            }
        };
        fetchTasks();
    },[]);

    const deleteTask=async(id)=>{
        try {
                await axios.delete(`./api/tasks/${id}`,{withCredentials:true});
                setTasks(tasks.filter(task=>task._id!==id));
            } catch (error) {
                console.error('Failed to delete task');
            } 
    };

    const generatePDF=()=>{
        const doc=new jsPDF();
        doc.text('Task Report',14,15);

        const filteredTasks=filter==='all' ? tasks : tasks.filter(task=>task.status===filter);
        const tableData=filteredTasks.map(task=>[task.title,task.status,new Date(task.deadline).toLocaleDateString(),task.assignedTo]);

        doc.autoTable({
            head:[['Title','Status','Deadline','Assigned To']],
            body:tableData,
            startY:25,
        });
        doc.save('task_report.pdf');
    };

    const filteredTasks=filter==='all' ? tasks : tasks.filter(task=>task.status===filter);
    if (loading)return <div className="text-center py-10">Loading tasks...</div>;
    return(
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className='text-2x1 font-bold text-gray-800'>Task List</h1>
                <Link to="/tasks/add" className="flex item-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <FiPlus className="mr-2" />Add Task</Link>
            </div>

            <div className="gb-white rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b flex justify-between item-center">
                    <div className='flex space-x-2'>
                        <button onClick={()=>setFilter('all')} className={`px-3 py-1 rounded ${filter==='all'?'bg-blue-500 text-white':'bg-gray-200'}`}>All</button>
                        <button onClick={()=>setFilter('pending')} className={`px-3 py-1 rounded ${filter==='pending'?'bg-blue-500 text-white':'bg-gray-200'}`}>Pending</button>
                        <button onClick={()=>setFilter('inProgress')} className={`px-3 py-1 rounded ${filter==='In Progress'?'bg-blue-500 text-white':'bg-gray-200'}`}>In Progress</button>
                        <button onClick={()=>setFilter('Done')} className={`px-3 py-1 rounded ${filter==='Done'?'bg-blue-500 text-white':'bg-gray-200'}`}>Done</button>
                    </div>
                    <button onClick={generatePDF} className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700">Generate PDF</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Title</th>
                                <th className="py-2 px-4 border-b">Assigned</th>
                                <th className="py-2 px-4 border-b">Deadline</th>
                                <th className="py-2 px-4 border-b">Status</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.map(task=>(
                                <tr key={task._id}>
                                    <td className="py-2 px-4 border-b">{task.title}</td>
                                    <td className="py-2 px-4 border-b">{task.description}</td>
                                    <td className="py-2 px-4 border-b">{task.assignedTo}</td>
                                    <td className="py-2 px-4 border-b">{new Date(task.deadline).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : task.status === 'In Progress' ? 'bg-orange-100 text-orange-800' :  'bg-green-100 text-green-800'}`}>{task.status}</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link to={`/tasks/edit/${task._id}`}className="text-blue-600 hover:text-blue-900 mr-4"><FiEdit className="inline" /></Link>  
                                        <button onClick={()=>deleteTask(task._id)} className="text-red-500 hover:text-red-700 ml-3"><FiTrash2/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}