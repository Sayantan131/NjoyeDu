import "../styles/About.css";
import aboutimg from "../assets/about.png";
import {Link} from "react-router-dom"

const About = () => {
  return (
    <div className="about">
      <div className="image">
        <img src={aboutimg} alt="image" />
      </div>
      <div className="data">
        <h2>About Us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, voluptate sunt? Harum dicta dolor hic nobis repellendus recusandae rerum, quas veniam voluptatem in perspiciatis perferendis eum ratione commodi maxime. Maiores, magni ipsum!</p>
        <h5>Any Query? Please contact Us</h5>
      <button><Link to="/contact">Contact Us</Link></button>
      </div>
    </div>
  );
};

export default About;
