import { expect } from 'chai';

import { defaultState } from '../game';
import game from '../game';
import { CONTROLLER_BUILDS_DECK, CONTROLLER_RESET_GAME } from '../../action-types';
import { buildDeck } from '../../../lib/deck/';

describe( 'Game Reducer', () => {
    it( 'should return a the default state', () => {
        const state = game( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should add deck to the state', () => {
        const deck = buildDeck(),
            state = game( defaultState, { type: CONTROLLER_BUILDS_DECK, deck } );
        expect( state.deck.length ).to.equal( 52 );
    } );
    it( 'should reset to default state', () => {
        const state = game( undefined, { type: CONTROLLER_RESET_GAME } );
        expect( state ).to.deep.equal( defaultState );
    } );
} );