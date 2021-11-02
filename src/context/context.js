// 1) create context

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Context = createContext();
// 2) create and export a function that returns the context
export function useAppContext() {
  return useContext(Context);
}

//3) Create a context provider function that accepts children as a prop and returns context.provider component,,It wraps the whole app in index.js
const options = ["Primary", "Social", "Promotions", "Updates"];
export function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [appState, setAppState] = useState("empty");
  const [openDrawer, setOpenDrawer] = useState(true);
  const [composeOpen, setComposeOpen] = useState(false);
  const [category, setCategory] = useState(options[0]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // Check for user status
      if (user) {
        setAppState("loading");
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        setAppState("login");
      }
    });
  }, []);
  const value = {
    currentUser,
    appState,
    setAppState,
    openDrawer,
    setOpenDrawer,
    composeOpen,
    setComposeOpen,
    category,
    setCategory,
    options,
    snackbarOpen,
    setSnackbarOpen,
    snackbarMsg,
    setSnackbarMsg,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

//4 Go to index.js and replace the React.strictMode wrapper to ContextProvider FUNCTION that you exported above

/* useEffect(() => {
  onSnapshot(
    query(collection(db, "thumbnails"), orderBy("timestamp", "desc")),
    (snapshot) =>
      setVideos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
  );
}, []); */
