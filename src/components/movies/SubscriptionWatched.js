import { MEMBERS, SUBSCRIPTIONS } from "../../constants/collections";
import * as ROUTES from '../../constants/routes'
import useCollection from "../../hooks/useCollection";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

export default function SubsricptionWatched({ docId }) {

    const { subscriptions } = useCollection(SUBSCRIPTIONS)
    const { members } = useCollection(MEMBERS)
    
    return (
        <>
        { !(subscriptions && members) ? ( <Skeleton count={2} /> ) : (
        <>
        <h4>Subscription Watched</h4>
        { subscriptions.map(item => {
            return item.movies.map((movie, index) => {
                    if(movie.movieId === docId){
                        return <Link key={index}
                                     to={`${ROUTES.SUBSCRIPTIONS}#${item.docId}`}>
                                {members.filter(member => member.docId === item.memberId)[0]['name']}
                               </Link>
                    } else return null;
            }) 
        })
        }
        </>
        )}
        </>
    )
}