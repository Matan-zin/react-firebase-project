import { useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom";
import { DASHBOARD, SIGN_UP } from '../constants/routes'
import FirebaseContext from "../context/firebase";
import Authentication from "../components/Authentication";

export default function Login() {

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [error, setError] = useState('');

    const handleLogin = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            history.push(DASHBOARD);
        }
        catch(error) {
            setError(error.message);
        }
    };

    return (
        <div className="auth-page">
        <h3>Login</h3>
        <Authentication 
            handleSubmit={handleLogin}
            err={error}
            btnName={'Sign In'} />
        <span>
            New User ?:{` `}
            <Link to={SIGN_UP}>Create an Account</Link>
        </span>
        </div>
    )
}