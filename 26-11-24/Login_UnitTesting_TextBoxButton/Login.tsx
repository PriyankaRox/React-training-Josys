import React, { useState } from "react";

function Login() {
  const [uid, setUserId] = useState("");
  const [pwd, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [errors, setErrors] = useState({ uid: "", pwd: "" });

  function validateForm() {
    const newErrors = { uid: "", pwd: "" };

    if (!uid.trim()) {
      newErrors.uid = "User ID is required.";
    }
    if (!pwd.trim()) {
      newErrors.pwd = "Password is required.";
    }

    setErrors(newErrors);

    return !newErrors.uid && !newErrors.pwd;
  }

  function loginButton_click() {
    if (validateForm()) {
      if (uid === "admin" && pwd === "admin123") {
        setResult("Welcome to Admin");
      } else {
        setResult("Invalid User ID or Password");
      }
    } else {
      setResult("");
    }
  }

  return (
    <>
      <fieldset>
        <legend>User Login</legend>

        <label>User ID: </label>
        <input
          type="text"
          id="t1"
          placeholder="User ID"
          value={uid}
          onChange={(event) => setUserId(event.target.value)}
        />
        {errors.uid && <p style={{ color: "red" }}>{errors.uid}</p>}
        <br />
        <br />

        <label>Password: </label>
        <input
          type="password"
          id="t2"
          placeholder="Password"
          value={pwd}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors.pwd && <p style={{ color: "red" }}>{errors.pwd}</p>}
        <br />
        <br />

        <input
          type="button"
          id="b1"
          onClick={loginButton_click}
          value="Login"
        />
        <p id="result">{result}</p>
      </fieldset>
    </>
  );
}

export default Login;
