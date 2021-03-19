
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { handleGoogleSignIn, handleSignOut, initializeLoginFramework, handleFbSignIn, createUserWithEmailAndPassWord, signInWithEmailAndPassWord } from './loginManager';

initializeLoginFramework();

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };


    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res,true);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res,false);
            })
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res,true);
            })
    }

    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        // console.log(user.email, user.password)
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassWord(user.name,user.email,user.password)
                .then(res => {
                    handleResponse(res,true);
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassWord(user.email,user.password)
                .then(res => {
                    handleResponse(res,true);
                })
        }
        e.preventDefault();
    }
    const handleResponse = (res,redirect)=> {
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignedIn ? <button onClick={signOut}>Sign out</button> : <button onClick={googleSignIn}>Sign In</button>
            }
            <br />
            <button onClick={fbSignIn}>Sign in using facebook</button>
            {
                user.isSignedIn && <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your email : {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }
            <h1>Our own Authentication</h1>
            <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
            <label htmlFor="newUser">New user sign up</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="your name" required />}
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="your email address" required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="your password" required />
                <br />
                <input type="submit" value={newUser ? 'sign up' : 'sign in'} />
            </form>
            {user.success ? <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} successfully</p> : <p style={{ color: 'red' }}>{user.error}</p>}
        </div>
    );
}

export default Login;
