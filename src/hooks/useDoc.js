import { useEffect, useState } from "react";
import { getCollectionDoc } from "../services/firebase";


export default function useDoc(name, docId) {

    const [ doc , setDoc ] = useState(null);
    const [ toRender, setToRender ] = useState(false);

    useEffect(() => {
        (async () => {
            const resp = await getCollectionDoc(name, docId)
            setDoc(resp);
        })();

        // eslint-disable-next-line
    }, [toRender])

    return { [name]: doc, setToRender };
}