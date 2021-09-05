import { firebase } from '../lib/firebase'

export async function getCollection(name) {
    try {
        const resp = await firebase.firestore().collection(name).get();
        return resp.docs.map(item => ({
            ...item.data(),
            docId: item.id
        }));
    } catch(err) { console.error('[getCollection fail]', err) }
}


export async function getCollectionDoc(name, docId) {
    try {
        const resp = await firebase.firestore().collection(name).doc(docId).get();
        return {
            ...resp.data(),
            docId: resp.id
        }
    } catch(err) { console.error('[getCollectionDoc fail]', err) }
}


export async function updateData(name, data, docId) {
    try { await firebase.firestore().collection(name).doc(docId).set(data) }
    catch(err) { console.error('[updateData fail]', err) }
}


export async function deleteData(name, docId) {
    try { await firebase.firestore().collection(name).doc(docId).delete() }
    catch(err) { console.error('[deleteData fail]' ,err) } 
}
