import { getPlayerInitialDraw } from 'state/selectors/players';

export const getStatusMessage = ( state, nextAppointment, paused ) => {
    if ( paused ) {
        return 'Game is paused.';
    }
    switch( nextAppointment ) {
        case 'buildDeck':
            return 'Shuffling the deck...';
        case 'awaitDraw':
            return 'Tap deck to pick a card. Lowest draw deals first!';
        case 'opponentDraw':
            const card = getPlayerInitialDraw( state );
            return 'Player drew the ' + card.name + ' of ' + card.suit + '. Waiting for opponent to draw...';
        default:
            return 'WordPress Cribbage';
    }
};