import Footer from "./Component/Footer"
import Header from "./Component/Header"
import HeroSection from "./Component/HeroSection"
import UseCase from "./Component/UseCase"
import WhatNew from "./Component/WhatNew"

const Home = () => {
  return (
    <div className="relative">
            <div className="fixed w-full z-30">
                <Header />
            </div>
            <div id="heroSection" className="pt-24">
                <HeroSection />
            </div>
            <div id="useCase">
                <UseCase />
            </div>
            <div id="whatNew" className="bg-white">
                <WhatNew />
            </div>
            
            <div >
                <Footer/>
            </div>
        </div>
  )
}

export default Home