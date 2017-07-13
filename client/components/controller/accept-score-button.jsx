/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/**
 * Internal Dependencies
 */
import Button from 'components/ui/button';
import { getNextAppointment, isPaused } from 'state/selectors/controller';
import { getDealer, getScore } from 'state/selectors/game';
import { acceptScore } from 'state/actions/player';
import { getLowestPegForPerson } from 'state/selectors/board';

class AcceptScoreButton extends Component {
    handleClick = () => {
        let pegIndex = this.props.playersLowestPeg;
        event.preventDefault();
        if ( this.props.paused ) {
            return;
        }
        this.setState( { showSummary: false } );
        if (
            'playerAcceptsOpponentsScore' === this.props.nextAppointment ||
            ( 'playerAcceptsCribScore' === this.props.nextAppointment && this.props.dealer === 'Opponent' )
        ) {
            pegIndex = this.props.opponentsLowestPeg;
        }
        this.props.acceptScore(
            this.props.scores.score,
            this.props.nextAppointment,
            this.props.dealer,
            pegIndex
        );
    };
    render() {
        return <Button onClick={ this.handleClick }>Ok</Button>;
    }
}

export default connect(
    state => {
        let scores = null;
        const nextAppointment = getNextAppointment( state ),
            dealer = getDealer( state );
        if ( 'playerAcceptsOwnScore' === nextAppointment ) {
            scores = getScore( state, 'playersHandScore' );
        } else if ( 'playerAcceptsOpponentsScore' === nextAppointment ) {
            scores = getScore( state, 'opponentsHandScore' );
        } else if ( 'playerAcceptsCribScore' === nextAppointment ) {
            scores = getScore( state, 'cribScore' );
        }
        return {
            nextAppointment,
            dealer,
            scores,
            paused: isPaused( state ),
            playersLowestPeg: getLowestPegForPerson( state, 'Player' ),
            opponentsLowestPeg: getLowestPegForPerson( state, 'Opponent' )
        }
    },
    { acceptScore }
)( AcceptScoreButton );