import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        // 유저 변화 관찰
        authService.onAuthStateChanged((user) => {
          if (user) {
            setUserObj(user);
          }
          setInit(true);
        });
      }, []);

    return (
    <>
    {init? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing.."}
    {/* <footer>&copy; {new Date().getFullYear()} Awitter</footer> */}
    </>
    );
}

export default App;
