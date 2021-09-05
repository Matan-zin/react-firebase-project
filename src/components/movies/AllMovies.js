import { useEffect, useState } from "react";
import { MOVIES } from "../../constants/collections"
import Skeleton from "react-loading-skeleton";
import useCollection from '../../hooks/useCollection'
import { deleteData } from "../../services/firebase";
import { useHistory, useLocation } from "react-router-dom";
import { EDIT_MOVIE } from "../../constants/routes";
import SubsricptionWatched from "./SubscriptionWatched";

export default function AllMovies({ url, isDeleteVisible }) {

    const history = useHistory();
    const { movies, setToRender } = useCollection(MOVIES);
    const [listMovies, setlistMovies] = useState(null)
    const [ find, setFind] = useState('');
    const { hash } = useLocation();

    useEffect(() => {
        if(movies) setlistMovies(movies)
    }, [movies])

    useEffect(() => {
        if( hash ) setTimeout(() => window.location.assign(url + hash), 500);
        //eslint-disable-next-line
    },[hash])

    useEffect(() => {
        if(movies){
            let res = movies.filter(movie => movie.name.toLowerCase().includes(find.toLowerCase()))
            setlistMovies(res)
        }
    }, [find, movies])

    const handleDelete = async (docId) => {
        await deleteData(MOVIES, docId);
        setToRender({});
    }

    const storeId = (docId) => {
        sessionStorage.setItem('id', JSON.stringify(docId));
        history.push(url + EDIT_MOVIE);
    }

    return (
        <>
        { !listMovies ? ( <Skeleton count={4} /> 
            ) : (
        <>
        <label htmlFor="find movie">Find Movie:</label>
        <input
             name="find movie"
             type="text"
             onChange={({ target }) => setFind(target.value)} />
        { listMovies.map(movie=> {
            return (
                <section key={movie.docId} id={movie.docId} aria-label="movie details">
                <h4>{movie.name} ,
                <time date={movie.premiered}>{movie.premiered.substring(0,4)}</time>
                </h4>
                <p>genres: 
                { movie.genres.map((genre, index) => {
                      return <span key={index}>{genre}</span>
                  })}
                </p>
                <img src={movie.image} alt={movie.name} />
                <SubsricptionWatched docId={movie.docId} />
                <button
                    type="button"
                    onClick={() => storeId(movie.docId)}>Edit</button>

                { isDeleteVisible &&
                <button
                    type="button"
                    onClick={() => handleDelete(movie.docId)}>Delete</button>
                }
                </section>
            )    
          })
        }
        </>
        )}
        </>
    )
}