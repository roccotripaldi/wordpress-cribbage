import { expect } from 'chai';

import { defaultState } from '../board';
import board from '../board';

describe( 'Board Reducer', () => {
    it( 'should return a the default state', () => {
        const state = board( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
} );