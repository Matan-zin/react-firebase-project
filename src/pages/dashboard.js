import { lazy, Suspense, useContext ,useEffect} from "react"
import { Route, Switch } from "react-router-dom"
import * as ROUTES from '../constants/routes'
import { ADMIN_UID } from "../constants/.env.variables"
import { PERMISSIONS, USERS } from "../constants/collections"
import useDoc from "../hooks/useDoc"
import Header from '../components/Header'
import UserContext from "../context/user"
import FirebaseContext from "../context/firebase"
import PermissionsContext from "../context/Permissions"
import ProtectedRoute from "../halpers/ProtectedRoute"

const MINUTES = 1000 * 60;

const Movies        = lazy(() => import('../pages/Movies'));
const Subscriptions = lazy(() => import('../pages/Subscriptions'));
const UsersManagment= lazy(() => import('../pages/UsersManagment'));

export default function Dashboard() {

    const { firebase } = useContext(FirebaseContext)
    const { userUid } = useContext(UserContext);
    
    const isAdmin = userUid === ADMIN_UID;

    const { users } = useDoc(USERS ,userUid);
    const { permissions } = useDoc(PERMISSIONS, userUid)

    useEffect(() => {
    // check for the user session time out and create a timer to sign-out 
        if(!isAdmin && users) {
           const time = Number(users['Session Time Out']) * MINUTES;

           setTimeout(() => {
              firebase.auth().signOut();
           }, time)
        }
        // eslint-disable-next-line
    },[users]);

    return (
        <>
        <PermissionsContext.Provider value={{ isAdmin , permissions}}>
        <Header user={users} />
        <Suspense fallback={'Loading...'}>
        <Switch>
        <Route
            path={ROUTES.MOVIES}
            component={Movies}
            />
        <Route 
            path={ROUTES.SUBSCRIPTIONS}
            component={Subscriptions}
            />
        <ProtectedRoute
                path={ROUTES.USERS_MANGMENT}
                bool={isAdmin}
                redirect={ROUTES.DASHBOARD}>
            <UsersManagment />
        </ProtectedRoute>
        </Switch> 
        </Suspense>
        </PermissionsContext.Provider>
        </>
    )
}