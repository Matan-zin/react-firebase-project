import { useEffect } from "react";
import useDoc from "../../hooks/useDoc";
import { updateData } from "../../services/firebase";
import { useHistory } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import EmptyUserForm from "./EmptyUserForm"
import { PERMISSIONS, USERS } from "../../constants/collections";

export default function EditUser({ url }) {

    const history = useHistory();

    const id = JSON.parse(sessionStorage.getItem('id'));
    const { users } = useDoc(USERS, id); 
    const { permissions } = useDoc(PERMISSIONS, id);

    useEffect(() => { return () => sessionStorage.removeItem('id') },[]);

    const handleSubmit = async ({ user, permissions }) => {
        await updateData(USERS, user, id);
        await updateData(PERMISSIONS, permissions, id)
        history.push( url )
    }   

    return <>
            <h3>Edit User:</h3>
            { !(users && permissions) ? ( <Skeleton count={1} />
            ) : (  
            <EmptyUserForm 
                handleSubmit={(data) => handleSubmit(data)}
                user={users}
                userPermissions={permissions}
                url={url}
                btnName="Update"/>
            )
            }
           </>
}