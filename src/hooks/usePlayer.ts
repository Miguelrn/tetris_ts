import { useCallback, useState } from 'react'
import { checkCollition, STAGE_WIDTH } from '../gameHelper';
import { TETROMINOS, random_tetrominos, figure } from '../tetrominos';

export interface iPlayer {
    pos: { x: number, y: number };
    tetromino: (figure)[][];
    collided: boolean;
}

export const usePlayer = (): [
    iPlayer, 
    ({ x, y, collided }: {x: number, y: number, collided: boolean}) => void, 
    () => void,
    (stage: {value: figure, status: string}[][], dir: number) => void] => {
    const [player, setPlayer] = useState<iPlayer>({
        pos: { x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false,
    })

    const updatePlayerPos = ({ x, y, collided }: {x: number, y: number, collided: boolean}) => {
        setPlayer(prev => ({
          ...prev,
          pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
          collided,
        }));
    };

    const resetPlayer = useCallback(() => {
        setPlayer({
          pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
          tetromino: random_tetrominos().shape,
          collided: false,
        });
    }, []);

    const rotate = (tetrominos: (figure)[][], dir: number) => {
        const rotatedTetromino = tetrominos.map((_,index) => tetrominos.map(col => col[index]));

        if(dir > 0) { // clockwise
            return rotatedTetromino.map(row => row.reverse());
        }
        else {
            return rotatedTetromino.reverse();
        }
    }

    const playerRotate = (stage: {value: figure, status: string}[][], dir: number) => {
        const aux_player = JSON.parse(JSON.stringify(player));
        aux_player.tetromino = rotate(aux_player.tetromino, dir);

        const pos = aux_player.pos.x;
        let offset = 1;
        let canRotate = true;

        while(checkCollition(aux_player, stage, { x: 0, y: 0}) && canRotate){
            aux_player.pos.x = offset;
            offset = -(offset + (offset > 0 ? 1: -1));

            if(offset > aux_player.tetromino[0].length){
                rotate(aux_player.tetromino, -dir);
                aux_player.pos.x = pos;
                canRotate = false;
            }  
        }

        setPlayer(aux_player);
    }

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}
