import { expect } from 'chai';

import { defaultState } from '../game';
import game from '../game';

describe( 'Game Reducer', () => {
    it( 'should return a the default state', () => {
        const state = game( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
} );