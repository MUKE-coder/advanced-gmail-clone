import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import Signup from "../Signup/Signup";
import "./Signin.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
const Signin = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordError, setPasswordError] = useState({ state: false, msg: "" });

  const [emailError, setEmailError] = useState({ state: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const toggleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSignup(true);
    }, 1500);
  };
  const signIn = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmailError({ state: false, msg: "" });
        setPasswordError({ state: false, msg: "" });
      })
      .catch((err) => {
        setLoading(false);
        if (err.code === "auth/wrong-password") {
          setEmailError({
            state: false,
            msg: "",
          });
          setPasswordError({
            state: true,
            msg: "Incorrect Password",
          });
        } else if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/invalid-email"
        ) {
          setEmailError({
            state: true,
            msg: "Email Doesn't exist",
          });
          setPasswordError({
            state: false,
            msg: "",
          });
        }
      });
  };
  return (
    <div className="login">
      {showSignup ? (
        <Signup setShowSignup={setShowSignup} />
      ) : (
        <div className="login__content">
          {loading && <div className="login__loading"></div>}
          <div className={`login__wrapper ${loading && "login__fade"}`}>
            <img
              src="./assets/svg/google.svg"
              alt="google Logo"
              className="login__logo"
            />
            <p className="login__title">Sign in</p>
            <p className="login__subtitle">to continue to Gmail</p>

            <form className="login__form">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                className="login__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError.state}
                helperText={emailError.msg}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                className="login__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError.state}
                helperText={passwordError.msg}
              />
              <div className="login__infoText">
                Not your Computer? Use guest mode to sign in privately{" "}
                <a href="/learnmore">Learn More</a>
              </div>
              <div className="login__buttons">
                <Button
                  color="primary"
                  className="login__button"
                  onClick={toggleSignUp}
                >
                  Creat Account
                </Button>
                <Button
                  color="primary"
                  className="login__button"
                  variant="contained"
                  onClick={signIn}
                >
                  Signin
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
