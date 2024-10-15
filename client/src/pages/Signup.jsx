import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_PROFILE } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_PROFILE);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  // import React, { useState } from "react";
  // import { useNavigate } from "react-router-dom";

  // const Signup = () => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [username, setUsername] = useState("");
  //   const navigate = useNavigate();

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("Signing up with:", { email, password, username });

  //     navigate("/home");
  //   };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {data ? (
        <p>
          Success! You may now head{" "}
          <Link to="/home">back to the homepage.</Link>
        </p>
      ) : (
        <form onSubmit={handleFormSubmit} className="signup-form">
          <input
            className="form-input"
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="Your username"
            name="username"
            type="text"
            value={formState.name}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}

      <p className="login-link">
        Already have an account? <a href="/">Log in!</a>
      </p>
    </div>
  );
};

export default Signup;
