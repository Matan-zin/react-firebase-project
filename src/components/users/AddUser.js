import { useHistory } from "react-router-dom";
import { updateData } from "../../services/firebase";
import { v4 as uuidv4 } from 'uuid'
import EmptyUserForm from "./EmptyUserForm";

export default function AddUser({ url }) {
    
    const history = useHistory();

    const emptyUser = {
        'First Name': '', 'Last Name': '',
        'Email': '', 'Created Date': '',
        'Session Time Out': ''
    }
    const emptyPermisisons = {
        'View Subscriptions': false, 'Create Subscriptions': false,
        'Delete Subscriptions': false, 'Update Subscriptions':false,
        'View Movies': false, 'Create Movies':false, 'Delete Movies':false,
        'Update Movies':false
    }

    const handleSubmit = async ({ user, permissions }) => {
        let uuid = uuidv4();
        await updateData('users', user, uuid);
        await updateData('permissions', permissions, uuid)
        history.push(url);
    };

    return <>
           <h3>Add User:</h3>
           <EmptyUserForm 
                user={emptyUser}
                userPermissions={emptyPermisisons}
                handleSubmit={(data) => handleSubmit(data)}
                url={url}
                btnName="Save"/>
           </>
}