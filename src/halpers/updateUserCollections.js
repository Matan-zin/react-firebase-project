import { getCollectionDoc, deleteData, updateData } from "../services/firebase";

export default async function updateNewUserCollections(prevId, newId) {
    try {
        const user = await getCollectionDoc('users', prevId);
        const permissions = await getCollectionDoc('permissions' ,prevId);
        deleteData('users', prevId);
        deleteData('permissions', prevId)
        delete user.docId;
        delete permissions.docId;
        updateData('users', user ,newId);
        updateData('permissions', permissions, newId);
    } catch(err){ console.error(err)}
}