import { Route, Link} from 'wouter'
import './css/App.css'
import Story from './components/story.jsx'
import Game from './components/game.jsx'
import GameMenu from './components/gamemenu.jsx';
import ControlsInfo from './components/controls.jsx';
import { IoPlayCircleOutline } from "react-icons/io5";

export default function App() {


  return (
    <div className='conteiner'>
      <div className="home__container">
        <Link className="home__container__Link" to="/story"><IoPlayCircleOutline className="home__container__Link__icon"/></Link>
      </div>
      <Route path='/story' component={Story}/>
      <Route path='/game_menu' component={GameMenu}/>
      <Route path='/game' component={Game}/>
      <Route path='/controls' component={ControlsInfo}/>
    </div>
  )
}