/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
/**
 * Internal Dependencies
 */
import { getStatusMessage } from './status-messages';
import { getNextAppointment, isPaused, getTimerSpeed } from 'state/selectors/controller';
import { opponentDraws, opponentDiscards } from 'state/actions/player';
import { getDeck, getDealer, getCutCard } from 'state/selectors/game';
import { getPlayerInitialDraw, getOpponentInitialDraw, getPlayer, getOpponent } from 'state/selectors/players';
import { getLowestPegForPerson } from 'state/selectors/board';
import {
    controllerBuildsDeck,
    assignFistDealer,
    resetDeck,
    dealCardToPlayer,
    dealCardToOpponent,
    dealComplete,
    selectRandomCutCard,
    awardHisHeels,
    setScore,
    gameComplete
} from 'state/actions/controller';

let appointmentTimer;

class Controller extends Component {
    componentDidMount() {
        if ( ! this.props.paused ) {
            console.log( 'Setting timer on mount' );
            appointmentTimer = setInterval( this.checkAppointments, this.props.timerSpeed );
        } else {
            clearInterval( appointmentTimer );
            console.log( 'timer is paused on mount' );
        }
    }
    componentWillReceiveProps( nextProps ) {
        clearInterval( appointmentTimer );
        if ( ! nextProps.paused ) {
            console.log( 'resetting timer on received props' );
            appointmentTimer = setInterval( this.checkAppointments, nextProps.timerSpeed );
        } else {
            console.log( 'timer is paused on received props' );
        }
    }

    calculateWinner() {
        if ( this.props.player.score >= 116 ) {
            return 'Player';
        }

        if ( this.props.opponent.score >= 116 ) {
            return 'Opponent';
        }

        return null;
    }

    checkAppointments = () => {
        console.log( 'checking next appointment', this.props.nextAppointment );
        let card, pegIndex, hand, person, winner;
        switch ( this.props.nextAppointment ) {
            case 'buildDeck':
                this.props.controllerBuildsDeck();
                break;
            case 'opponentDraw':
                card = this.props.deck[0];
                this.props.opponentDraws( card );
                break;
            case 'assignFirstDealer':
                this.props.assignFistDealer( this.props.playerInitialDraw, this.props.opponentInitialDraw );
                break;
            case 'resetDeck':
                this.props.resetDeck( this.props.dealer );
                break;
            case 'dealCardToOpponent':
            case 'dealCardToPlayer':
                card = this.props.deck[0];
                if ( this.props.player.hand.length === 6 && this.props.opponent.hand.length === 6 ) {
                    this.props.dealComplete();
                } else if ( this.props.nextAppointment === 'dealCardToOpponent' ) {
                    this.props.dealCardToOpponent( card );
                } else {
                    this.props.dealCardToPlayer( card );
                }
                break;
            case 'opponentDiscards':
                this.props.opponentDiscards( this.props.opponent.hand, this.props.dealer );
                break;
            case 'opponentCuts':
                this.props.selectRandomCutCard( this.props.deck, this.props.dealer );
                break;
            case 'awardHisHeels':
                pegIndex = ( this.props.dealer === 'Player' ) ? this.props.playersLowestPeg : this.props.opponentsLowestPeg;
                this.props.awardHisHeels( this.props.dealer, pegIndex );
                break;
            case 'playerScores':
            case 'opponentScores':
            case 'cribScores':
                winner = this.calculateWinner();
                if ( winner ) {
                    this.props.gameComplete( winner );
                    return;
                }
                let hand = this.props.player.hand;
                if ( 'opponentScores' === this.props.nextAppointment ) {
                    hand = this.props.opponent.hand;
                }
                if ( 'cribScores' === this.props.nextAppointment ) {
                    hand = ( this.props.dealer === 'Player' ) ? this.props.player.crib : this.props.opponent.crib;
                }
                this.props.setScore( hand, this.props.cutCard, this.props.nextAppointment );
                break;
            case 'handComplete':
                winner = this.calculateWinner();
                if ( winner ) {
                    this.props.gameComplete( winner );
                    return;
                }
                person = ( this.props.dealer === 'Player' ) ? 'Opponent' : 'Player';
                this.props.resetDeck( person );
                break;
        }
    };

    render() {
        return (
            <div className="controller">
                <div className="controller__inner1">
                    <p>{ this.props.statusMessage }</p>
                </div>
            </div>
        );
    }
}

export default connect(
    state => {
        const nextAppointment = getNextAppointment( state ),
            paused = isPaused( state );
        return {
            nextAppointment,
            paused,
            statusMessage: getStatusMessage( state, nextAppointment, paused ),
            deck: getDeck( state ),
            playerInitialDraw: getPlayerInitialDraw( state ),
            opponentInitialDraw: getOpponentInitialDraw( state ),
            dealer: getDealer( state ),
            player: getPlayer( state ),
            opponent: getOpponent( state ),
            timerSpeed: getTimerSpeed( state ),
            playersLowestPeg: getLowestPegForPerson( state, 'Player' ),
            opponentsLowestPeg: getLowestPegForPerson( state, 'Opponent' ),
            cutCard: getCutCard( state )
        }
    },
    {
        controllerBuildsDeck,
        opponentDraws,
        assignFistDealer,
        resetDeck,
        dealCardToPlayer,
        dealCardToOpponent,
        dealComplete,
        opponentDiscards,
        selectRandomCutCard,
        awardHisHeels,
        setScore,
        gameComplete
    }
)( Controller );