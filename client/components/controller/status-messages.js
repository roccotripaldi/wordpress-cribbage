import {
    getPlayerInitialDraw,
    getOpponentInitialDraw,
    getOpponent,
    getPlayer
} from 'state/selectors/players';
import { getDealer } from 'state/selectors/game';

export const getStatusMessage = ( state, nextAppointment, paused ) => {
    let card, dealer, person;
    if ( paused ) {
        return 'Game is paused.';
    }
    switch( nextAppointment ) {
        case 'opponentDiscards':
            return 'Waiting for opponent to discard...';
        case 'playerDiscards':
            dealer = getDealer( state );
            person = ( 'Player' === dealer ) ? 'your' : "your opponent's";
            return 'Select two cards to discard to ' + person + ' crib.';
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
            return 'Tap deck to pick a card. Lowest draw gets first crib!';
        case 'opponentDraw':
            card = getPlayerInitialDraw( state );
            return 'You drew the ' + card.name + ' of ' + card.suit + '. Waiting for opponent to draw...';
        case 'assignFirstDealer':
            card = getOpponentInitialDraw( state );
            return 'Your opponent drew the ' + card.name + ' of ' + card.suit + '.';
        case 'resetDeck':
            dealer = getDealer( state );
            person = ( 'Player' === dealer ) ? 'you' : 'your opponent';
            return 'First crib belongs to ' + person + '!';
        default:
            return 'WordPress Cribbage';
    }
};