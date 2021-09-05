import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListener() {
    
    const [userUid, setUserUid] = useState(JSON.parse(localStorage.getItem('authUserUID')));
    const { firebase } = useContext(FirebaseContext);
    
    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if(authUser) {
                localStorage.setItem('authUserUID', JSON.stringify(authUser.uid));
                setUserUid(authUser.uid);
            } else {
                localStorage.removeItem('authUserUID')
                setUserUid(null)
            }
        });
        
        return  () => listener();
    }, [firebase]);

    return { userUid };
}