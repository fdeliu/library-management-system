import React, { useState, useEffect} from 'react'
import firebase from '../firebaseConfig.js'

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(setUser)
    },[])

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}

