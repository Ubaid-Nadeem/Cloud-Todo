import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const DashBoard = (user) => {
    const auth = getAuth();
    let navigate = useNavigate();
    console.log(user.user)
    function logout() {
        signOut(auth).then(() => {
            console.log("Sign-out successful.")
            navigate('/');

        }).catch((error) => {
            console.log(error)
        });
    }




    return <div>
        <div></div>
        <h1>Welcome DashBoard</h1>
        <button onClick={logout}>Log out</button>
    </div>
}
export default DashBoard;