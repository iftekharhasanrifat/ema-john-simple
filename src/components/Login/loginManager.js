import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    !firebase.apps.length && firebase.initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            return signedInUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            var credential = result.credential;
            var user = result.user;
            var accessToken = credential.accessToken;
            return user;
            console.log('fb user after sign in', user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(error);
        });
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: ''
            }
            return signedOutUser;
        }).catch((error) => {
            console.log(error);
            console.log(error.message);
        });
}

// export const createUserWithEmailAndPassWord = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//         .then((userCredential) => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = '';
//             newUserInfo.success = true;
//             setUser(newUserInfo)
//             updateUserName(user.name)
//         })
//         .catch((error) => {
//             var errorMessage = error.message;
//             const newUserInfo = { ...user };
//             newUserInfo.error = errorMessage;
//             newUserInfo.success = false;
//             setUser(newUserInfo)
//         });
// }
// export const signInWithEmailAndPassWord = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//         .then((userCredential) => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = '';
//             newUserInfo.success = true;
//             setUser(newUserInfo);
//             setLoggedInUser(newUserInfo);
//             history.replace(from);
//             console.log('sign in user info', userCredential.user);
//         })
//         .catch((error) => {
//             var errorMessage = error.message;
//             const newUserInfo = { ...user };
//             newUserInfo.error = errorMessage;
//             newUserInfo.success = false;
//             setUser(newUserInfo)
//         });
// }
// const updateUserName = name => {
//     const user = firebase.auth().currentUser;
//     user.updateProfile({
//         displayName: name
//     }).then(function () {
//         console.log('user updated successfully');
//     }).catch(function (error) {
//         console.log(error);
//     });
// }
