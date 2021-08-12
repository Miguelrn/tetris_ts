import React from 'react'
import { figure } from '../tetrominos'
import Cell from './Cell'
import { StyledStage } from './styles/StyleStage'

interface iProps {
    stage: {value: figure; status: string}[][]
}

export default function Stage(props: iProps) {
    
    return (
        <StyledStage width={props.stage[0].length} height={props.stage.length}>
            {props.stage.map(row => 
                row.map(
                    (cell, x) => <Cell key={x} type={cell.value}/>
                )
            )}
        </StyledStage>
    )
}
