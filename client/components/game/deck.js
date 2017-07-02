/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/**
 * Internal Dependencies
*/
import Card from './card';
import { getDeck, getCutCard } from 'state/selectors/game';
import { getNextAppointment, isPaused } from 'state/selectors/controller';
import { playerDraws } from 'state/actions/player';
import { selectRandomCutCard } from 'state/actions/controller';

class Deck extends Component {
    handleClick = ( event ) => {
        event.preventDefault();

        if ( this.props.paused ) {
            console.log( 'No action when game is paused.' );
            return;
        }

        if ( 'awaitDraw' === this.props.nextAppointment ) {
            const card = this.props.deck[0];
            this.props.playerDraws( card );
        }

        if ( 'playerCuts' === this.props.nextAppointment ) {
            this.props.selectRandomCutCard( this.props.deck );
        }
    };

    renderCards() {
        if ( this.props.cutCard ) {
            return <Card card={ this.props.cutCard } />;
        }
        return <Card faceDown={ true } />;
    }

    render() {
        return (
            <div className="deck" onClick={ this.handleClick }>
                { this.renderCards() }
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            deck: getDeck( state ),
            nextAppointment: getNextAppointment( state ),
            paused: isPaused( state ),
            cutCard: getCutCard( state )
        }
    },
    {
        playerDraws,
        selectRandomCutCard
    }
)( Deck );