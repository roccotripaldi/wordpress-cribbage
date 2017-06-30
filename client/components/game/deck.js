/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/**
 * Internal Dependencies
*/
import Card from './card';
import { getDeck } from 'state/selectors/game';
import { getNextAppointment, isPaused } from 'state/selectors/controller';
import { playerDraws } from 'state/actions/player';

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
    };

    render() {
        return (
            <div className="deck" onClick={ this.handleClick }>
                {
                    this.props.deck.map( card => (
                        <Card key={ card.name + card.suit } card={ card } faceDown={ true } />
                    ) )
                }
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            deck: getDeck( state ),
            nextAppointment: getNextAppointment( state ),
            paused: isPaused( state )
        }
    },
    {
        playerDraws
    }
)( Deck );