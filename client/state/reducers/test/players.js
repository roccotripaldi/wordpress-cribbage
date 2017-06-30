import { expect } from 'chai';

import { defaultState } from '../players';
import players from '../players';

describe( 'Players Reducer', () => {
    it( 'should return a the default state', () => {
        const state = players( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
} );