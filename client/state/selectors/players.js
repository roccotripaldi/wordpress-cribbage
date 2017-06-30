import get from 'lodash/get';

    export const getPlayer = ( state ) => {
    return get( state, 'player' );
};

export const getOpponent = ( state ) => {
    return get( state, 'opponent' );
};
