import styled from 'styled-components';
import bg_image from '../../img/bg.png';

interface iProps {

}

export const StyledTetrisWrapper = styled.div<iProps>`
    width: 100vw;
    height: 100vh;
    background: url(${bg_image}) #000;
    background-size: cover;
    overflow: hidden;
`

export const StyledTetris = styled.div<iProps>`
    display: flex;
    align-items: flex-start;
    padding: 40px;
    margin: 0 auto;
    max-width: 900px;

    aside {
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 20px;
    }
`
