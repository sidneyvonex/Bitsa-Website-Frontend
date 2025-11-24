import Constitution from "../Components/About/Constitution";
import { MissionVisionSection } from "../Components/About/Mission&Vision";
import About from "../Components/About/AboutBitsaSection";
import { Footer } from "../Components/Footer";
import Topbar from "../Components/Topbar";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export const AboutPage = () => {
  const missionRef = useRef(null);
  const constitutionRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/mission" && missionRef.current) {
      (missionRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
    } else if (location.pathname === "/constitution" && constitutionRef.current) {
      (constitutionRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname]);

  return (
    <div>
      <Topbar />
      <About />
      <div ref={missionRef} id="mission-section">
        <MissionVisionSection />
      </div>
      <div ref={constitutionRef} id="constitution-section">
        <Constitution />
      </div>
      <Footer />
    </div>
  );
};
