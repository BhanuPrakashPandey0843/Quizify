import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import LandingPage from "./Pages/LandingPage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import ExamDashboardPage from "./Pages/ExamDashboardPage";
import ExamPage from "./Pages/ExamPage";
import ResultPage from "./Pages/ResultPage";
import WhyPage from "./Pages/WhyPage";
import ContactPage from "./Pages/ContactPage";

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/exams" element={<ExamDashboardPage />} />
          <Route path="/why" element={<WhyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/exam/:examId" element={<ExamPage />} />
          <Route path="/results/:sessionId/:examId" element={<ResultPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
