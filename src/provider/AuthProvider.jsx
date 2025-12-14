import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider;
const AuthProvider = ({children}) => {
    const [role, setRole] = useState("");
    console.log(role);
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                setLoading(false)
            })
        return () => unsubscribe();
    }, [])

    useEffect(()=> {
        if(!user) return;
        fetch(`http://localhost:5000/users/${user?.email}`)
        .then(res => res.json())
        .then(data => {
            setRole(data.role)
        })
        .catch(err => console.log(err))
    }, [user])

    const logOut = () => {
        setLoading(true);
        signOut(auth)
            .then()
            .catch(error => console.log(error))
    }
    const updateUser = (profileInfo) => {
        return updateProfile(auth.currentUser, profileInfo);
    }
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const AuthValue = {
        createUser,
        userLogin,
        logOut,
        signInWithGoogle,
        updateUser,
        user,
        setUser,
        loading,
        setLoading,
        role
    }
    return (
        <AuthContext value={AuthValue}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;