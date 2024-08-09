import '../css/gamemenu.css'
import { Link } from "wouter";


export default function GameMenu(){
    return(
        <div className='gameMenu__container'>
            <div className='gameMenu__container__options'>
                <ul className='gameMenu__container__options__list'>
                    <li className='gameMenu__container__options__list__listOption'><Link className="gameMenu__container__options__list__listOption__link" to='/game'>PLAY</Link></li>
                    <li className='gameMenu__container__options__list__listOption'><Link className="gameMenu__container__options__list__listOption__link" to='/controls'>CONTROLS</Link></li>
                </ul>
            </div>
        </div>
    )
}