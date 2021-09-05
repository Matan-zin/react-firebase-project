import { useState, useEffect } from "react";
import { getCollection } from "../services/firebase";

export default function useCollection(name) {

    const [ collection , setCollection ] = useState(null);
    const [ toRender , setToRender ] = useState(false);

    useEffect(() => {
        (async () => {
            let resp = await getCollection(name);
            setCollection(resp);
        })();

    // eslint-disable-next-line
    },[toRender])

    return { [name]: collection, setToRender };
}