import { Footer } from "../Components/Footer";
import { Topbar } from "../Components/Topbar";
import { Hero } from "../Components/Home/hero";
import { UpcomingEvents } from "../Components/Home/UpcomingEvents";
import { WhoAreWe } from "../Components/Home/WhoAreWe";
import { FeaturedBlogs } from "../Components/Home/FeaturedBlogs";
import { Communities } from "../Components/Home/Communities";
import { Projects } from "../Components/Home/Projects";
import { Testimonials } from "../Components/Home/Testimonials";
import { Partners } from "../Components/Home/Partners";
import { CTABanner } from "../Components/Home/CTABanner";

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
