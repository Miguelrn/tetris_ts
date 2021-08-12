export enum figure { 
    none='0', 
    I='I', 
    J='J', 
    L='L', 
    O='O', 
    S='S', 
    T='T',
    Z='Z'
}
type figureType = {
    [Key in figure]: { shape: (figure)[][]; color: string; }
}

export const TETROMINOS: figureType = {
    0: { shape: [[figure.none]], color: '0, 0, 0' },
    I: {
        shape: [
            [figure.none, figure.I, figure.none, figure.none],
            [figure.none, figure.I, figure.none, figure.none],
            [figure.none, figure.I, figure.none, figure.none],
            [figure.none, figure.I, figure.none, figure.none],
        ],
        color: '80, 227, 230'
    },
    J: {
        shape: [
            [figure.none, figure.J, figure.none],
            [figure.none, figure.J, figure.none],
            [figure.J, figure.J, figure.none],
        ],
        color: '36, 95, 223'
    },
    L: {
        shape: [
            [figure.none, figure.L, figure.none],
            [figure.none, figure.L, figure.none],
            [figure.none, figure.L, figure.L],
        ],
        color: '223, 173, 36'
    },
    O: {
        shape: [
            [figure.O, figure.O],
            [figure.O, figure.O],
        ],
        color: '223, 217, 36'
    },
    S: {
        shape: [
            [figure.none, figure.S, figure.S],
            [figure.S, figure.S, figure.none],
            [figure.none, figure.none, figure.none],
        ],
        color: '48, 211, 56'
    },
    T: {
        shape: [
            [figure.none, figure.none, figure.none],
            [figure.T, figure.T, figure.T],
            [figure.none, figure.T, figure.none],
        ],
        color: '132, 61, 128'
    },
    Z: {
        shape: [
            [figure.Z, figure.Z, figure.none],
            [figure.none, figure.Z, figure.Z],
            [figure.none, figure.none, figure.none],
        ],
        color: '227, 78, 78'
    },
}

export const random_tetrominos = (): {shape: (figure)[][]; color: string;}  => {
    // return TETROMINOS[Object.keys(TETROMINOS)[Math.floor(Math.random()*Object.keys(TETROMINOS).length)]]
    let keys = Object.keys(TETROMINOS);
    let rand = Math.floor(Math.random()*(Object.keys(TETROMINOS).length - 1) + 1)
    let key = Object.keys(TETROMINOS)[rand] as figure;
    return TETROMINOS[key]
}
