import { useContext } from "react"
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Button from "../components/Button";
import Skeleton from "react-loading-skeleton";
import Notfound from "./notfound";
import AddMember from "../components/subscriptions/AddMember";
import AllMembers from "../components/subscriptions/AllMembers";
import EditMember from "../components/subscriptions/EditMember";
import ProtectedRoute from "../halpers/ProtectedRoute";
import PermissionsContext from "../context/Permissions"
import { CREATE_SUBSCRIPTIONS, DELETE_SUBSCRIPTIONS, UPDATE_SUBSCRIPTIONS, VIEW_SUBSCRIPTIONS } from "../constants/permissions";
import { ADD_MEMBER, DASHBOARD, EDIT_MEMBER } from "../constants/routes";

export default function Subscriptions() {

    const { isAdmin, permissions } = useContext(PermissionsContext);
    const { url, path } = useRouteMatch();

    const isAllVisible    = permissions?.[VIEW_SUBSCRIPTIONS]   || isAdmin;
    const isAddVisible    = permissions?.[CREATE_SUBSCRIPTIONS] || isAdmin;
    const isEditVisible   = permissions?.[UPDATE_SUBSCRIPTIONS] || isAdmin;
    const isDeleteVisible = permissions?.[DELETE_SUBSCRIPTIONS] || isAdmin;

    return (
        <>
        { !Boolean(permissions) ? ( <Skeleton count={1} /> 
            ) : (
            <>
            <h1>Subscriptions</h1>

            { isAllVisible &&
            <Button name={'All Members'} url={ url } />
            }{ isAddVisible &&
            <Button name={'Add Member'} url={ url + ADD_MEMBER } />    
            }
            <Switch>
            <ProtectedRoute exact path={path} bool={isAllVisible} redirect={DASHBOARD}>
                <AllMembers url={url} isDeleteVisible={isDeleteVisible} />
            </ProtectedRoute>

            <ProtectedRoute path={path + EDIT_MEMBER} bool={isEditVisible} redirect={url}>
                <EditMember url={url} />
            </ProtectedRoute>

            <ProtectedRoute path={path + ADD_MEMBER} bool={isAddVisible} redirect={url}>
                <AddMember url={url} />
            </ProtectedRoute>

            <Route component={Notfound} />
            </Switch>
            </>
        )}
        </>
    )
}