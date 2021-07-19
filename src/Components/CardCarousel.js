import {  CarouselProvider, Slider } from "pure-react-carousel";
import React from "react";
import 'pure-react-carousel/dist/react-carousel.es.css'
import CustomSlide from "./CustomSlide";
import '../Css/Recommend.css'


const CardCarousel = () => (
  //creates a custom carousel using the pure react carousel package
  //naturalSlideWidth and height specifies the width and height of each of the slide as a Fraction of the total screen size
  //total slides as the name suggests is how many slides there would be in the carousel
  //visibleSlides specifies the number of slides visible on the screen at once
  <CarouselProvider
    className ="carousel"
    naturalSlideWidth={0.33}
    naturalSlideHeight={0.102}
    totalSlides={10}
    visibleSlides={4}
    infinite = {true}
    isPlaying ={true}
    orientation="horizontal"
    //style = {{position: 0}}
  >
    {/* //render CustomSlide components inside the slider of the carousel */}
     <Slider className = 'slides' >
          <CustomSlide/>
      </Slider>
      </CarouselProvider>
);

export default CardCarousel;