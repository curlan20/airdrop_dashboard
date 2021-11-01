import React from "react";
import {useMoralis} from "react-moralis";
import Videos from "./videos";

function Login() {
  const {authenticate, isAuthenticated, user, logout} = useMoralis();

  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={() => authenticate()}>Authenticate</button>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
        <div>
          <button onClick={() => logout()}>Logout</button>
          {user && <h1>Welcome {user.get('id')}</h1>}
        </div>
    );
  }
  return null;
}

export default Login;
