import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Header from "./Componentsmain/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BodyContainer from "./Componentsmain/BodyContainer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Networks from "./pages/Network";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import appStore from './lib/appStore'
import { Provider } from 'react-redux'




function App() {
  //const [count, setCount] = useState(0)

  return (
    <Provider store={appStore}>
      <div className="main-body h-full w-full bg-bg text-text"></div>
      <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<BodyContainer />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/feed" element={<Feed />}></Route>
              <Route path="/network" element={<Networks />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="*" element={<Error />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
         </Provider>
      
  
  )
}

export default App
