import { expect } from 'chai';

import { buildCard } from '../../../lib/deck';
import opponent, { defaultState } from '../opponent';
import { CONTROLLER_RESET_GAME, OPPONENT_INITIAL_DRAW } from '../../action-types';


describe( 'Opponent Reducer', () => {
    it( 'should return a the default state', () => {
        const state = opponent( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should reset to default state', () => {
        const state = opponent( undefined, { type: CONTROLLER_RESET_GAME } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should add the card to players initial draw', () => {
        const card = buildCard( 'Ace', 'Spades' ),
            initialState = { initialDraw: [] },
            state = opponent( initialState, { type: OPPONENT_INITIAL_DRAW, card } );
        expect( state.initialDraw ).to.deep.equal( [ card ] );
    } );
} );