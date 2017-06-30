import { expect } from 'chai';

import { defaultState } from '../game';
import game from '../game';
import { CONTROLLER_BUILDS_DECK } from '../../action-types';
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
} );