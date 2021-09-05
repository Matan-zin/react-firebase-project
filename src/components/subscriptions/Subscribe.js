import { useState, useContext } from "react"
import { SUBSCRIPTIONS } from "../../constants/collections";
import FirebaseContext from '../../context/firebase'

export default function Subscribe({ 
    movieList,
    docId,
    setToRender,
    setExpend})
{
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const [option, setOption] = useState(movieList[0]['name']);
    const [date, setDate] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let movieId = movieList.filter(movie => movie['name'] === option)[0]['docId'];
        try{
            await firebase.firestore().collection(SUBSCRIPTIONS).doc(docId).update({
                movies: FieldValue.arrayUnion({ date: date, movieId: movieId })
            })
            setToRender({});
        } catch(err) { console.error(err)};
        setExpend(false)
    }

    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="movies">Add new movie</label>
        <select 
            name="movies"
            onClick={({ target }) => setOption(target.value)}
        >
        { movieList.map((movie, index) => {
            return (
                <option
                    key={index}
                    value={movie.name}>{movie.name}
                </option>
            )
        })}
        </select>
        <input
            type="date"
            onChange={({ target }) => setDate(target.value)} />
        <button
            type="submit">Subscribe</button>
        </form>
    )
}