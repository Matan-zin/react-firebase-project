import { useHistory } from 'react-router-dom';
import { useEffect } from 'react'
import useDoc from '../../hooks/useDoc'
import Skeleton from 'react-loading-skeleton';
import { updateData } from '../../services/firebase';
import { MEMBERS } from '../../constants/collections';
import EmptyMemberForm from './EmptyMemberForm';

export default function EditMember({ url }) {

    const id = sessionStorage.getItem('id')

    const history = useHistory();
    const { members } = useDoc(MEMBERS, id)

    useEffect(() => { 
        return () => sessionStorage.removeItem('id');
    }, []);

    const handleUpdate = async (member) => {
        await updateData(MEMBERS, member, id);
        history.push(url);
    }

    return (
        <>
        { !members ? ( <Skeleton count={1} />
         ) : (
          <EmptyMemberForm
            umember={ members }
            handleSumbit={handleUpdate}
            btnName={"Update"}
            url={ url } />
        ) 
        }
        </>
    )
}