import React,{useState} from 'react';
import './App.css';
import firebaseConfig from './firebase.config';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();



const App = () =>{
   const [user, setUser] = useState({
    SignIn:false,
    name:'',
    email:'',
    photo: ''
   });

const handlesignIn = () =>{
    signInWithPopup(auth, provider)
    .then(res => {
       const {displayName ,photoURL ,email}= res.user ;
       const userData={
         SignIn:true,
         name:displayName,
         email:email,
         photo: photoURL
       }
       setUser(userData)
    })
    //responsse code end
 }

 const handlesignOut = () =>{
   signOut(auth)
   .then(res => {
       const userDataOut={
         SignIn:false,
         name:"",
         email:"",
         photo: ""
      }
       setUser(userDataOut)
    })
    //responsse code end
 }
 console.log(user)
  return (
    <div className="App">
   {
    user.SignIn ? <button onClick={handlesignOut}>Sign Out</button> :
    <button onClick={handlesignIn}>Sign In</button>
   }

   {
    user.SignIn && <div>
      <h1>Wellocome , {user.name}</h1>
      <img src={user.photo} alt=""></img>
    </div>
   }

    </div>
  );
}

export default App;
