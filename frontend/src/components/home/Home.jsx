// import  { useEffect } from "react";
import AboutCard from "../about/AboutCard";
import Hblog from "./Hblog";
import HAbout from "./HAbout";
import Hero from "./hero/Hero";
import Hprice from "./Hprice";
import Testimonal from "./testimonal/Testimonal";
// import axios from "axios";

const Home = () => {
  // useEffect(() => {
  //   const currentUser = async () => {
  //     try {
  //       const user = await axios.get(
  //         "http://localhost:5000/api/v1/users/current-user",
  //         { withCredentials: true }
  //       );
  //     } catch (error) {}
  //   };
  // });

  return (
    <>
      <Hero />
      <AboutCard />
      <HAbout />
      <Testimonal />
      <Hblog />
      <Hprice />
    </>
  );
};

export default Home;
