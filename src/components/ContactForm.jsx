import { useState } from "react";
import "../styles/ContactFrom.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
    interest: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Email sent successfully
        toast.success(
          "Email sent successfully! Our team will contact you as soon as possible."
        );
        setFormData({
          name: "",
          email: "",
          education: "",
          interest: "",
          gender: "",
        });
      } else {
        // Failed to send email
        toast.error("Failed to send email");
      }
    } catch (error) {
      // Error sending email
      console.error("Error sending email:", error);
      toast.error("Error sending email. Please try again later.");
    }
  };

  return (
    <div>
      <form className="fromContainer" onSubmit={handleSubmit}>
        <label htmlFor="name">Name<span>*</span>:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="off"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email<span>*</span>:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="off"
          placeholder="example@example.com"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="education">Highest Education<span>*</span>:</label>
        <input
          type="text"
          id="education"
          name="education"
          required
          autoComplete="off"
          value={formData.education}
          onChange={handleChange}
        />

        <label htmlFor="interest">Interest Field<span>*</span>:</label>
        <input
          type="text"
          id="interest"
          name="interest"
          required
          autoComplete="off"
          value={formData.interest}
          onChange={handleChange}
        />

        <div className="gender">
          <label>Gender<span>*</span>:</label>
          <input
            value="male"
            id="male"
            name="gender"
            type="radio"
            autoComplete="off"
            checked={formData.gender === "male"}
            onChange={handleChange}
          />
          <label htmlFor="male">male</label>
          <input
            value="female"
            id="female"
            name="gender"
            type="radio"
            autoComplete="off"
            checked={formData.gender === "female"}
            onChange={handleChange}
          />
          <label htmlFor="female">Female</label>
          <input
            value="others"
            name="gender"
            id="others"
            type="radio"
            autoComplete="off"
            checked={formData.gender === "others"}
            onChange={handleChange}
          />
          <label htmlFor="others">Others</label>
        </div>

        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;
