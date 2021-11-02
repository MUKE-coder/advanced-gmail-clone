import { useEffect } from "react";
import { Home, Loading, Signin } from "./components";
import { useAppContext } from "./context/context";
import { useMailContext } from "./context/MailContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const { appState, setAppState } = useAppContext();
  useEffect(() => {
    if (appState === "loading") {
      setTimeout(() => {
        setAppState("home");
      }, 5000);
    }
  });
  const { onScreenMails } = useMailContext();
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="app">
            {appState === "home" && <Home />}
            {appState === "login" && <Signin />}
            {appState === "loading" && <Loading />}
          </div>
        </Route>
        {onScreenMails.map((value, index) => (
          <Route key={index} path={`/${value.id}`}>
            <Home mailData={value} showMails={false} />
          </Route>
        ))}
      </Switch>
    </Router>
  );
}

export default App;
