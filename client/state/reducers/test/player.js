import { expect } from 'chai';

import { buildCard } from '../../../lib/deck';
import player, { defaultState } from '../player';
import { CONTROLLER_RESET_GAME, PLAYER_INITIAL_DRAW } from '../../action-types';


describe( 'Player Reducer', () => {
    it( 'should return a the default state', () => {
        const state = player( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should reset to default state', () => {
        const state = player( undefined, { type: CONTROLLER_RESET_GAME } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should add the card to players initial draw', () => {
        const card = buildCard( 'Ace', 'Spades' ),
            initialState = { initialDraw: [] },
            state = player( initialState, { type: PLAYER_INITIAL_DRAW, card } );
        expect( state.initialDraw ).to.deep.equal( [ card ] );
    } );
} );