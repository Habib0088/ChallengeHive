import React from 'react';
import Home from '../Home/Home';
import Banner from './Banner/Banner';
import PopularContest from './PopularContest/PopularContest';
import WinnerAdvertisement from './WinnerAdvertisement/WinnerAdvertisement';
import Animate from '../../Component/Animate/Animate';
import Roadmap from '../../Component/Roadmap/Roadmap';
const HomeLayout = () => {
    return (
        <div >
           {/* <Home></Home> */}
           <Banner></Banner>
           <PopularContest></PopularContest>
           <WinnerAdvertisement></WinnerAdvertisement>
           <Roadmap></Roadmap>
        </div>
    );
};

export default HomeLayout;