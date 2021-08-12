import React from 'react'
import { StyledDisplay } from './styles/StyleDisplay'

interface iProps {
    gameOver: boolean;
    text: string;
}
export default function Display(props: iProps) {
    return (
        <StyledDisplay gameOver={props.gameOver}>
            {props.text}
        </StyledDisplay>
    )
}
