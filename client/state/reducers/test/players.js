import { expect } from 'chai';

import { defaultState } from '../players';
import players from '../players';
import { CONTROLLER_RESET_GAME } from '../../action-types';

describe( 'Players Reducer', () => {
    it( 'should return a the default state', () => {
        const state = players( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should reset to default state', () => {
        const state = players( undefined, { type: CONTROLLER_RESET_GAME } );
        expect( state ).to.deep.equal( defaultState );
    } );
} );