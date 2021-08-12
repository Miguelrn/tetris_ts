import styled from 'styled-components'
import { figure } from '../../tetrominos'

interface iProps {
    readonly color: string;
    readonly type: figure;
}

export const StyledCell = styled.div<iProps>`
    width: auto;
    background: rgba(${props => props.color}, 0.8);
    border: ${props => (props.type === figure.none ? '0px solid' : '4px solid')};
    border-bottom-color: rgba(${props => props.color}, 0.1);
    border-right-color: rgba(${props => props.color}, 1);
    border-top-color: rgba(${props => props.color}, 1);
    border-left-color: rgba(${props => props.color}, 0.3);
`