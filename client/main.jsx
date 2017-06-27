import React from 'react';
import Card from 'components/card';
import { buildCard } from 'lib/deck/index';

export default function() {
    const card = buildCard( 'Ace', 'Spades' ),
        card2 = buildCard( 'Queen', 'Hearts' ),
        card3 = buildCard( 'King', 'Clubs' );
    return(
        <div>
            <p className="hello-world">Hello World!</p>
            <Card card={ card } />
            <Card card={ card2 } />
            <Card card={ card3 } faceDown />
        </div>
    );
}