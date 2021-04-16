import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handelGoogleSignIn, handelSignOut, handleFbSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';


function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        newUser: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    })

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handelGoogleSignIn()
            .then(res => {
                handelResponse (res, true);
            })
    }
    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handelResponse (res,true);
            })
    }

    const signOut = () => {
        handelSignOut()
            .then(res => {
                handelResponse (res,false);
               
            })
    }
const handelResponse = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
    history.replace(from)
    }
}
 
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.value === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.value === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handelResponse (res, true);
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handelResponse (res,true);
                })
        }
        e.preventDefault();
    }


    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignIn ? <button onClick={signOut}>Sign out</button> :
                    <button onClick={googleSignIn}>Sign In</button>
            }
            <br />
            <button onClick={fbSignIn}>Sign in using FaceBook </button>
            {
                user.isSignIn && <div>
                    <p> welcome, {user.name}</p>
                    <p>your email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }

            <h1>Our Own Authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name='newUser' id='' />
            <label htmlFor="newUser">New user Sign Up</label>


            <form onSubmit={handleSubmit}>
                {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder
                    ="your name" />}
                <input type="text" name='email' onBlur={handleBlur} placeholder='email address' required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder='password' required />
                <br />
                <input type="submit" value="Submit" />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}> User {newUser ?
                'created' : 'Logged In'} success fully</p>}

        </div>
    );
}

export default Login;
