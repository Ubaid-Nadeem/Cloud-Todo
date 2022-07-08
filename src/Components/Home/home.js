import './home.css'
import Google from './google.jpg'
import Email from './emai2.png'
import Cloud from './cloud.png'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Home() {
    let navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const [error, setError] = useState('none')

    return (
        <div className="HomePage">
            <div className='auth-buttons'>
                <h1> <img className='cloud-logo' src={Cloud} />  Cloud <span className='span'>Todo</span> </h1>
                <h3> Hey! Personalize your list..... </h3>

                <button className='google' onClick={() => {
                    signInWithPopup(auth, provider)
                        .then((result) => {
                            console.log(result)
                        }).catch((error) => {
                            console.log(error)
                            alert(error)
                            setError('block')
                            setTimeout(() => {
                                setError('none')
                            }, 5000);
                        });
                }}>Sign up via Google</button>


                <button className='email' onClick={() => {
                    navigate("/email_auth");
                }}>Sign up via Email</button>
            </div>

            <p className='error' style={{ display: error }}>Check your Internet connection</p>
        </div>
    )
}
export default Home;