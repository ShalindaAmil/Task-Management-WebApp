// import { useEffect } from 'react';
// import { useAuth } from '../contexts/authcontext';
// import { useNavigate } from 'react-router-dom';
// import { FcGoogle } from 'react-icons/fc';

// export default function LoginPage() {
//   const { user, login } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) navigate('/');
//   }, [user, navigate]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
//         <div className="text-center">
//           <h2 className="text-3xl font-extrabold text-gray-900">Task Manager</h2>
//           <p className="mt-2 text-sm text-gray-600">Sign in with Google to manage your tasks</p>
//         </div>
//         <div className="mt-8">
//           <button
//             onClick={login}
//             className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//           >
//             <FcGoogle className="w-5 h-5 mr-2" />
//             Sign in with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulated login function
  const login = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, '_self');
  };

  // Simulated logout function
  const logout = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, '_self');
  };

  // Check if user is logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login/success`, {
          credentials: 'include',
        });
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
