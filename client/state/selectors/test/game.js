import { expect } from 'chai';
import { createStore } from 'redux';

import cribbageState from '../../reducers/index';
import { getDeck } from '../game';

const state = createStore( cribbageState );

describe( 'Game Selector', () => {
    describe( 'getDeck()', () => {
        it( 'should return the deck', () => {
            const deck = getDeck( state.getState() );
            expect( deck ).to.be.an( 'Array' ).that.is.empty;
        } );
    } );
} );

