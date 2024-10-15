import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_PROFILE } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_PROFILE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      {data ? (
        <p>Success! {' '}
          <Link to="/home"> Discover Recipes!</Link> 
        </p>
      ) : (
      <form onSubmit={handleFormSubmit} className="login-form">
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
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      )}

      {error && (
              <div>
                {error.message}
              </div>
            )}
      <p className="signup-link">
        Don’t have an account? <a href="/signup">Sign up!</a>
      </p>
    </div>
  );
};

export default Login;
