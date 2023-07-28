import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SignIn } from './pages/sign-in';
import { SignUp } from './pages/sign-up';
import Profile from './pages/profile';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
