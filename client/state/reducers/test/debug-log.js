import { expect } from 'chai';

import { defaultState } from '../debug-log';
import debugLog from '../debug-log';
import { CONTROLLER_BUILDS_DECK } from '../../action-types';

describe( 'Debug Log Reducer', () => {
    it( 'should return a the default state', () => {
        const state = debugLog( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should add an entry when the deck is built', () => {
        const state = debugLog( defaultState, { type: CONTROLLER_BUILDS_DECK, deck:[] } );
        expect( state.items[0] ).to.equal( 'Deck built and shuffled!' );
    } );
} );