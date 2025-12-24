import React from "react";
import Home from "./pages/Home";
import ResumeBuilder from "./pages/ResumeBuilder";
import Layout from "./pages/Layout";
import Preview from "./pages/Preview";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import { Routes, Route } from "react-router-dom";



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        <Route path="builder/resumeId" element={<Preview />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
