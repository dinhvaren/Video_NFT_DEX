import React from 'react';
import Style from '../Styles/index.module.css'
import {
    BigNFTSilder,
    HeroSection,
    Service,
    Subscribe,
    Title,
    Category,
    Filter,
    NFTCard,
} from '../components/componentsIndex';
const Home = () => {
    return (
        <div className={Style.homePage}>
            <HeroSection />
            <Service />
            <BigNFTSilder />
            <Title
                heading="Audio Collection"
                paragraph="Discover the most outstanding NFTs in all topics of life."
            />   
            <Filter />
            <NFTCard />
            <Category />   
            <Subscribe />
        </div>
    );
}
export default Home;     