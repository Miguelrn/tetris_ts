import React from 'react'
import { StyledStartButton } from './styles/StyleStartButton'

interface iProps {
    callBack: () => void
}

export default function StartButton(props: iProps) {
    return (
        <StyledStartButton onClick={props.callBack}>
            Start Game
        </StyledStartButton>
    )
}
