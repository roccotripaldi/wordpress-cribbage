import { expect } from 'chai';

import { defaultState } from '../board';
import board from '../board';
import { CONTROLLER_RESET_GAME } from '../../action-types';

describe( 'Board Reducer', () => {
    it( 'should return a the default state', () => {
        const state = board( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should reset to default state', () => {
        const state = board( undefined, { type: CONTROLLER_RESET_GAME } );
        expect( state ).to.deep.equal( defaultState );
    } );
} );