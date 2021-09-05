import { useHistory } from "react-router-dom";
import { EDIT_USER } from "../../constants/routes";
import Skeleton from "react-loading-skeleton";
import useCollection from "../../hooks/useCollection";
import { deleteData } from "../../services/firebase";
import { PERMISSIONS, USERS } from "../../constants/collections";

export default function AllUsers({ url }) {

    const history = useHistory();

    const { users , setToRender } = useCollection(USERS); 
    const { permissions } = useCollection(PERMISSIONS);

    const storeId = (id) => {
        sessionStorage.setItem('id', JSON.stringify(id));
        history.push(url + EDIT_USER);
    };

    const handleDelete = async (docId) => {
       await deleteData(USERS, docId);
       await deleteData(PERMISSIONS, docId);
       setToRender({});
    }
    
    return (
        <>
        { !users ? 
        ( <Skeleton count={2} /> 
               ) : (
        users.map((user , index) => {
        return (
            <form 
                aria-label="User info"
                role="presentation"
                key={index}>

            { Object.entries(user).map(([key,value],index) => {
                if(key !== 'docId')
                return <p key={index}>{key}: {value}</p>
                else return null;
            })
            }
            <dl>
            <dt>Permissions:</dt>
            { !permissions ? ( <Skeleton count={1} /> ) : (
                
                permissions
                .filter(element => element.docId === user.docId)
                .map(obj => {
                    return Object.entries(obj)
                    .map(([key,value],index) => {
                        if(key !== 'docId' && value)
                        return <dd key={index}>{key}</dd>
                        else return null;
                    });
                }))
            }
            </dl>
            <button
                type="button"
                onClick={() => storeId(user.docId)} >
                    Edit
            </button>
            <button
                type="button"
                onClick={() => handleDelete(user.docId) }>
                  Delete
            </button>
            </form>
        )}))
        }
        </>
    );
            
};

