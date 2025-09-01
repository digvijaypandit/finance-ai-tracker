import { loginSuccess, loginFailure } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.theme.isDark);

  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handleGooglePopup = () => {
    const popup = window.open(
      `${backendUrl}/auth/google`,
      "googleLogin",
      "width=500,height=600"
    );

    window.addEventListener("message", (event) => {
      if (event.origin !==  `${backendUrl}`) return;

      if (event.data.type === "LOGIN_SUCCESS") {
        dispatch(loginSuccess(event.data.user));
        navigate("/dashboard");
      } else {
        dispatch(loginFailure("Google login failed"));
      }
    });
  };

  return (
    <div className={`flex items-center justify-center min-h-screen transition-colors duration-500 ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className={`p-16 rounded-xl shadow-xl w-full max-w-md text-center transition-colors duration-500 ${isDark ? "bg-gray-800" : "bg-white"}`}>

        {/* Back button to home */}
        <div className="flex justify-start mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-sm font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* App Name */}
        <h1 className="text-4xl font-normal mb-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Finance AI Tracker
        </h1>

        {/* Google-style card */}
        <div className="flex flex-col items-center">

          {/* Continue with Google button */}
          <button
            onClick={handleGooglePopup}
            className={`flex items-center justify-center w-full py-4 px-6 mb-6 border text-lg rounded-lg shadow transition transform hover:scale-105 active:scale-95 cursor-pointer ${isDark
                ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
          >
            <img
              src="/google-icon.svg"
              alt="Google Icon"
              className="w-6 h-6 mr-4"
            />
            Continue with Google
          </button>

          {/* Footer text */}
          <p className={`text-base mt-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Use your Google Account to sign in.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
