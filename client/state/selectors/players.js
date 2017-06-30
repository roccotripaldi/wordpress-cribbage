import get from 'lodash/get';

    export const getPlayer = ( state ) => {
    return get( state, 'player' );
};

export const getOpponent = ( state ) => {
    return get( state, 'opponent' );
};

export const getPlayerInitialDraw = ( state ) => {
    return get( state, 'player.initialDraw[0]' );
};

export const getOpponentInitialDraw = ( state ) => {
    return get( state, 'opponent.initialDraw[0]' );
};