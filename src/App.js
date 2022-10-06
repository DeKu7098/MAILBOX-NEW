import React from "react";
import { Switch, Route, Redirect,useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "./login/SignIn";
import SignUp from "./login/SignUp";
import Welcome from "./Welcome/welcome";
import Header from "./component/Header";
import Inbox from "./Functions/Inbox";
import "./Functions/InboxButton.css";
import SentBox from "./Functions/SentBox";
import MailDetail from "./Functions/MailDetail";
import ComposeMail from "./Functions/ComposeMail";

function App() {
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLogin);
  const history=useHistory();
  // const stateHandler = () => {
  //   setInbox((state) => !state);
  //   console.log("hi");
  // };

  
  return (
    <div>
      {isLogin && <Header />}
      {isLogin && (
        <button className="bn53" onClick={() => history.push("/compose")}>
          compose
        </button>
      )}
      {isLogin && (
        <button className="bn53" onClick={() => history.push("/inbox")}>
          Inbox
        </button>
      )}
      {isLogin && (
        <button className="bn53" onClick={() => history.push("/sent")}>
          Sentbox
        </button>
      )}

      <Switch>
        {!isLogin && (
          <Route path="/" exact>
            <Redirect to="/signup"></Redirect>
          </Route>
        )}
        {isLogin && (
          <Route path="/" exact>
            <Redirect to="/Welcome"></Redirect>
          </Route>
        )}
        {isLogin && (
          <Route path="/sent">
            <SentBox />
          </Route>
        )}
        {isLogin && (
          <Route path="/inbox">
            <Inbox />
          </Route>
        )}

        {!isLogin && (
          <Route path="/signup">
            <SignUp />
          </Route>
        )}
        {!isLogin && (
          <Route path="/signin">
            <SignIn />
          </Route>
        )}
        {isLogin && (
          <Route path="/Welcome">
            <Welcome /> 
          </Route>
        )}
        {isLogin && (
          <Route path="/mail">
            <MailDetail />
          </Route>
        )}
          {isLogin && (
          <Route path="/compose">
            <ComposeMail />
          </Route>
        )}
      </Switch>
     
    </div>
  );
}

export default App;
