import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Profilepage from "./pages/Profilepage";
import Signinpage from "./pages/Signinpage";
import Signuppage from "./pages/Signuppage";
import UserProfile from "./pages/UserProfile";
import UserProvider from "./context/userProvider";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<Profilepage />} />
            <Route path="/signin" element={<Signinpage />} />
            <Route path="/signup" element={<Signuppage />} />
            <Route path="/userprofile/:id" element={<UserProfile />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
