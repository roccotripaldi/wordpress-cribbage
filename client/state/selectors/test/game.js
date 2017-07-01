import { expect } from 'chai';

import { defaultState as state } from './fixtures';
import { getDeck, isInitialized, getDealer } from '../game';

describe( 'Game Selector', () => {
    describe( 'getDeck()', () => {
        it( 'should return the deck', () => {
            const deck = getDeck( state );
            expect( deck ).to.be.an( 'Array' ).that.is.empty;
        } );
    } );
    describe( 'isInitialized()', () => {
        it( 'should not be initialized by default', () => {
            const initialized = isInitialized( state );
            expect( initialized ).to.be.false;
        } );
        it( 'should be initialized if there is a deck', () => {
            const initialized = isInitialized( { game: { deck: [1,2,3] } } );
            expect( initialized ).to.be.true;
        } );
    } );
    describe( 'getDealer()', () => {
        it( 'should return dealer', () => {
            const dealer = getDealer( { game: { dealer: 'Player' } } );
            expect( dealer ).to.equal( 'Player' );
        })
    } );
} );

