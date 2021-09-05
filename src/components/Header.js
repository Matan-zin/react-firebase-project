import { useContext } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from '../constants/routes';
import FirebaseContext from "../context/firebase";
import PermissionsContext from "../context/Permissions";

export default function Header({ user }) {
    
    const { firebase } = useContext(FirebaseContext);
    const { isAdmin } = useContext(PermissionsContext); 

    const userName = isAdmin ? 'Admin' : user?.['First Name'];

    return (
    <header>
    <nav>
        <Link 
            to={ROUTES.MOVIES} 
            aria-label="movies">Movies
        </Link>
        <Link 
            to={ROUTES.SUBSCRIPTIONS}
            aria-label="subscriptions">Subscriptions
        </Link>
        { isAdmin &&
        <Link
            to={ROUTES.USERS_MANGMENT}
            aria-label="users">Users Managment
        </Link>
        }
        <span id="user-name">{userName}</span>
        <button
            type="button"
            onClick={() => {
                firebase.auth().signOut();
            }}>Log Out
        </button>
    </nav>
    </header>
    )
}