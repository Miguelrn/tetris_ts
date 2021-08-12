import React from 'react'
import { StyledCell } from './styles/StyleCell';
import { figure, TETROMINOS } from '../tetrominos';

interface iProps {
    type: figure
}

const Cell = (props: iProps) => {
    return (
        <StyledCell type={props.type} color={TETROMINOS[props.type].color}>
            
        </StyledCell>
    )
}
export default React.memo(Cell);
