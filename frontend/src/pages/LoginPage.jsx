import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/authSlice";

function Login() {
  const dispatch = useDispatch();

  const handleGooglePopup = () => {
    const popup = window.open(
      "http://localhost:8000/auth/google",
      "googleLogin",
      "width=500,height=600"
    );

    window.addEventListener("message", (event) => {
      if (event.origin !== "http://localhost:8000") return;

      if (event.data.type === "LOGIN_SUCCESS") {
        dispatch(loginSuccess(event.data.user));
      } else {
        dispatch(loginFailure("Google login failed"));
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-16 rounded-xl shadow-xl w-full max-w-md text-center">

        {/* App Name */}
        <h1 className="text-4xl font-normal mb-8 text-gray-900" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Finance AI Tracker
        </h1>

        {/* Google-style card */}
        <div className="flex flex-col items-center">

          {/* Continue with Google button */}
          <button
            onClick={handleGooglePopup}
            className="flex items-center justify-center w-full py-4 px-6 mb-6 bg-white border border-gray-300 text-gray-700 text-lg rounded-lg shadow transition transform hover:scale-105 active:scale-95 cursor-pointer hover:bg-gray-50"
          >
            {/* Google Icon Image */}
            <img
              src="/google-icon.svg"
              alt="Google Icon"
              className="w-6 h-6 mr-4"
            />
            Continue with Google
          </button>

          {/* Footer text */}
          <p className="text-gray-600 text-base mt-4">
            Use your Google Account to sign in.
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;
