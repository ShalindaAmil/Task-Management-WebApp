import {createCOntext, useContext,useEffect, useState} from 'react';
import axios from 'axios';

const AuthContext = createCOntext();

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
    const login=()=>{
        windows.open(${process.env.REACT_APP_BACKEND_URL}/auth/google,'_self');
    };
    const logout=()=>{
        window.open(${process.env.REACT_APP_BACKEND_URL}/auth/logout,'_self');
    };

    returun (
        <AuthContext.Provider value={{user,loading,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuthContext = () => useContext(AuthContext);