import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/firebase.config";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleprovider = new GoogleAuthProvider();

const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    // Login
    const signin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Google Sign in
    const googlesignIN = () => {
        setLoading(true)
        return signInWithPopup(auth, googleprovider)
    }

    // Register
    const signup = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //logout
    const userlogout = () => {
        return signOut(auth)
    }

    // State  Change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser)
            if(currentUser){
                setLoading(false);
            }
            else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            
        })
        return () => {
            unsubscribe();
        }
    }, [])

    // User Update
    const update = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const information = {
        user,
        googlesignIN,
        signup,
        signin,
        update,
        userlogout,
        loading,
    }
    return (
        <AuthContext.Provider value={information}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;