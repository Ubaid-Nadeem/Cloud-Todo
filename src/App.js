import "./App.css"
import {useState} from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import Home from "./Components/Home/home";
import EmailAuth from "./Components/EmailAuth/emailauth";
import DashBoard from "./Components/Dashboard/bashboard";

const firebaseConfig = {
  apiKey: "AIzaSyB8uyhgnIIlRTgSAmVxXw36gwHEo1tBjHg",
  authDomain: "todoapp-ea3bc.firebaseapp.com",
  projectId: "todoapp-ea3bc",
  storageBucket: "todoapp-ea3bc.appspot.com",
  messagingSenderId: "446772716197",
  appId: "1:446772716197:web:9c159bcf0ae9976338234c",
  measurementId: "G-7EK2PEMMGF"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  let navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [activeUser,setActiveUser] = useState({})
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };


  useEffect(() => {
    return () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setActiveUser(user)
          const uid = user.uid;
          console.log(uid)
          navigate(`/${uid}`);
          setOpen(false)
        } else {
          console.log('NO User Login')
          setOpen(false)
        }
      
      });

    }
  },[])


  function Get() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
        const uid = result.uid;
        navigate(`/${uid}`);

      }).catch((error) => {
        console.log(error)
      });
  }

  function logout() {
    signOut(auth).then(() => {
      console.log("Sign-out successful.")
      navigate('/');
   
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/email_auth' element={<EmailAuth />} />
        <Route path='/:id' element={<DashBoard user={activeUser}/>} />
      </Routes>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </div>
  );
}

export default App;
