import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth=async()=>{
            try {
                const {data}=await axios.get('/auth/current_user',{withCredentials:true});
                setUser(data);
            } catch (err) {
                setUser(null);
            }finally{
                setLoading(false);
            }
        };
        checkAuth();
    },[]);
    const login = () => {
        window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, '_self');
    };
    
    const logout = () => {
        window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, '_self');
    };

    return (
        <AuthContext.Provider value={{user,loading,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create AuthContext
// const AuthContext = createContext();

// // AuthProvider component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Simulated login function
//   const login = () => {
//     window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, '_self');
//   };

//   // Simulated logout function
//   const logout = () => {
//     window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, '_self');
//   };

//   // Check if user is logged in on mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login/success`, {
//           credentials: 'include',
//         });
//         const data = await res.json();
//         setUser(data.user);
//       } catch (err) {
//         setUser(null);
//       }
//     };
//     fetchUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

