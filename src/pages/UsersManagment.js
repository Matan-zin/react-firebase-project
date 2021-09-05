import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { ADD_USER, EDIT_USER } from '../constants/routes';
import AllUsers from '../components/users/AllUsers';
import AddUser from '../components/users/AddUser';
import EditUser from '../components/users/EditUser';
import Button from '../components/Button';
import Notfound from './notfound';


export default function Users() {

    const { url, path } = useRouteMatch();

    return (
        <>
        <h1>Users Managment</h1>
        <Button name={'All Users'} url={ url } />
        <Button name={'Add User'} url={ url + ADD_USER } /> 
        <Switch>
          <Route 
            exact path={ path }
            render={() => <AllUsers url={ url } /> }
            />
          <Route 
            path={ path + ADD_USER }
            render={() => <AddUser url={url} /> }
            /> 
          <Route 
            path={ path + EDIT_USER }
            render={() => <EditUser url={ url }/> }
            />
          <Route component={Notfound} />
        </Switch>
        </>
    )
}