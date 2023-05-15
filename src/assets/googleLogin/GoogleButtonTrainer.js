import React from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { TrainerLoginWithGoogle } from "../../axios/services/trainerServices/trainerService";
import { trainerLogin } from "../../redux/trainerSlice";

function GoogleButtonTrainer(props) {
  

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const responseMessage = async (res) => {
    props.setLoader(true);
        const user = jwt_decode(res.credential);
    
        const response = await TrainerLoginWithGoogle(user.email);
        if (response.status === "Login success") {
          props.setLoader(false);
          dispatch(
            trainerLogin({ token: response.token, trainer: response.trainer })
          );
          toast.success(response.status);
          navigate("/");
        } else if (response?.status === "Trainer not verified") {
          props.setLoader(false);
          props.setTrainerVerifyStatus(true);
          console.log("trainer not verified");
        } else {
          props.setLoader(false);
          toast.error(response.status);
        }
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <>
      <GoogleOAuthProvider clientId={"230039992190-7tpf0eapq82majvk7r7uj7c72fqnqtau.apps.googleusercontent.com"}>
        <button className="flex items-center  justify-center flex-none px-3 py-2 md:px-4 md:py-3  rounded-lg font-medium  relative">
          <span className="absolute left-4"></span>
          <span className="flex items-center text-black">
            <GoogleLogin
              className="text-black"
              onSuccess={responseMessage}
              onError={errorMessage}
            />
          </span>
        </button>
      </GoogleOAuthProvider>
    </>
  );
}

export default GoogleButtonTrainer;


// const [googleLoaded, setGoogleLoaded] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {

//     const script = document.createElement("script");
//     script.src = "https://accounts.google.com/gsi/client";
//     script.async = true;
//     script.defer = true;

//     script.onload = () => {
//       if (window.google) {
//         // the google object is now defined
//         setGoogleLoaded(true);
//         handleSignIn();
//         console.log("Google Sign-In API loaded successfully.");
//       } else {
//         console.error("Failed to load Google Sign-In API.");
//       }
//     };

//     document.body.appendChild(script);

//   }, []);

//   const handleSignIn = () => {
//     if (googleLoaded && google?.accounts) {
//       // use the google.accounts object here
//       google?.accounts.id.initialize({
//         client_id:
//           "230039992190-7tpf0eapq82majvk7r7uj7c72fqnqtau.apps.googleusercontent.com",
//         callback: handleCallbackResponse,
//       });
  
//       google?.accounts.id.renderButton(document.getElementById("signInButton"), {
//         theme: "outline",
//         size: "large",
//       });
//     } else {
//       console.log("Google Sign-In API not loaded yet.");
//     }
//   };

//   async function handleCallbackResponse(res) {
    
//     props.setLoader(true);
//     const user = jwt_decode(res.credential);

//     const response = await TrainerLoginWithGoogle(user.email);
//     if (response.status === "Login success") {
//       props.setLoader(true);
//       dispatch(
//         trainerLogin({ token: response.token, trainer: response.trainer })
//       );
//       toast.success(response.status);
//       navigate("/");
//     } else if (response?.status === "Trainer not verified") {
//       props.setLoader(false);
//       props.setTrainerVerifyStatus(true);
//       console.log("trainer not verified");
//     } else {
//       props.setLoader(false);
//       toast.error(response.status);
//     }
//   }