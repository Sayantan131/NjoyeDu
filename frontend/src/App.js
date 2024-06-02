import { useHistory } from 'react-router-dom';
import "./App.css"
import Header from "./components/common/header/Header"
import { BrowserRouter as Router, Switch,Route } from "react-router-dom"
import About from "./components/about/About.jsx"
import CourseHome from "./components/allcourses/CourseHome.jsx"
import Team from "./components/team/Team.jsx"
import Pricing from "./components/pricing/Pricing.jsx"
import Blog from "./components/blog/Blog.jsx"
import Contact from "./components/contact/Contact.jsx"
import Footer from "./components/common/footer/Footer.jsx"
import Home from "./components/home/Home.jsx"
import Login from "./components/login/Login.jsx"
import Register from "./components/register/Register.jsx"
import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loggedInUser = useSelector((state) => state.auth.user);
  const history = useHistory();

console.log(`loggedInUser`, loggedInUser);

useEffect(()=>{
  if(loggedInUser){
    setIsLoggedIn(true)
  }else{
    setIsLoggedIn(false)
    history.push('/login')
  }
},[loggedInUser, history])

  return (
    <>
      <Router>
  {isLoggedIn && <Header />} 
  <Switch>
    {isLoggedIn && (
      <>
        <Route exact path='/' component={Home}  />
        <Route exact path='/about' component={About}  />
        <Route exact path='/courses' component={CourseHome}  />
        <Route exact path='/team' component={Team}  />
        <Route exact path='/pricing' component={Pricing}  />
        <Route exact path='/journal' component={Blog} />
        <Route exact path='/contact' component={Contact}  />
      </>
    )}
    <Route exact path='/login' component={() => <Login  />} />
    <Route exact path='/register' component={() => <Register  />} />
  </Switch>
  {isLoggedIn && <Footer />} 
</Router>
    </>
  )
}

export default App