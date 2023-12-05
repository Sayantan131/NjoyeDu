import "../styles/ContactFrom.css";

const ContactForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const response = await fetch("http://localhost:8000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <form className="fromContainer" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required autoComplete="off" />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        autoComplete="off"
        placeholder="example@example.com"
      />

      <label htmlFor="education">Highest Education:</label>
      <input
        type="text"
        id="education"
        name="education"
        required
        autoComplete="off"
      />

      <label htmlFor="interest">Interest Field:</label>
      <input
        type="text"
        id="interest"
        name="interest"
        required
        autoComplete="off"
      />

      <div className="gender">
        <label htmlFor="gender">Gender:</label>
        <input
          value="male "
          id="male"
          name="gender"
          type="radio"
          autoComplete="off"
        />
        <label htmlFor="male">male</label>
        <input
          value="female"
          id="female"
          name="gender"
          type="radio"
          autoComplete="off"
        />
        <label htmlFor="female">Female</label>
        <input
          value="others"
          name="gender"
          id="others"
          type="radio"
          autoComplete="off"
        />
        <label htmlFor="others">Others</label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
