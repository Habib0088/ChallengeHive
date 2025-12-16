import React from 'react';
import Home from '../Home/Home';
import Banner from './Banner/Banner';
import PopularContest from './PopularContest/PopularContest';
import WinnerAdvertisement from './WinnerAdvertisement/WinnerAdvertisement';

const HomeLayout = () => {
    return (
        <div >
           {/* <Home></Home> */}
           <Banner></Banner>
           <PopularContest></PopularContest>
           <WinnerAdvertisement></WinnerAdvertisement>
        </div>
    );
};

export default HomeLayout;