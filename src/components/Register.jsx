import { useState } from "react";
import "../styles/Register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const FromSubmit = (e) => {
    e.preventDefault();

    if (password !== reEnterPassword) {
      toast.error("Password is not Macthed");
    }

    // submit from controller

    setName("");
    setEmail("");
    setPassword("");
    setReEnterPassword("");
  };

  return (
    <div className="register">
      <div className="registerfromcontainer">
        <form className="registerform">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            required
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">password:</label>
          <div className="inputPass">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="eye"
              onClick={handleTogglePassword}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <label htmlFor="re-enter-password">Re-enter Passsword:</label>
          <input
            type="password"
            required
            placeholder="Re-enter password"
            value={reEnterPassword}
            onChange={(e) => setReEnterPassword(e.target.value)}
          />
          <button onClick={FromSubmit}>Submit</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
