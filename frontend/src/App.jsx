import {BrowserRouter, Routes,Route,Navigate}from 'react-router-dom';
//import {AuthProvider,useAuth}from './contexts/authcontext';
import LoginPage from './pages/LoginPage';
//import DashboardPage from './pages/DashboardPage';
//import TaskListPage from './pages/TaskListPage';
//import AddTaskPage from './pages/AddTaskPage';
//import EditTaskPage from './pages/EditTaskPage';
import Navbar from './components/Navbar';

function App(){
  return(
    // <AuthProvider>
    //   <BrowserRouter>
    //     <div className="min-h-screen bg-gray-100"> 
    //       <Navbar/>
    //       <div className="container mx-auto p-4">
    //         <Routes>
    //           <Route path="/" element={<Navigate to="/login" />} />
    //           <Route path="/login" element={<LoginPage/>} />
    //           <Route path="/dashboard" element={<DashboardPage/>} />
    //           <Route path="/tasks" element={<TaskListPage/>} />
    //           <Route path="/tasks/add" element={<AddTaskPage/>} />
    //           <Route path="/tasks/edit/:id" element={<EditTaskPage/>} />
    //         </Routes>
    //        </div> 
    //     </div>
    //   </BrowserRouter>
    // </AuthProvider>
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

// const ProtectedRoute = ({children}) => {
//   const{user, loading}=useAuth();
//   if(loading){
//     return <div className='text-center py-10'>Loading...</div>;
//   }
//   if(!user){
//     return <Navigate to="/login" replace/>;
//   }
//   return children;
// };

export default App;