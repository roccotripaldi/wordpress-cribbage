import { expect } from 'chai';

import { buildCard } from '../../../lib/deck';
import opponent, { defaultState } from '../opponent';
import {
    CONTROLLER_RESET_GAME,
    OPPONENT_INITIAL_DRAW,
    CONNTROLLER_RESET_DECK,
    CONTROLLER_DEALS_CARD_TO_OPPONENT
} from '../../action-types';


describe( 'Opponent Reducer', () => {
    it( 'should return a the default state', () => {
        const state = opponent( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should reset to default state', () => {
        const state = opponent( undefined, { type: CONTROLLER_RESET_GAME } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should add the card to players initial draw', () => {
        const card = buildCard( 'Ace', 'Spades' ),
            initialState = { initialDraw: [] },
            state = opponent( initialState, { type: OPPONENT_INITIAL_DRAW, card } );
        expect( state.initialDraw ).to.deep.equal( [ card ] );
    } );
    it( 'should remove all cards when deck is reset', () => {
        const initialState = { hand: [1,2,3,4], crib:[1,2,3,4], initialDraw:[1] },
            state = opponent( initialState, { type: CONNTROLLER_RESET_DECK } );
        expect( state.hand ).to.be.an( 'Array' ).that.is.empty;
        expect( state.crib ).to.be.an( 'Array' ).that.is.empty;
        expect( state.initialDraw ).to.be.an( 'Array' ).that.is.empty;
    } );
    it( 'should add a card to hand', () => {
        const card = buildCard( 'Ace', 'Diamonds' ),
            newCard = buildCard( '10', 'Clubs' ),
            initialState = { hand: [ card ] },
            state = opponent( initialState, { type: CONTROLLER_DEALS_CARD_TO_OPPONENT, card: newCard } );
        expect( state.hand ).to.deep.equal( [ newCard, card ] );
    } );
} );