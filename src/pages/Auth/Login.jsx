import React, { useState } from "react";
import { Form, message } from 'antd';
import '../../scss/register.scss';

const Login = () => {
  const [state, setState] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = e =>
    setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    let { fullName, email, password, confirmPassword } = state;
    fullName = fullName.trim();

    if (fullName.length < 3) return message.error("Please enter your full name");
    // if (!email.includes("^ [\w\.-] + @[\w\.-] +\.\w{ 2,} $")
    // ) return message.error("Please enter a valid email");
    if (password.length < 6) return message.error("Password must be at least 6 characters");
    if (password !== confirmPassword) return message.error("Passwords do not match");

    const user = { fullName, email, password };
    console.log("Registered user:", user);
  };

  return (
    <div className="register-body">
      <div className="ring">
        <i></i>
        <i></i>
        <i></i>

        <div className="register">
          <h2>Login</h2>
          <Form layout="vertical" onSubmit={handleSubmit}>
            <div className="inputBx">
              <Form.Item required>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
            <div className="inputBx">
              <Form.Item required>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
           
            <div className="inputBx">
              <button type="submit" onClick={handleSubmit}>Login</button>
            </div>
          </Form>

          <div className="links">
            <h5>Don't have a account? Register</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
