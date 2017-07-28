/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
/**
 * Internal Dependencies
 */
import StatusMessage from './status-messages';
import { getNextAppointment, isPaused, getTimerSpeed } from 'state/selectors/controller';
import { opponentDraws, opponentDiscards, opponentPlays, opponentGo, playerGo, skipPlay } from 'state/actions/player';
import {
    getDeck,
    getDealer,
    getCutCard,
    getPlayValue,
    getPlaySequence,
    canPersonPlay,
    getPreviousPlayer,
    isPlayComplete
} from 'state/selectors/game';
import { getLowestPegForPerson } from 'state/selectors/board';
import {
    getPlayerInitialDraw,
    getOpponentInitialDraw,
    getPlayer,
    getOpponent,
    calculateWinner
} from 'state/selectors/players';
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
    gameComplete,
    completePlay,
    resetPlay
} from 'state/actions/controller';

let appointmentTimer;

class Controller extends Component {
    componentDidMount() {
        if ( ! this.props.paused ) {
            appointmentTimer = setInterval( this.checkAppointments, this.props.timerSpeed );
        } else {
            clearInterval( appointmentTimer );
        }
    }

    componentWillReceiveProps( nextProps ) {
        clearInterval( appointmentTimer );
        if ( ! nextProps.paused ) {
            appointmentTimer = setInterval( this.checkAppointments, nextProps.timerSpeed );
        }
    }

    handlePlayComplete() {
        const pegIndex = ( this.props.previousPlayer === 'Opponent' ) ?
            this.props.opponentsLowestPeg :
            this.props.playersLowestPeg;
        this.props.completePlay(
            this.props.previousPlayer,
            pegIndex,
            this.props.dealer
        );
    }

    checkAppointments = () => {
        let card, pegIndex, hand, points;
        if ( this.props.winningPerson ) {
            this.props.gameComplete( this.props.winningPerson );
            return;
        }
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
            case 'playerPlays':
                if ( this.props.playComplete ) {
                    this.handlePlayComplete();
                } else if ( this.props.playValue === 31 ) {
                    this.props.resetPlay( this.props.previousPlayer );
                } else if ( ! this.props.playerCanPlay ) {
                    points = ( 'Player' === this.props.previousPlayer ) ? 1 : 0;
                    this.props.playerGo(
                        points,
                        this.props.playersLowestPeg,
                        this.props.dealer
                    );
                } else if ( isEmpty( this.props.player.peggingHand ) ) {
                    this.props.skipPlay( 'Opponent' );
                }
                break;
            case 'opponentPlays':
                if ( this.props.playComplete ) {
                    this.handlePlayComplete();
                } else if ( this.props.playValue === 31 ) {
                    this.props.resetPlay( this.props.previousPlayer );
                } else if ( ! this.props.opponentCanPlay ) {
                    points = ( 'Opponent' === this.props.previousPlayer ) ? 1 : 0;
                    this.props.opponentGo(
                        points,
                        this.props.opponentsLowestPeg,
                        this.props.dealer
                    );
                } else if ( isEmpty( this.props.opponent.peggingHand ) ) {
                    this.props.skipPlay( 'Player' );
                } else {
                    this.props.opponentPlays(
                        this.props.playValue,
                        this.props.sequence,
                        this.props.opponent.peggingHand,
                        this.props.opponentsLowestPeg
                    );
                }
                break;
            case 'playerScores':
            case 'opponentScores':
            case 'cribScores':
                hand = this.props.player.hand;
                if ( 'opponentScores' === this.props.nextAppointment ) {
                    hand = this.props.opponent.hand;
                }
                if ( 'cribScores' === this.props.nextAppointment ) {
                    hand = ( this.props.dealer === 'Player' ) ? this.props.player.crib : this.props.opponent.crib;
                }
                this.props.setScore( hand, this.props.cutCard, this.props.nextAppointment );
                break;
        }
    };

    render() {
        return (
            <div className="controller">
                <div className="controller__inner1">
                    <StatusMessage { ...this.props } />
                </div>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            nextAppointment: getNextAppointment( state ),
            paused: isPaused( state ),
            deck: getDeck( state ),
            playerInitialDraw: getPlayerInitialDraw( state ),
            opponentInitialDraw: getOpponentInitialDraw( state ),
            dealer: getDealer( state ),
            player: getPlayer( state ),
            opponent: getOpponent( state ),
            timerSpeed: getTimerSpeed( state ),
            playersLowestPeg: getLowestPegForPerson( state, 'Player' ),
            opponentsLowestPeg: getLowestPegForPerson( state, 'Opponent' ),
            cutCard: getCutCard( state ),
            winningPerson: calculateWinner( state ),
            playValue: getPlayValue( state ),
            sequence: getPlaySequence( state ),
            opponentCanPlay: canPersonPlay( state, 'opponent' ),
            playerCanPlay: canPersonPlay( state, 'player' ),
            previousPlayer: getPreviousPlayer( state ),
            playComplete: isPlayComplete( state )
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
        gameComplete,
        opponentPlays,
        opponentGo,
        playerGo,
        completePlay,
        skipPlay,
        resetPlay
    }
)( Controller );