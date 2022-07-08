import Cloud from '../Home/cloud.png'
import './emailauth.css'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// import FormControl from '@mui/material/FormControl';
const EmailAuth = () => {
    const auth = getAuth();

    const [showPassword, setShowPassword] = useState(true)
    const [passwordtype, setPasswordtype] = useState("password");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUp, setSignUp] = useState(true);

    const handleChange = () => {
        setShowPassword(!showPassword)

        if (showPassword === true) {
            setPasswordtype("text");
        }
        if (showPassword === false) {
            setPasswordtype("Password");
        }
    }

    const GetValue = (event) => {
        console.log(event.target.value);
        if (event.target.name == 'email') {
            setEmail(event.target.value);
        }
        else {
            setPassword(event.target.value)
        }
    }

    const SignUp = () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });


        setEmail('');
        setPassword('')
    }

    const SignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
        setEmail('');
        setPassword('')
    }

    return <div>
        <div className='email_aut_box'>

            <h1> <img className='cloud-logo' src={Cloud} />  Cloud <span className='span'>Todo</span> </h1>


            {/* <h2>Sign up via Email</h2> */}

            <div className='emailbox'>
                <Box sx={{ '& > :not(style)': { m: 1 } }} >
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <Input
                            placeholder='Email'
                            onChange={GetValue}
                            name='email'
                            value={email}
                        />
                    </Box>
                </Box>
                <div className='passwordbox'>
                    <Input className="input"
                        type={passwordtype}
                        placeholder="Password"
                        onChange={GetValue}
                        name='password'
                        value={password}

                    />
                    <span onClick={handleChange}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </span>
                </div>
            </div>
            {signUp ?
                <>
                    <button className='signup' onClick={SignUp}>Sign up</button>
                    <p className='sign_-in_link'>I have already account <span className='sign_in' onClick={() => {
                        setSignUp(false);
                    }}>SIGN IN</span> </p>
                </>
                :
                <>
                    <button className='signin_button' onClick={SignIn}>Sign in</button>
                    <p className='sign_-in_link'>Create a new Account <span className='sign_in' onClick={() => {
                        setSignUp(true);
                    }}>SIGN UP</span> </p>
                </>
            }
        </div>
    </div>
}
export default EmailAuth;