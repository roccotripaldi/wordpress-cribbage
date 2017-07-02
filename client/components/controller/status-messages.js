import {
    getPlayerInitialDraw,
    getOpponentInitialDraw,
    getOpponent,
    getPlayer
} from 'state/selectors/players';
import { getDealer, getCutCard } from 'state/selectors/game';

export const getStatusMessage = ( state, nextAppointment, paused ) => {
    let card, dealer, person, cutCard, otherPerson;
    if ( paused ) {
        return 'Game is paused.';
    }
    switch( nextAppointment ) {
        case 'playerScores':
        case 'opponentScores':
            cutCard = getCutCard( state );
            dealer = getDealer( state );
            person = ( 'Opponent' === dealer ) ? 'You' : 'Your opponent';
            return person + ' cut the ' + cutCard.name + ' of ' + cutCard.suit + '. Calculating scores...';
        case 'awardHisHeels':
            dealer = getDealer( state );
            person = ( 'Opponent' === dealer ) ? 'You' : 'Your opponent';
            otherPerson = ( 'Opponent' === dealer ) ? 'your opponent' : 'you';
            return person + ' cut a Jack. Two points awarded to ' + otherPerson + '!' ;
        case 'playerCuts':
            return 'Tap the deck to cut a card!';
        case 'opponentCuts':
            return 'Waiting for opponent to cut a card...';
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