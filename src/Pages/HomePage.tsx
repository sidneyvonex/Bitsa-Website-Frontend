import { Footer } from "../Components/Footer";
import { Topbar } from "../Components/Topbar";
import { Hero } from "../Home/hero";
import { UpcomingEvents } from "../Home/UpcomingEvents";
import { WhoAreWe } from "../Home/WhoAreWe";
import { FeaturedBlogs } from "../Home/FeaturedBlogs";
import { Communities } from "../Home/Communities";
import { Projects } from "../Home/Projects";
import { Testimonials } from "../Home/Testimonials";
import { Partners } from "../Home/Partners";
import { CTABanner } from "../Home/CTABanner";

export const Home = () => {
    return (
        <div>
            <Topbar />
            <Hero />
            <WhoAreWe />
            <UpcomingEvents />
            <FeaturedBlogs />
            <Communities />
            <Projects />
            <Testimonials />
            <Partners />
            <CTABanner />
            <Footer />
        </div>
    );
};
