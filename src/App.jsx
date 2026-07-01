import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Header from "./Componentsmain/NavBar";
import { HashRouter, Routes, Route } from "react-router-dom";
import BodyContainer from "./Componentsmain/BodyContainer";
import Home from "./pages/Matches";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Networks from "./pages/Network";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import appStore from './lib/appStore'
import { Provider } from 'react-redux'
import Request from './pages/Matches';
import Matches from './pages/Matches';
import Connections from './pages/Connections';
import Message from './pages/Message';

function App() {
  return (
    <Provider store={appStore}>
      <HashRouter>
        <div className="main-body min-h-screen w-full bg-background text-foreground">
          <Routes>
            {/* Public routes - no BodyContainer */}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            
            {/* Protected routes - wrapped with BodyContainer */}
            <Route path="/" element={<BodyContainer />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/feed" element={<Feed />}></Route>
              <Route path="/network" element={<Networks />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/Matches" element={<Matches />}></Route>
              <Route path="/matches" element={<Matches />}></Route>
              <Route path="/Connections" element={<Connections />}></Route>
              <Route path="/connections" element={<Connections />}></Route>
              <Route path="/message" element={<Message />}></Route>
              <Route path="/Message" element={<Message />}></Route>
              <Route path="*" element={<Error />}></Route>
            </Route>
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  )
}

export default App