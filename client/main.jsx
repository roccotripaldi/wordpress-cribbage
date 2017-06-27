import React from 'react';
import Card from 'components/card';
import { buildCard } from 'lib/deck/index';

export default function( props ) {
    const card1 = buildCard( '3', 'Hearts' );
    const card2 = buildCard( '5', 'Diamonds' );
    const card3 = buildCard( 'Ace', 'Spades' );
    return(
        <div>
            <p className="hello-world">Hello World!</p>
            <Card card={ card1 } />
        </div>
    );
}