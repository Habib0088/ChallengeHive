import PopularContest from './PopularContest/PopularContest';
import WinnerAdvertisement from './WinnerAdvertisement/WinnerAdvertisement';
import Roadmap from '../../Component/Roadmap/Roadmap';
import Carousel from '../../Component/Carousel';
import ScrollAnimateWrapper from '../../Component/ScrollAnimateWrapper/ScrollAnimateWrapper';
import '../../styles/theme-variables.css';

const HomeLayout = () => {
    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
           <ScrollAnimateWrapper animation="fade-in" delay={0}>
               <Carousel />
           </ScrollAnimateWrapper>
           
           <ScrollAnimateWrapper animation="fade-in-up" delay={100}>
               <PopularContest />
           </ScrollAnimateWrapper>
           
           <ScrollAnimateWrapper animation="slide-in-left" delay={200}>
               <WinnerAdvertisement />
           </ScrollAnimateWrapper>
           
           <ScrollAnimateWrapper animation="scale-in-center" delay={300}>
               <Roadmap />
           </ScrollAnimateWrapper>
        </div>
    );
};

export default HomeLayout;