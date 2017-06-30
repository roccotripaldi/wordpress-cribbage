import { expect } from 'chai';

import { defaultState } from '../controller';
import controller from '../controller';

describe( 'Controller Reducer', () => {
    it( 'should return a the default state', () => {
        const state = controller( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
} );