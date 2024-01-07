import { useState } from "react";
import "../styles/Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <input
            type="number"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="email">Re-enter Passsword:</label>
          <input
            type="number"
            required
            placeholder="Re-enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Submit</button>
        </form>
        {console.log(name, email, password)}
      </div>
    </div>
  );
};

export default Register;
