import React, { useState} from 'react'
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { StyledTetris, StyledTetrisWrapper } from './styles/StyleTetris';
import { checkCollition, create_stage } from '../gameHelper';
import { useInterval } from '../hooks/interval';
import { UseGameStatus } from '../hooks/useGameStatus';


interface iProps {

}

const Tetris = () => {
    const [dropTime, setDropTime] = useState<number | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = UseGameStatus(rowsCleared);
    
    console.log('re-render', rowsCleared)

    const movePlayer = (dir: number) => {
        if(!checkCollition(player, stage, {x: dir, y : 0}))
            updatePlayerPos({x: dir, y: 0, collided: false})
    }

    const startGame = () => {
        setGameOver(false);
        setStage(create_stage);
        resetPlayer();
        setDropTime(1000 / (level + 1) + 200);
        setScore(0);
        setRows(0);
        setLevel(0);
    }   

    const drop = () => {
        if(rows > (level + 1 ) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200)
        }
        if(!checkCollition(player, stage, {x: 0, y: 1}))
            updatePlayerPos({x: 0, y: 1, collided: false})
        else{
            if(player.pos.y < 1)
                setGameOver(true);
            updatePlayerPos({x: 0, y: 0, collided: true})
        }
            
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const keyUp = (event: { keyCode: number; }) => {
        if(!gameOver) 
            if(event.keyCode === 40) setDropTime(1000 / (level + 1) + 200);
    }

    const move = (event: { keyCode: number; }) => {
        if(!gameOver) {
            switch(event.keyCode) {
                case 37: movePlayer(-1); break; // left
                case 39: movePlayer(1); break; // right
                case 40: dropPlayer(); break;
                case 38: playerRotate(stage, 1); break;
            }
        }
    }

    useInterval(() => {
        if(!gameOver) drop()
    }, dropTime)

    return (
        <StyledTetrisWrapper role='button' tabIndex={0} onKeyDown={move} onKeyUp={keyUp}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? 
                        <Display text='Game Over' gameOver={gameOver} />
                    : 
                        <div>
                            <Display text={'Score: ' + score} gameOver={gameOver} />
                            <Display text={'Rows: ' + rows} gameOver={gameOver} />
                            <Display text={'Level: '+ level} gameOver={gameOver} />
                        </div>
                    }
                    <StartButton callBack={startGame}/>
                </aside>
                
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;
