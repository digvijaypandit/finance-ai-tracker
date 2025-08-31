import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const token = credentialResponse.credential;

        // send token to backend for verification
        const res = await axios.get("http://localhost:8000/auth/google", {
          token,
        });
        console.log("Backend response:", res.data);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}

export default Login;
