/**
 * External Dependencies
 */
import React, { Component } from 'react';
/**
 * Internal Dependencies
 */
import { buildCard } from 'lib/deck';
import Card from './card';

class Deck extends Component {
    render() {
        const card = buildCard( 'King', 'Diamonds' );
        return (
            <div className="deck">
                <Card card={ card } faceDown={ true } />
            </div>
        );
    }
}

export default Deck;