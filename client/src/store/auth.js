import React, { useState } from 'react'
import Cookies from 'js-cookie'

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('twk_token')

    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const loginHandler = () => {
        token = localStorage.getItem('twk_token');
        setToken(token);
    }
    
    const logoutHandler = () => {
        localStorage.setItem('twk_token', null);
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext;