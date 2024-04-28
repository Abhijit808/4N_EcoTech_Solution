import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router";
import { Tokens } from "../store/tokenSlice";

function App() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.google.com/calendar/feeds");
    signInWithPopup(auth, provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        navigate("/ScheduleEvents");
        dispatch(
          Tokens({
            access_token: credential?.accessToken,
            refresh_token: result._tokenResponse.refreshToken,
          })
        );
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);

        // ...
      });
  };
  return (
    <div className="grid items-center justify-center w-screen h-screen">
      <button
        className="btn btn-primary  bg-transparent text-black px-10 hover:rounded-[40px] hover:text-white"
        onClick={handleSignIn}
      >
        Sign in
      </button>
    </div>
  );
}

export default App;
