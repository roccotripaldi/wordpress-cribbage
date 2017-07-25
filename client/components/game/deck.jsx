/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
/**
 * Internal Dependencies
*/
import Card from 'components/ui/card';
import { getDeck, getCutCard, getDealer, isPegging } from 'state/selectors/game';
import { getNextAppointment, isPaused } from 'state/selectors/controller';
import { playerDraws } from 'state/actions/player';
import { selectRandomCutCard } from 'state/actions/controller';

class Deck extends Component {
    handleClick = ( event ) => {
        event.preventDefault();

        if ( ! this.canClick() ) {
            return;
        }

        if ( 'awaitDraw' === this.props.nextAppointment ) {
            const card = this.props.deck[0];
            this.props.playerDraws( card );
        }

        if ( 'playerCuts' === this.props.nextAppointment ) {
            this.props.selectRandomCutCard( this.props.deck, this.props.dealer );
        }
    };

    canClick() {
        return (
            ! this.props.paused &&
            ( 'awaitDraw' === this.props.nextAppointment || 'playerCuts' === this.props.nextAppointment )
        );
    }

    renderCards() {
        let cutCard = null, deckIndex = 0;
        if ( this.props.cutCard ) {
            cutCard = <Card card={ this.props.cutCard } index={ 1 } />;
            deckIndex = 2;
        }
        return (
            <div>
                <Card faceDown={ true } index={ deckIndex } />
                { cutCard }
            </div>
        );
    }

    render() {
        const classes = classNames( { deck: true, 'is-pegging': this.props.pegging, clickable: this.canClick() } );
        return (
            <div className={ classes } onClick={ this.handleClick }>
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
            cutCard: getCutCard( state ),
            dealer: getDealer( state ),
            pegging: isPegging( state )
        }
    },
    {
        playerDraws,
        selectRandomCutCard
    }
)( Deck );