import { iPlayer } from "./hooks/usePlayer";
import { figure } from "./tetrominos";

export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export function create_stage(): {value: figure, status: string}[][] {
    return Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill({value: figure.none, status: 'clear'}));
}

export function checkCollition(player: iPlayer, stage: { value: figure, status: string }[][], { x: moveX, y: moveY }: {x: number, y: number}): boolean {
    for(let i = 0; i < player.tetromino.length; i++) {
        for(let j = 0; j < player.tetromino[0].length; j++) {
            if(player.tetromino[i][j] !== figure.none) {
                if(!stage[i + player.pos.y + moveY] ||
                   !stage[i + player.pos.y + moveY][j + player.pos.x + moveX] ||
                    stage[i+ player.pos.y + moveY][j + player.pos.x + moveX].status !== 'clear') {
                        return true;
                }
            }
        }
    }
    return false;
}