import "../styles/ContactFrom.css";

const ContactForm = () => {
  return (
    <form className="fromContainer">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />

      <label htmlFor="education">Highest Education:</label>
      <input type="text" id="education" name="education" required />

      <label htmlFor="interest">Interest Field:</label>
      <input type="text" id="interest" name="interest" required />

      <div className="gender">
        <label htmlFor="gender">Gender:</label>
        <input value="male " id="male" name="gender" type="radio" />
        <label htmlFor="male">male</label>
        <input value="female" id="female" name="gender" type="radio" />
        <label htmlFor="female">Female</label>
        <input value="others" name="gender" id="others" type="radio" />
        <label htmlFor="others">Others</label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
