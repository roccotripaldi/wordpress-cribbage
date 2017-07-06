import {
    getPlayerInitialDraw,
    getOpponentInitialDraw,
    getOpponent,
    getPlayer
} from 'state/selectors/players';
import { getDealer, getCutCard, getWinner } from 'state/selectors/game';

export const getStatusMessage = ( state, nextAppointment, paused ) => {
    let card, dealer, person, cutCard, otherPerson, winner, message;
    if ( paused ) {
        return 'Game is paused.';
    }
    switch( nextAppointment ) {
        case 'gameComplete':
            winner = getWinner( state );
            message = ( 'Player' === winner ) ? 'You win!' : 'Your opponent wins!';
            return 'Game over. ' + message + ' Hit \'Reset\' to play again.';
        case 'handComplete':
            return 'Hand is complete';
        case 'playerAcceptsOpponentsScore':
            return 'Review and accept your opponent\s score.';
        case 'playerAcceptsOwsScore':
            return 'Review and accept your score.';
        case 'playerAcceptsCribScore':
            return 'Review and accept crib score';
        case 'cribScores':
        case 'playerScores':
        case 'opponentScores':
            person = 'your';
            if ( nextAppointment === 'cribScores' ) {
                person = 'crib';
            }
            if ( nextAppointment === 'opponentScores' ) {
                person = 'your opponent\'s';
            }
            return 'Calculating ' + person + ' score...';
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