const defaultState = {
    player: {
        hand: null,
        crib: null,
        score: 0,
        initialDraw: null
    },
    opponent: {
        hand: null,
        crib: null,
        score: 0,
        initialDraw: null
    },
};

const players = (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state
    }
};

export default players;