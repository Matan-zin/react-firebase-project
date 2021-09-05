import { useEffect } from "react";
import useDoc from '../../hooks/useDoc'
import Skeleton from "react-loading-skeleton";
import MovieForm from "./MovieForm";
import { MOVIES } from "../../constants/collections";
import { updateData } from "../../services/firebase";
import { useHistory } from "react-router-dom";

export default function EditMovie({ url }) {
    const history = useHistory();
    const docId = JSON.parse(sessionStorage.getItem('id'));
    const { movies } = useDoc(MOVIES ,docId);

    useEffect(() => { return () => sessionStorage.removeItem('id')}, []);

    const handleSubmit = async (movie) => {
        await updateData(MOVIES, movie, movie.docId);
        history.push(url)
    }

    return (
        <>
        { !movies ? ( <Skeleton count={1} /> ) : (
        
        <MovieForm
            movie={movies}
            btnName='Update'
            handleSubmit={handleSubmit}
            url={url}/>
        )}
        </>
    )
}