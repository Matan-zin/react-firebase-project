import { useState } from "react"
import { useHistory } from "react-router-dom";
import UserDetails from "./UserDetails";
import UserPermissions from "./UserPermissions";

export default function EmptyUserForm({
    handleSubmit,
    user,
    userPermissions,
    url,
    btnName})
{    
    const history = useHistory();
    
    const [permissions , setPermissions] = useState(userPermissions);
    const [tmpUser, setTmpUser] = useState(user);

    const handleChange = ({ name, value }) => {
        setTmpUser({...tmpUser, [name]: value})
    }

    const handleChecked = ({ name }) => {
        let tmp = permissions;

        if(name.search('View') === -1 && !(tmp[name])) { 
            // if ('Create' | 'Delte' | 'Update'), 
            // are set to true setting also 'View' to true 
            let str = name.split(' ');
            str = 'View ' + str[1].toString();
            if( !tmp[str] ) tmp[str] = true;
        }
        tmp[name] = !tmp[name];
        setPermissions({...tmp})
    }
    
    const handleLocalSubmit = (event) => {
        event.preventDefault();
        handleSubmit({ user: tmpUser , permissions: permissions });
    };

    return (
        <form onSubmit={handleLocalSubmit}>
           <UserDetails
                    user={tmpUser}
                    handleChange={handleChange} 
                    readonly={btnName === 'Update' ? true : false}/>

           <UserPermissions 
                    permissions={permissions}
                    handleChange={handleChecked} />

           <button type="submit">{btnName}</button>
           <button
                type="button"
                onClick={() => {
                    history.push(url); }}>
                Cancel
           </button>
        </form>
    )
}