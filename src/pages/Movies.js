import { useContext } from "react"
import { useRouteMatch, Switch, Route } from "react-router"
import Notfound from "./notfound";
import Skeleton from "react-loading-skeleton";
import Button from "../components/Button";
import AddMovie from '../components/movies/AddMovie';
import EditMovie from '../components/movies/EditMovie';
import AllMovies from '../components/movies/AllMovies';
import ProtectedRoute from "../halpers/ProtectedRoute";
import PermissionsContext from "../context/Permissions"
import { ADD_MOVIE, EDIT_MOVIE, DASHBOARD } from "../constants/routes";
import { CREATE_MOVIES, DELETE_MOVIES, UPDATE_MOVIES, VIEW_MOVIES } from "../constants/permissions";


export default function Movies() {

    const { isAdmin, permissions } = useContext(PermissionsContext);
    const { url, path } = useRouteMatch();

    const isAllVisible    = permissions?.[VIEW_MOVIES]   || isAdmin;
    const isAddVisible    = permissions?.[CREATE_MOVIES] || isAdmin;
    const isEditVisible   = permissions?.[UPDATE_MOVIES] || isAdmin;
    const isDeleteVisible = permissions?.[DELETE_MOVIES] || isAdmin;

    return (
        <>
        { !Boolean(permissions) ? ( <Skeleton count={2} /> 
           ) : (
           <>
           <h1>Movies</h1>

           { isAllVisible &&
           <Button name={'All Movies'} url={ url } />
           }{isAddVisible && 
           <Button name={'Add Movie'} url={url + ADD_MOVIE} />
           }
           <Switch>
           <ProtectedRoute exact path={path} bool={isAllVisible} redirect={DASHBOARD}>
                <AllMovies url={url} isDeleteVisible={isDeleteVisible} />
            </ProtectedRoute>

           <ProtectedRoute path={path + ADD_MOVIE} bool={isAddVisible} redirect={path}>
                <AddMovie url={url } />
            </ProtectedRoute>

            <ProtectedRoute path={path + EDIT_MOVIE} bool={isEditVisible} redirect={path}>
                <EditMovie url={url} />
            </ProtectedRoute>

            <Route component={Notfound} />
           </Switch>
           </>
        )}
        </>
    )
}