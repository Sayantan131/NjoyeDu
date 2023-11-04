import "../styles/Home.css";
import img from "../assets/hero.png";
import WordDisplay from "./WordDisplay";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import img7 from "../assets/7.png";

const Home = () => {
  const imageSources = [img1, img2, img3, img4, img5, img6, img7];

  return (
    <>
      <section className="first">
        <div className="first-left">
          <h1 className="change">
            <WordDisplay />
          </h1>
          <p>
            Start, switch, or advance your career with more than 5,800 courses,
            Professional Certificates, and degrees from world-className
            universities and companies.
          </p>
          <button className="btn">Learn More</button>
        </div>
        <div className="wrapper">
          <div className="first-right">
            <img src={img} alt="" />
          </div>
        </div>
      </section>

      <section className="second">
        <div className="collaborate">
          <div className="heading">
            <h1>Our main motive to provide education in structure Way</h1>
          </div>
          <div className="img">
            {imageSources.map((src, index) => (
              <img key={index} src={src} alt={`Image ${index + 1}`} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
