import { getPlayerInitialDraw, getOpponentInitialDraw } from 'state/selectors/players';

export const getStatusMessage = ( state, nextAppointment, paused ) => {
    let card;
    if ( paused ) {
        return 'Game is paused.';
    }
    switch( nextAppointment ) {
        case 'buildDeck':
            return 'Shuffling the deck...';
        case 'awaitDraw':
            return 'Tap deck to pick a card. Lowest draw deals first!';
        case 'opponentDraw':
            card = getPlayerInitialDraw( state );
            return 'Player drew the ' + card.name + ' of ' + card.suit + '. Waiting for opponent to draw...';
        case 'assignFirstDealer':
            card = getOpponentInitialDraw( state );
            return 'Your opponent drew the ' + card.name + ' of ' + card.suit + '.';
        default:
            return 'WordPress Cribbage';
    }
};