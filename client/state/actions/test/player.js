import { expect } from 'chai';

import { opponentDiscards } from '../player';
import { buildCard } from '../../../lib/deck';

describe( 'Player Actions', () => {
    describe( 'opponentDiscards()', () => {
        it( 'should calculate discard based on given hand', () => {
            const hand = [
                    buildCard( '5','Diamonds' ),
                    buildCard( '6', 'Spades' ),
                    buildCard( '7', 'Spades' ),
                    buildCard( 'King', 'Clubs' ),
                    buildCard( '3', 'Hearts' ),
                    buildCard( '6', 'Hearts' )
                ],
                discardAction = opponentDiscards( hand, 'Player' );
            expect( discardAction.cardIndexes ).to.deep.equal( [ 3, 4 ] );
            expect( discardAction.cards ).to.deep.equal( [ buildCard( 'King', 'Clubs' ), buildCard( '3', 'Hearts' ) ] );
        } );
    } );
} );