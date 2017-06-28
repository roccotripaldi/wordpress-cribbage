const defaultState = {
    deck: null,
    dealer: null,
    winner: null,
    cutCard: null,
    peggingCards: null,
    opponentsHandScore: null,
    playersHandScore: null,
    cribScore: null
};

const game = (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state
    }
};

export default game;