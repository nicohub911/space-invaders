import "../css/controls.css";
import { FaArrowUp , FaArrowRight , FaArrowLeft } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "wouter";

export default function ControlsInfo() {
    return( 
        <div className="controls__container">
            <button className="controls__container__button">
                <Link to="game_menu"><RiArrowGoBackFill className="controls__container__button__link"/></Link>
            </button>
            <div className="controls__container__shoot">
                <h2 className="controls__container__defaultTitle">Shoot</h2>
                <span className="controls__container__shoot__F">F</span>
            </div>
            <div className="controls__container__movement">
                <h2 className="controls__container__defaultTitle">Movement</h2>
                <div className="controls__container__moevement__top">
                    <FaArrowUp className="controls__container__movement__defaultArrow" />
                </div>
                <div className="controls__container__moevement__bottom">
                    <FaArrowLeft className="controls__container__movement__defaultArrow" />
                    <FaArrowRight className="controls__container__movement__defaultArrow" />
                </div>
            </div>
        </div>
    )
}