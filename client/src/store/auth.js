import React, { useState } from 'react'
import Cookies from 'js-cookie'

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: () => {},
    // logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initialToken = Cookies.get('jwt')

    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const loginHandler = () => {
        token = Cookies.get('jwt')
        setToken(token);
    }
    
    // const logoutHandler = () => {
    //     Cookies.remove('jwt')
    // }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        // logout: logoutHandler
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext;