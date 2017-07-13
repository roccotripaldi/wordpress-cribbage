/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/**
 * Internal Dependencies
 */
import CardSymbol from 'components/ui/card-symbol';
import Button from 'components/ui/button';
import ScoreDetailWindow from './score-detail-window';
import AcceptScoreButton from './accept-score-button';
import { getScore } from 'state/selectors/game';
import { resetDeck, resetGame } from 'state/actions/controller';
import { acceptScore } from 'state/actions/player';

class StatusMessage extends Component {
    constructor( props ) {
        super( props );
        this.state = { showDetailWindow: false };
    }

    componentWillReceiveProps( nextProps ) {
        if( this.props.nextAppointment !== nextProps.nextAppointment ) {
            this.setState( { showDetailWindow: false } );
        }
    }

    handleNextHand = ( event ) => {
        event.preventDefault();
        if ( this.props.paused ) {
            return;
        }
        const person = ( this.props.dealer === 'Player' ) ? 'Opponent' : 'Player';
        this.props.resetDeck( person );
    };

    handlePlayAgain = ( event ) => {
        event.preventDefault();
        if ( this.props.paused ) {
            return;
        }
        this.props.resetGame();
    };

    handleOpenDetailWindow = ( event ) => {
        event.preventDefault();
        if ( this.props.paused ) {
            return;
        }
        this.setState( { showDetailWindow: true } );
    };

    renderScoreDetailWindow() {
        if ( ! this.state.showDetailWindow ) {
            return null;
        }
        return <ScoreDetailWindow />;
    }

    renderScoreSummary() {
        if ( 'playerAcceptsOpponentsScore' === this.props.nextAppointment ) {
            return <p>Your opponent scored { this.renderPoints( this.props.opponentsHandScores ) }.</p>
        } else if ( 'playerAcceptsOwnScore' === this.props.nextAppointment ) {
            return <p>You scored { this.renderPoints( this.props.playersHandScores ) }.</p>;
        } else {
            return <p>{ this.renderPoints( this.props.cribScores ) } in the crib.</p>;
        }
    }

    renderPoints( scores ) {
        const { score } = scores;
        if ( 0 === score ) {
            return <span>no points</span>;
        } else if ( 1 === score ) {
            return <span>1 point</span>;
        } else {
            return <span>{ score } points</span>;
        }
    }

    renderNextHandButton() {
        if ( this.props.winningPerson ) {
            return null;
        }
        return <Button onClick={ this.handleNextHand }>Deal Next Hand</Button>
    }

    render() {
        const { winner, nextAppointment, dealer, player, opponent, playerInitialDraw, opponentInitialDraw } = this.props;
        let person, otherPerson, status;
        if ( this.props.paused ) {
            return <p>Game is paused.</p>;
        }
        switch( nextAppointment ) {
            case 'gameComplete':
                status = ( 'Player' === winner ) ? 'You win!' : 'Your opponent wins!';
                return (
                    <div>
                        <p>{ status }</p>
                        <Button onClick={ this.handlePlayAgain }>Play Again</Button>
                    </div>
                );

            case 'handComplete':
                return (
                    <div>
                        <p>Hand is complete</p>
                        { this.renderNextHandButton() }
                    </div>
                );
            case 'playerAcceptsOpponentsScore':
            case 'playerAcceptsOwnScore':
            case 'playerAcceptsCribScore':
                return (
                    <div>
                        { this.renderScoreDetailWindow() }
                        { this.renderScoreSummary() }
                        <p><a className="view-summary" onClick={ this.handleOpenDetailWindow }>View score summary...</a></p>
                        <AcceptScoreButton />
                    </div>
                );

            case 'cribScores':
            case 'playerScores':
            case 'opponentScores':
                person = 'your';
                if ( nextAppointment === 'cribScores' ) {
                    person = 'crib';
                }
                if ( nextAppointment === 'opponentScores') {
                    person = 'your opponent\'s';
                }
                return <p>Calculating { person } score...</p>;

            case 'awardHisHeels':
                person = ( 'Opponent' === dealer ) ? 'You' : 'Your opponent';
                otherPerson = ( 'Opponent' === dealer ) ? 'your opponent' : 'you';
                return <p>{ person } cut a Jack. Two points awarded to { otherPerson }!</p>;

            case 'playerCuts':
                return <p>Tap the deck to cut a card!</p>;

            case 'opponentCuts':
                return <p>Waiting for opponent to cut a card...</p>;

            case 'opponentDiscards':
                return <p>Waiting for opponent to discard...</p>;

            case 'playerDiscards':
                person = ( 'Player' === dealer ) ? 'your' : "your opponent's";
                return <p>Select two cards to discard to { person } crib.</p>;

            case 'dealCardToPlayer':
            case 'dealCardToOpponent':
                if ( player.hand.length === 0 && opponent.hand.length === 0 ) {
                    return <p>Shuffling the deck...</p>;
                }
                return <p>Dealing cards...</p>;

            case 'buildDeck':
                return <p>Shuffling the deck...</p>;

            case 'awaitDraw':
                return <p>Tap deck to pick a card.<br />Lowest draw gets first crib!</p>;

            case 'opponentDraw':
                return (
                    <p>
                        You drew the <CardSymbol card={ playerInitialDraw }/>.<br />
                        Waiting for opponent to draw...
                    </p>
                );

            case 'assignFirstDealer':
                return <p>Your opponent drew the <CardSymbol card={ opponentInitialDraw } />.</p>;

            case 'resetDeck':
                person = ( 'Player' === dealer ) ? 'you' : 'your opponent';
                return <p>First crib belongs to { person }!</p>;

            default:
                return <p>WordPress Cribbage</p>;
        }
    }
}

export default connect(
    state => {
        return {
            playersHandScores: getScore( state, 'playersHandScore' ),
            cribScores: getScore( state, 'cribScore' ),
            opponentsHandScores: getScore( state, 'opponentsHandScore' )
        }
    },
    { resetDeck, resetGame, acceptScore }
)( StatusMessage );