import { expect } from 'chai';

import { buildCard } from '../../../lib/deck';
import player, { defaultState } from '../player';
import {
    CONTROLLER_RESET_GAME,
    PLAYER_INITIAL_DRAW,
    CONNTROLLER_RESET_DECK,
    CONTROLLER_DEALS_CARD_TO_PLAYER,
    PLAYER_DISCARDS,
    OPPONENT_DISCARDS,
    PLAYER_ACCEPTS_OWN_SCORE,
    CONTROLLER_HIS_HEALS,
    PLAYER_ACCEPTS_CRIB_SCORE
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
    it( 'should add cards to crib when a opponent discards and it is players crib', () => {
        const card1 = buildCard( '4', 'Hearts' ),
            card2 = buildCard( '2', 'Hearts' ),
            card3 = buildCard( '5', 'Clubs' ),
            card4 = buildCard( '8', 'Hearts' ),
            initialState = { crib: [ card1, card2 ] },
            state = player( initialState, { type: OPPONENT_DISCARDS, cards: [ card3, card4 ], dealer: 'Player' } );
        expect( state.crib ).to.deep.equal( [ card3, card4, card1, card2 ] );
    } );
    it( 'should not add cards to crib when opponent discards and it is opponents crib', () => {
        const card1 = buildCard('4', 'Hearts'),
            card2 = buildCard('2', 'Hearts'),
            initialState = {crib: []},
            state = player(initialState, {type: OPPONENT_DISCARDS, cards: [card1, card2], dealer: 'Opponent'});
        expect( state.crib ).to.deep.equal( [] );
    } );
    it( 'should increment score after hand is scored', () => {
        const initialState = { score: 10 },
            state = player( initialState, { type: PLAYER_ACCEPTS_OWN_SCORE, points: 12 } );
        expect( state.score ).to.equal( 22 );
    } );
    it( 'should increment score after crib is scored if player is dealer', () => {
        const initialState = { score: 10 },
            state = player( initialState, { type: PLAYER_ACCEPTS_CRIB_SCORE, points: 12, person: 'Player' } );
        expect( state.score ).to.equal( 22 );
    } );
    it( 'should not increment score after crib is scored if opponent is dealer', () => {
        const initialState = { score: 10 },
            state = player( initialState, { type: PLAYER_ACCEPTS_CRIB_SCORE, points: 12, person: 'Opponent' } );
        expect( state.score ).to.equal( 10 );
    } );
    it( 'should increment score after his heels is scored if player is dealer', () => {
        const initialState = { score: 10 },
            state = player( initialState, { type: CONTROLLER_HIS_HEALS, points: 2, person: 'Player' } );
        expect( state.score ).to.equal( 12 );
    } );
    it( 'should not increment score after his heels is scored if opponent is dealer', () => {
        const initialState = { score: 10 },
            state = player( initialState, { type: CONTROLLER_HIS_HEALS, points: 2, person: 'Opponent' } );
        expect( state.score ).to.equal( 10 );
    } );
} );