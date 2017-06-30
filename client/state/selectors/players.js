import get from 'lodash/get';

    export const getPlayer = ( state ) => {
    return get( state, 'players.player' );
};

export const getOpponent = ( state ) => {
    return get( state, 'players.opponent' );
};
