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

import lernImg from "../assets/learn.png";
import timeImg from "../assets/time.png";
import motivationImg from "../assets/motivation.png";

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

        <div className="first-right">
          <img src={img} alt="" />
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

      <section className="section-third">
        <div className="top">
          <h2>The Features for Your Goals</h2>
          <p>
            Tailoring features to align with your goals is key to achieving
            success and fulfillment
          </p>
        </div>
        <div className="section-third-task">
          <div className="task1">
            <img src={lernImg} alt="icon1" />
            <h3>Learn & Improve</h3>
            <p>
              Engaging in continuous learning and self-improvement is essential
              for personal and professional growth
            </p>
          </div>
          <div className="task2">
            <img src={timeImg} alt="icon2" />
            <h3>Time saving</h3>
            <p>
              Using modern technology can lead to significant time-saving in
              various tasks and activities.
            </p>
          </div>
          <div className="task3">
            <img src={motivationImg} alt="icon3" />
            <h3>Stay Motivated</h3>
            <p>
              Practicing positive self-talk and setting achievable goals can
              help you stay motivated and focused on your aspirations
            </p>
          </div>
          <div className="task4">
            <img src={img4} alt="icon3" />
            <h3>Connections</h3>
            <p>
              Cultivating meaningful connections with others enriches our lives
              and opens doors to new opportunities
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
