import {
    getPlayerInitialDraw,
    getOpponentInitialDraw,
    getOpponent,
    getPlayer
} from 'state/selectors/players';
import { getDealer } from 'state/selectors/game';

export const getStatusMessage = ( state, nextAppointment, paused ) => {
    let card, dealer;
    if ( paused ) {
        return 'Game is paused.';
    }
    switch( nextAppointment ) {
        case 'dealCardToPlayer':
        case 'dealCardToOpponent':
            const player = getPlayer( state ),
                opponent = getOpponent( state );
            if( player.hand.length === 0 && opponent.hand.length === 0 ) {
                return 'Shuffling the deck...';
            }
            return 'Dealing cards...';
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
        case 'resetDeck':
            dealer = getDealer( state );
            return dealer + ' deals first and gets the first crib.';
        default:
            return 'WordPress Cribbage';
    }
};