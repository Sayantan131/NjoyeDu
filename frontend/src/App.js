import "./App.css"
import Header from "./components/common/header/Header"
import { BrowserRouter as Router, Switch,Route } from "react-router-dom"
import PrivateRoute from './privateRoute.js'; 
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
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <>
      <Router>
        {isLoggedIn && <Header />} 
        <Switch>
          <PrivateRoute exact path='/' component={Home} setIsLoggedIn={setIsLoggedIn} />
          <PrivateRoute exact path='/about' component={About} setIsLoggedIn={setIsLoggedIn} />
          <PrivateRoute exact path='/courses' component={CourseHome} setIsLoggedIn={setIsLoggedIn} />
          <PrivateRoute exact path='/team' component={Team} setIsLoggedIn={setIsLoggedIn} />
          <PrivateRoute exact path='/pricing' component={Pricing} setIsLoggedIn={setIsLoggedIn} />
          <PrivateRoute exact path='/journal' component={Blog} setIsLoggedIn={setIsLoggedIn} />
          <PrivateRoute exact path='/contact' component={Contact} setIsLoggedIn={setIsLoggedIn} />
          <Route exact path='/login' component={() => <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route exact path='/register' component={() => <Register setIsLoggedIn={setIsLoggedIn} />} />
        </Switch>
        {isLoggedIn && <Footer />} 
      </Router>
    </>
  )
}

export default App