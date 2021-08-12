import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { create_stage, STAGE_WIDTH } from '../gameHelper';
import { figure, random_tetrominos } from '../tetrominos';
import { iPlayer } from './usePlayer';



export const useStage = (player: iPlayer, resetPlayer: () => void): [
    {value: figure, status: string}[][], 
    (Dispatch<SetStateAction<{ value: figure; status: string; }[][]>>),
    number
] => {
    const [stage, setStage] = useState(create_stage);
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
      setRowsCleared(0);
      const sweepRows = (newStage: any[][]) =>
        newStage.reduce((ack, row) => {
          if (row.findIndex(cell => cell.value === figure.none) === -1) { // full line, need to be clear
            setRowsCleared(prev => prev + 1);
            let empty_arr: {value: figure, status: string}[] = new Array(STAGE_WIDTH).fill({value: figure.none, status: 'clear'});
            ack.unshift(empty_arr);
            return ack;
          }
          ack.push(row);
          return ack;
        }, []);


        const updateStage = (prevStage: {
            value: figure;
            status: string;
        }[][]) => {
            // First flush the stage
            const newStage = prevStage.map(row =>
              row.map(cell => (cell.status === 'clear' ? {value: figure.none, status: 'clear'} : cell))
            );
      
            // Then draw the tetromino
            player.tetromino.forEach((row, y) => {
              row.forEach((value, x) => {
                if (value !== figure.none) {
                  newStage[y + player.pos.y][x + player.pos.x] = 
                  {
                      value: value,
                      status: (player.collided) ? 'merged' : 'clear'
                  }
                }
              });
            });

            if(player.collided) {
              resetPlayer();
              return sweepRows(newStage)
            } 
            
            return newStage;
        };
      
        // Here are the updates
        setStage(prev => updateStage(prev));
    }, [player, resetPlayer])

    return [stage, setStage, rowsCleared];
}