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

class Deck extends Component {
    render() {
        return (
            <div className="deck">
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
            deck: getDeck( state )
        }
    }
)( Deck );