import { expect } from 'chai';

import { buildCard } from '../../../lib/deck';
import player, { defaultState } from '../player';
import {
    CONTROLLER_RESET_GAME,
    PLAYER_INITIAL_DRAW,
    CONNTROLLER_RESET_DECK,
    CONTROLLER_DEALS_CARD_TO_PLAYER,
    PLAYER_DISCARDS
} from '../../action-types';


describe( 'Player Reducer', () => {
    it( 'should return a the default state', () => {
        const state = player( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should reset to default state', () => {
        const state = player( undefined, { type: CONTROLLER_RESET_GAME } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should add the card to players initial draw', () => {
        const card = buildCard( 'Ace', 'Spades' ),
            initialState = { initialDraw: [] },
            state = player( initialState, { type: PLAYER_INITIAL_DRAW, card } );
        expect( state.initialDraw ).to.deep.equal( [ card ] );
    } );
    it( 'should remove all cards when deck is reset', () => {
        const initialState = { hand: [1,2,3,4], crib:[1,2,3,4], initialDraw:[1] },
            state = player( initialState, { type: CONNTROLLER_RESET_DECK } );
        expect( state.hand ).to.be.an( 'Array' ).that.is.empty;
        expect( state.crib ).to.be.an( 'Array' ).that.is.empty;
        expect( state.initialDraw ).to.be.an( 'Array' ).that.is.empty;
    } );
    it( 'should add a card to hand', () => {
        const card = buildCard( 'Ace', 'Diamonds' ),
            newCard = buildCard( '10', 'Clubs' ),
            initialState = { hand: [ card ] },
            state = player( initialState, { type: CONTROLLER_DEALS_CARD_TO_PLAYER, card: newCard } );
        expect( state.hand ).to.deep.equal( [ newCard, card ] );
    } );
    it( 'should remove cards from hand on discard', () => {
        const hand = [
            buildCard( 'Ace', 'Spades'),
            buildCard( 'Ace', 'Hearts' ),
            buildCard( 'Ace', 'Diamonds' ),
            buildCard( 'Ace', 'Clubs' ),
            buildCard( '2', 'Hearts' ),
            buildCard( '5', 'Clubs' )
        ],
            initialState = { hand },
            state = player( initialState, { type: PLAYER_DISCARDS, cardIndexes: [ 2, 4 ], dealer: 'Opponent' } ),
            expextedState = [
                buildCard( 'Ace', 'Spades'),
                buildCard( 'Ace', 'Hearts' ),
                buildCard( 'Ace', 'Clubs' ),
                buildCard( '5', 'Clubs' )
            ];
        expect( state.hand ).to.deep.equal( expextedState );
    } );
    it( 'should remove cards from hand, and add to crib on discard if it is players crib', () => {
        const hand = [
                buildCard( 'Ace', 'Spades'),
                buildCard( 'Ace', 'Hearts' ),
                buildCard( 'Ace', 'Diamonds' ),
                buildCard( 'Ace', 'Clubs' ),
                buildCard( '2', 'Hearts' ),
                buildCard( '5', 'Clubs' )
            ],
            initialState = { hand, crib: [] },
            state = player( initialState, {
                type: PLAYER_DISCARDS,
                cardIndexes: [ 2, 4 ],
                cards: [ buildCard( 'Ace', 'Diamonds' ), buildCard( '2', 'Hearts' ) ],
                dealer: 'Player'
            } ),
            expextedState = [
                buildCard( 'Ace', 'Spades'),
                buildCard( 'Ace', 'Hearts' ),
                buildCard( 'Ace', 'Clubs' ),
                buildCard( '5', 'Clubs' )
            ];
        expect( state.hand ).to.deep.equal( expextedState );
        expect( state.crib ).to.deep.equal( [ buildCard( 'Ace', 'Diamonds' ), buildCard( '2', 'Hearts' ) ] );
    } );
} );