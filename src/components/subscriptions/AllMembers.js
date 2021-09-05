import { useHistory, useLocation } from "react-router-dom";
import useCollection from "../../hooks/useCollection"
import Skeleton from "react-loading-skeleton"
import MovieWatched from "./MoviesWatched";
import { deleteData } from "../../services/firebase";
import { EDIT_MEMBER } from "../../constants/routes";
import { MEMBERS, MOVIES, SUBSCRIPTIONS } from "../../constants/collections";
import { useEffect } from "react";

export default function AllMembers({ url , isDeleteVisible}) {

    const { movies }               = useCollection(MOVIES);
    const { members, setToRender } = useCollection(MEMBERS);

    const history = useHistory();
    const { hash } = useLocation();

    useEffect(() => {
       if( hash ) setTimeout(() => window.location.assign(url + hash), 500);
       //eslint-disable-next-line
    },[hash])

    const handleEdit = (id) => {
        sessionStorage.setItem('id', id);
        history.push(url + EDIT_MEMBER)
    }

    const handleDelete = async (id) => {
        await deleteData(MEMBERS, id);
        await deleteData(SUBSCRIPTIONS, id);
        setToRender({});
    }

    return (
        <>
        { !(members && movies) ? (<Skeleton count={2} />) : (
        <>
        { members.map( (member) => {
            return (
                <span key={member.docId} id={member.docId}>
                <h3>{member.name}</h3>
                <p>Email: {member.email}</p>
                <p>City:  {member.city}</p>
                <button
                    type="button"
                    onClick={() => handleEdit(member.docId)}>Edit</button>
               
                { isDeleteVisible &&   
                <button
                    type="button"
                    onClick={() => handleDelete(member.docId)}>Delete</button>
                }
                <MovieWatched
                        docId={member.docId}
                        movieList={movies}
                        setToRender={setToRender}/>
                </span>
            )
        })}
        </>
        )}
        </>
    )
}