import { MEMBERS } from "../../constants/collections"
import { updateData } from "../../services/firebase"
import { v4 as uuidv4 } from 'uuid'
import { useHistory } from "react-router-dom"
import { SUBSCRIPTIONS } from "../../constants/routes";
import EmptyMemberForm from "./EmptyMemberForm";

export default function AddMember() {
    const history = useHistory();

    const handleAddMember = async (member) => {
        member.docId = uuidv4();
        await updateData(MEMBERS, member, member.docId);
        history.push( SUBSCRIPTIONS );
    }

    return (
        <EmptyMemberForm
            handleSumbit={handleAddMember}
            btnName={"Save"}
            url={SUBSCRIPTIONS} />
    )
}