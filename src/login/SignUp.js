import { Link, useHistory } from "react-router-dom";
import React, { useRef } from "react";
import { Fragment } from "react";
import classes from "./SignUp.module.css";
import './LoginButton.css';

const SignUp = () => {
  const history = useHistory();
  const enteredEmailRef = useRef();
  const enteredPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = enteredEmailRef.current.value;
    const enteredPassword = enteredPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (enteredPassword === confirmPassword) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeu0fr6VeKS0nbxCqGxxis7mzJiLNuWGg",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
        }
      )
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              console.log(data);
              console.log("User has successfully signed up.");
              history.replace("/signin");
            });
          } else {
            return res.json().then((data) => {
              console.log(data);
              let errorMessage = "authentication failed...";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              console.log(errorMessage);
              alert(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
      enteredEmailRef.current.value = "";
      enteredPasswordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    } else {
      alert("password not match...");
      enteredEmailRef.current.value = "";
      enteredPasswordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    }
  };
  return (
    <Fragment>
      <section className={classes.auth}>
        <h1>{"Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' ref={enteredEmailRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              ref={enteredPasswordRef}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Confirm Password</label>
            <input
              type='password'
              id='password1'
              ref={confirmPasswordRef}
              required
            />
          </div>
          <div className={classes.actions}>
          <a href="/"><button className="bn29">Sign Up</button></a>
            <Link to={"/signin"}>Already have an account? Sign In</Link>
          </div>
        </form>
      </section>
    </Fragment>
  );
};
export default SignUp;