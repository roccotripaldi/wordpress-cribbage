export const defaultState = {
    player: {
        hand: [],
        crib: [],
        score: 0,
        initialDraw: []
    },
    opponent: {
        hand: [],
        crib: [],
        score: 0,
        initialDraw: []
    },
};

const players = ( state = defaultState, action ) => {
    switch ( action.type ) {
        default:
            return state
    }
};

export default players;