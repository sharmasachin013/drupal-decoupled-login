import React, { useEffect, useState } from "react";
import Login from "./components/Login";
// import Logout from './components/Logout';

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("drupal-user");
    if (stored) {
      setAuth(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      {auth ? (
        <>
          <h2>Welcome, {auth.current_user.name}</h2>
          <Logout setAuth={setAuth} />
        </>
      ) : (
        <Login setAuth={setAuth} />
      )}
      {/* <Logout setAuth={setAuth} /> */}
    </div>
  );
}

export default App;
