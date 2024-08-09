import '../css/game.css'
import { useEffect, useRef, useState } from 'react';
import shipImage from '../img/ship.webp';
import alienImage from '../img/alien.webp'
import { Link} from 'wouter'

export default function Game() {
    let menuGameOver = useRef();
    const updateCanvasRef = useRef(null);
    // canvas
    const frame = 32;
    let row = 16;
    let column = 16;
    let playgroundWidth = frame * column;
    let playgroundHeght = frame * row;
    const playground = useRef();
    // ship
    let shipWidth = frame * 2;
    let shipHeght = frame * 2;
    let initialShipX = frame * column / 2 - frame;
    let initialShipY = frame * row - frame * 2;
    const shipRef = useRef({ x: initialShipX, y: initialShipY, width: shipWidth, height: shipHeght });
    const shipSpeedX = frame;
    // aliens
    let alienArray = [];
    let alienWidth = frame * 2;
    let alienHeight = frame;
    let alienX = frame;
    let alienY = frame;
    let alienRows = 2;
    let alienColumns = 4;
    let aliensCount = 0; // aliens to defeat
    let alienIMG;
    let alienSpeedX = 1; // alien move speed
    // guns 
    let bulletArray = [];
    let bulletSpeedY = -10;
    // score
    const [scoreCount, setScore] = useState(0);
    let gameOver = false;
    // restar the game
    function restart() {
        window.location.reload();
    }
    // create alins
    function createAliens() {
        let occupiedPositions = [];
        for (let i = 0; i < alienColumns; i++) {
            for (let a = 0; a < alienRows; a++) {
                if (occupiedPositions.includes(`${alienX + i * alienWidth},${alienY + a * alienHeight}`)) {
                    continue;
                }
                let alien = {
                    img: alienIMG,
                    x: alienX + i * alienWidth,
                    y: alienY + a * alienHeight,
                    width: alienWidth,
                    height: alienHeight,
                    alive: true
                }
                alienArray.push(alien);
                occupiedPositions.push(`${alienX + i * alienWidth},${alienY + a * alienHeight}`);
            }
        }
        aliensCount = alienArray.length;
    }
    // move the ship
    function moveShip(e) {
        // you cant move the ship if the game is over.
        if (gameOver) {
            return;
        }

        if (e.code === "ArrowLeft" && shipRef.current.x >= frame) {
            shipRef.current.x -= shipSpeedX;
        } else if (e.code === "ArrowRight" && shipRef.current.x <= (playgroundWidth - (shipRef.current.width + frame))) {
            shipRef.current.x += shipSpeedX;
        }
    }
    // shoot bullets
    function shoot(e) {
        let shipXposition = shipRef.current.x;
        let shipYposition = shipRef.current.y;
        // you cant shoot if the game is over
        if (gameOver) {
            return;
        }
        if (e.code == "KeyF") {
            let bullet = {
                x: shipXposition + shipWidth * 15 / 32,
                y: shipYposition,
                width: frame / 8,
                height: frame / 2,
                used: false
            }
            bulletArray.push(bullet);
        }
    }
    // bullets hits an alien
    function detectHits(a, b) {
        // condicion to collision of two rectangles
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
    }

    useEffect(() => {
        updateCanvasRef.current = updateCanvas;
        const handleKeyDown = (e) => moveShip(e);
        const handleKeyUp = (e) => shoot(e);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        let canvasContext = playground.current.getContext('2d');
        let shipIMG = new Image();
        shipIMG.src = shipImage;
        shipIMG.onload = function () {
            requestAnimationFrame(updateCanvas);
        };
        function updateCanvas() {
            // cant update the canvas if the game is over
            if (gameOver) {
                return;
            }

            requestAnimationFrame(updateCanvas);
            canvasContext.clearRect(0, 0, playgroundWidth, playgroundHeght); // clear canvas
            //ship
            canvasContext.drawImage(shipIMG, shipRef.current.x, shipRef.current.y, shipRef.current.width, shipRef.current.height);
            //aliens movement
            for (let i = 0; i < alienArray.length; i++) {
                let alien = alienArray[i];
                if (alien.alive) {
                    alien.x += alienSpeedX;
                    // aliens touch the borders
                    if (alien.x + alien.width >= playgroundWidth || alien.x <= 0) {
                        alienSpeedX *= -1;
                        alien.x += alienSpeedX * 2;
                        // move down aliens
                        for (let s = 0; s < alienArray.length; s++) {
                            alienArray[s].y += alienHeight;
                        }
                    }
                    canvasContext.drawImage(alienIMG, alien.x, alien.y, alien.width, alien.height)

                    if (alien.y >= shipRef.current.y) {
                        menuGameOver.current.style.opacity = "1";
                        gameOver = true;
                    }
                }
            }
            // add bullets when you are shooting
            for (let h = 0; h < bulletArray.length; h++) {
                let bullet = bulletArray[h];
                bullet.y += bulletSpeedY;
                canvasContext.fillStyle = "white";
                canvasContext.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
                // bullets hits an alien
                for (let s = 0; s < alienArray.length; s++) {
                    let alien = alienArray[s];
                    if (!bullet.used && alien.alive && detectHits(bullet, alien)) {
                        bullet.used = true;
                        alien.alive = false;
                        aliensCount--;
                        setScore(prevScore => prevScore + 100);
                    }
                }
            }
            // clear bullets (array) 
            while (bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0)) {
                bulletArray.shift(); // remove te firs bullet
            }
            // next level (all aliens are dead)
            if (aliensCount == 0) {
                // cap the number of colimns can have an alien (6 columns)
                alienColumns = Math.min(alienColumns + 1, column / 2 - 2);
                // cap the number of row can have an alien (12)
                alienRows = Math.min(alienRows + 1, row - 4);
                // increase the velocity of aliens
                alienSpeedX += 0.1;
                alienArray = [];
                bulletArray = [];
                createAliens();
            } 
        }
        alienIMG = new Image();
        alienIMG.src = alienImage
        createAliens();

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);
    

    return (
        <div className="game__container">
            <div className='game__container__score' style={{ width: `${playgroundWidth}px` }}>
                score: {scoreCount}
            </div>
            <canvas ref={playground} height={playgroundHeght} width={playgroundWidth} className='game__container__playGround'>

            </canvas>
            <div ref={menuGameOver} className='game__container__gameOver'>
                <p className='game__container__gameOver__title'>Continue?...</p>
                <div>
                <button className='game__container__gameOver__btn' onClick={()=>{restart()}}><p className='game__container__gameOver__btn__text'>Yes</p></button>
                <button className='game__container__gameOver__btn'>
                    <Link className='game__container__gameOver__btn__text' to="/">No</Link>
                </button>
                </div>
            </div>
        </div>
    )
}