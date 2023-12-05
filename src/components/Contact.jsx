import "../styles/Contact.css";
import img1 from "../assets/2.png";
import img2 from "../assets/5.png";
import img3 from "../assets/6.png";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className="contactContainer">
      <h2>Contact our team for more details</h2>
      <h5>
        Our team is happy to answer your question. Fill out the <br /> from and
        we&apos;ll be in touch as possible.
      </h5>
      <div className="designContainer">
        <div className="details">
          <h2>You&apos;re in good company</h2>
          <h5>join millions of business on stripe.</h5>
          <h1>NjoyeDu</h1>
          <div className="detailsimg">
            <img src={img1} alt="image" />
            <img src={img2} alt="image" />
            <img src={img3} alt="image" />
            <img src={img1} alt="image" />
          </div>
        </div>
      </div>
      <div className="formContainer">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
