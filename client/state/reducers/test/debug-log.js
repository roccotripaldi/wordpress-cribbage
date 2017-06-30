import { expect } from 'chai';

import { defaultState } from '../debug-log';
import debugLog from '../debug-log';

describe( 'Debug Log Reducer', () => {
    it( 'should return a the default state', () => {
        const state = debugLog( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
} );