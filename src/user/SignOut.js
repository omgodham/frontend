import React, { useState } from "react";
import { signout } from "../auth/helper/index";
import Base from "../core/Base";

export default function SignOut() {
  const [error, setError] = useState(false);

  const showMessage = () => {
    signout()
      .then(data => {
        // setError(true);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Base title="SignIn Page" description="This is sign in page">
      <div
        className="alert alert-success"
        style={{ display: error ? "" : "none" }}
      >
        signout success
      </div>
      <h1 className='text-white'>This is signout page</h1>
      { showMessage() }
    </Base>
  );
}
