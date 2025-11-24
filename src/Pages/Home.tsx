import { Footer } from "../Components/Footer"
import Topbar from "../Components/Topbar"
import { Communities } from "../Components/Home/Communities"
import { CTABanner } from "../Components/Home/CTABanner"
import { FeaturedBlogs } from "../Components/Home/FeaturedBlogs"
import { Hero } from "../Components/Home/hero"
import { Partners } from "../Components/Home/Partners"
import { Projects } from "../Components/Home/Projects"
import { Testimonials } from "../Components/Home/Testimonials"
import { UpcomingEvents } from "../Components/Home/UpcomingEvents"

import { WhoAreWe } from "../Components/Home/WhoAreWe"
import { LoadingScreen } from "../Components/LoadingScreen"
import { useEffect, useState } from "react"

export const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Topbar/>
      <Hero/>
      <WhoAreWe/>
      <UpcomingEvents/>
      <FeaturedBlogs/>
      <Communities/>
      <Projects/>
      <Testimonials/>
      <Partners/>
      <CTABanner/>
      <Footer/>
    </>
  );
}
