import { expect } from 'chai';

import { defaultState } from '../controller';
import { assignFistDealer, selectRandomCutCard } from '../controller';
import { CONTROLLER_ASSIGNS_FIRST_DEALER } from '../../action-types';
import { buildCard } from '../../../lib/deck';

describe( 'Controller Actions', () => {
    describe( 'assignFistDealer()', () => {
        it( 'should assign player if players card is lower', () => {
            const playerCard = buildCard( '8', 'Diamonds' ),
                opponentCard = buildCard( 'Jack', 'Hearts' ),
                assignment = assignFistDealer( playerCard, opponentCard );
            expect( assignment.dealer ).to.equal( 'Player' );
        } );
        it( 'should assign opponent if opponents card is lower', () => {
            const playerCard = buildCard( 'King', 'Diamonds' ),
                opponentCard = buildCard( 'Jack', 'Hearts' ),
                assignment = assignFistDealer( playerCard, opponentCard );
            expect( assignment.dealer ).to.equal( 'Opponent' );
        } );
        it( 'should assign opponent if opponents card suit is lower', () => {
            const playerCard = buildCard( 'King', 'Diamonds' ),
                opponentCard = buildCard( 'King', 'Clubs' ),
                assignment = assignFistDealer( playerCard, opponentCard );
            expect( assignment.dealer ).to.equal( 'Opponent' );
        } );
    } );
    describe( 'selectRandomCutCard()', () => {
        it( 'should select a random card from the deck', () => {
            const deck = [
                buildCard( 'King', 'Diamonds' ),
                buildCard( 'King', 'Clubs' ),
                buildCard( 'Jack', 'Hearts' ),
                buildCard( '8', 'Diamonds' )
            ],
                cutCardAction = selectRandomCutCard( deck, 'Player' );
            expect( cutCardAction.card ).to.have.property( 'name' );
            expect( cutCardAction.card ).to.have.property( 'suit' );
        } );
    } );
} );