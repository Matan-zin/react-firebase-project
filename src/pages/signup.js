import { useState , useContext } from "react";
import { useHistory } from "react-router-dom";
import { LOGIN } from "../constants/routes";
import updateNewUserCollections from "../halpers/updateUserCollections";
import Authentication from "../components/Authentication";
import FirebaseContext from "../context/firebase";

export default function Signup() {
    
    const { firebase } = useContext(FirebaseContext);
    const history = useHistory();
    const [error, setError] = useState('');

    const handleCreate = async (email, password) => {
      try {
          // check if the email address have a permission to create a user
          const resp = await firebase
                                .firestore()
                                .collection('users')
                                .where('Email', '==', email)
                                .get();
  
          const [ data ] = resp.docs.map(item => ({
              ...item.data(),
              docId: item.id
            }));
          
          if(data) {
            let res = await firebase
                                .auth()
                                .createUserWithEmailAndPassword(email, password);
            // update docId for new user on the system that the admin create
            await updateNewUserCollections(data.docId, res.user.uid)
            
            history.push(LOGIN);
          } else {
              throw new Error('The Email is not approved contact with system adminiistrator');
          }
      } catch(err) {
          setError(err.message);
      }
    }

    return (
        <div className="auth-page">
        <h3>Create an Account</h3>
        <Authentication
            handleSubmit={handleCreate}
            err={error}
            btnName={"Create"} />
        </div>
    )
}