import { useState } from "react";
import Skeleton from "react-loading-skeleton"
import { Link } from "react-router-dom";
import { SUBSCRIPTIONS } from "../../constants/collections"
import { MOVIES } from "../../constants/routes";
import useDoc from "../../hooks/useDoc"
import Subscribe from "./Subscribe";

export default function MovieWatched({ docId, movieList }) {

    const { subscriptions, setToRender } = useDoc(SUBSCRIPTIONS, docId);
    const [expend ,setExpend] = useState(false);

    return (
        <>
        { !subscriptions ? ( <Skeleton count={1} /> ) : (
        <>
        <h4>Movies Watched</h4>
        <button
            type="button"
            onClick={() => setExpend(!expend)}>Subscribe to new movie
        </button><br/>
        <>
        { expend && <Subscribe 
                        movieList={movieList} 
                        docId={docId}
                        setToRender={setToRender}
                        setExpend={setExpend}/> 

        }
        </>
        { subscriptions.movies.map((movie, index) => {
            return (
                   <ul key={index}>
                    <li>
                    <Link to={`${MOVIES}#${movie.movieId}`}>
                    { movieList.filter(item => item.docId === movie.movieId)[0].name }
                    </Link>
                    <span>,{movie.date}</span>
                    </li>
                   </ul>
            )
        })}
        </>
        )}
        </>
    )
}