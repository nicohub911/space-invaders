import '../css/story.css'
import slideImg1 from '../img/slide1.webp';
import slideImg2 from '../img/slide2.webp';
import slideImg3 from '../img/slide3.webp';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Link } from "wouter";
import { useRef } from "react";


export default function Story(){
    const 
        refSlide1 = useRef(), 
        refSlide2 = useRef(),
        refSlide3 = useRef(),
        refBtnR = useRef(),
        refBtnL = useRef(),
        refLinkEnd = useRef()
    ;
    let count = 0;

    //this function track the button click count and performs slider movement.
    function movement(direction) {
        if (direction === 'Right') {
            if (count === 0) {
                count = 1;
                refBtnL.current.style.display = "inline";
                refSlide2.current.style.transform = "translateX(-100%)";    
            } else {
                count = 2;
                refBtnR.current.style.display = "none";
                refLinkEnd.current.style.display = "inline";
                refSlide3.current.style.transform = "translateX(-100%)";
            }
        }else{
            if (count === 1) {
                count = 0;
                refBtnL.current.style.display = "none"
                refSlide2.current.style.transform = "translateX(0px)";    
            } else {
                count = 1;
                refBtnR.current.style.display = "inline";
                refLinkEnd.current.style.display = "none";
                refSlide3.current.style.transform = "translateX(0px)";
            }
        }
    }

    return (
        <div className='story__container'>
            <div className='story__container__slider'>
                <button ref={refBtnL} onClick={()=>{movement('Left')}} className='story__container__slider__button    story__container__slider__buttonLeft'><FaArrowAltCircleLeft className="story__container__slider__button__icon"/></button>
                <button ref={refBtnR} onClick={()=>{movement('Right')}} className='story__container__slider__button     story__container__slider__buttonRight'><FaArrowAltCircleRight className="story__container__slider__button__icon"/></button>
                <Link ref={refLinkEnd} className="story__container__slider__link  story__container__slider__button  story__container__slider__buttonRight" to="/game_menu"><IoPlayCircleOutline className="story__container__slider__button__icon"/></Link>
                <div className='story__container__slider__transition'>
                </div>
                <div ref={refSlide1} className='story__container__slider__slide slide1'>
                    <img src={slideImg1} alt="" className='story__container__slider__slide__slideIMG' />
                </div>
                <div ref={refSlide2} className='story__container__slider__slide slide2'>
                    <img src={slideImg2} alt="" className='story__container__slider__slide__slideIMG' />
                </div>
                <div ref={refSlide3} className='story__container__slider__slide slide3'>
                <img src={slideImg3} alt="" className='story__container__slider__slide__slideIMG' />
                </div>
            </div>
        </div>
    )
}
