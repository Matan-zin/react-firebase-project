import { MOVIES } from "../../constants/collections"
import { updateData } from "../../services/firebase"
import MovieForm from "./MovieForm"
import { v4 as uuidv4 } from 'uuid'
import { useHistory } from "react-router"

export default function AddMovie({ url }) {
    const history = useHistory()

    const handleSubmit = async (movie) => {
        await updateData(MOVIES, movie, uuidv4())
        history.push(url)
    }

    return (
        <>
        <MovieForm 
            handleSubmit={handleSubmit}
            btnName="Save"
            url={url}/>
        </>
    )
}