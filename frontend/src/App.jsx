// import {BrowserRouter, Routes,Route,Navigate}from 'react-router-dom';
// import {AuthProvider,useAuth}from './contexts/authcontext';
// import LoginPage from './pages/LoginPage';
// //import DashboardPage from './pages/DashboardPage';
// import TaskListPage from './pages/TaskListPages';
// //import AddTaskPage from './pages/AddTaskPage';
// //import EditTaskPage from './pages/EditTaskPage';
// import Navbar from './components/Navbar';

// function App(){
//   return(
//     <AuthProvider>
//       <BrowserRouter>
//         <div className="min-h-screen bg-gray-100"> 
//           <Navbar/>
//           <div className="container mx-auto p-4">
//             <Routes>
//               <Route path="/" element={<Navigate to="/login" />} />
//               <Route path="/login" element={<LoginPage/>} />
//               <Route path="/dashboard" element={<DashboardPage/>} />
//               <Route path="/tasks" element={<TaskListPage/>} />
//               <Route path="/tasks/add" element={<AddTaskPage/>} />
//               <Route path="/tasks/edit/:id" element={<EditTaskPage/>} />
//             </Routes>
//            </div> 
//         </div>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// // const ProtectedRoute = ({children}) => {
// //   const{user, loading}=useAuth();
// //   if(loading){
// //     return <div className='text-center py-10'>Loading...</div>;
// //   }
// //   if(!user){
// //     return <Navigate to="/login" replace/>;
// //   }
// //   return children;
// // };

// export default App;




import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/authcontext'; // Adjusted to match correct file path
import LoginPage from './pages/LoginPage'; // Ensure LoginPage is imported correctly
import Navbar from './components/Navbar';
import TaskListPage from './pages/TaskListPages';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage/>} />
              <Route path="/tasks" element={<TaskListPage/>} />
              <Route path="/tasks/add" element={<AddTaskPage/>} />
              <Route path="/tasks/edit/:id" element={<EditTaskPage/>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
