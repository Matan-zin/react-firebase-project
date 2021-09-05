import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const MAXSIZE = 10;

//--------------------------------------------------------------------------
const getMembers = async () => {
    try {
        const resp = await axios.get("https://jsonplaceholder.typicode.com/users");
        return resp.data.map(user => {
            let { name, email, address: {city} } = user; 
            return  { docId: uuidv4(), name, email, city };
        })
    } catch(err){ console.error(err)};
};

//--------------------------------------------------------------------------
const getMovies = async () => {
    try {
        const resp = await axios.get("https://api.tvmaze.com/shows");    
        let movies = new Array( MAXSIZE );
        
        for(let i = 0; i < MAXSIZE ; i++) {
            let { name, genres, image, premiered } = resp.data[i];
            movies[i] = { docId: uuidv4(), name, genres, image: image.medium, premiered };
        }
        return movies;
    } catch(err) { console.error(err) };
};

//--------------------------------------------------------------------------
const initMembersColl = (members, firebase) => {
    members.forEach(member => {
        firebase.firestore().collection('members').doc(member.docId).set(member);
    })
};

//--------------------------------------------------------------------------
const initMoviesColl = (movies, firebase) => {
    movies.forEach(movie => {
        firebase.firestore().collection('movies').doc(movie.docId).set(movie);        
    })
};

//--------------------------------------------------------------------------
// halper func to generate 4 rendom id numbers between 1 - 9
const gen = () => {
    let i = Math.floor((Math.random() * 6 ) + 1);
    let a = i, b = i + 1, c = i + 2, d = i + 3;
    return [ a, b, c, d ];
};

//--------------------------------------------------------------------------
const initSubscriptionsColl = (members, movies, firebase) => {
    members.forEach(member => {
        let [ a, b, c, d ] = gen();
        let subs = {
            memberId: member.docId,
            movies: [
                { movieId: movies[a].docId , date: movies[a].premiered },
                { movieId: movies[b].docId , date: movies[b].premiered },
                { movieId: movies[c].docId , date: movies[c].premiered },
                { movieId: movies[d].docId , date: movies[d].premiered }
            ]
        }
        firebase.firestore().collection('subscriptions').doc(member.docId).set(subs);
    });
};

//--------------------------------------------------------------------------
export function seedDatabase(firebase) {
    let members = [], movies = [];
        
    getMembers()
    .then(resp => {
        members = resp;
        initMembersColl(members, firebase);
    })
    .then(() => {
        getMovies()
        .then(resp => {
            movies = resp;
            initMoviesColl(movies, firebase);
        })
        .then(() => {
            initSubscriptionsColl(members, movies, firebase)
        })
    })
    .catch(err => console.error(err)); 
    
    firebase.firestore().collection('safe-guard').doc().set({id:1})
};