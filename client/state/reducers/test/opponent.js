import { expect } from 'chai';

import { buildCard } from '../../../lib/deck';
import opponent, { defaultState } from '../opponent';
import {
    CONTROLLER_CUT_CARD,
    CONTROLLER_RESET_GAME,
    OPPONENT_INITIAL_DRAW,
    CONNTROLLER_RESET_DECK,
    CONTROLLER_DEALS_CARD_TO_OPPONENT,
    PLAYER_DISCARDS,
    OPPONENT_DISCARDS,
    PLAYER_ACCEPTS_OPPONENTS_SCORE,
    CONTROLLER_HIS_HEALS,
    PLAYER_ACCEPTS_CRIB_SCORE,
    OPPONENT_PLAYS,
    OPPONENT_GO
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
    it( 'should add cards to crib when a player discards and it is opponents crib', () => {
        const card1 = buildCard( '4', 'Hearts' ),
            card2 = buildCard( '2', 'Hearts' ),
            initialState = { crib: [] },
            state = opponent( initialState, { type: PLAYER_DISCARDS, cards: [ card1, card2 ], dealer: 'Opponent' } );
        expect( state.crib ).to.deep.equal( [ card1, card2 ] );
    } );
    it( 'should not add cards to crib when a player discards and it is players crib', () => {
        const card1 = buildCard( '4', 'Hearts' ),
            card2 = buildCard( '2', 'Hearts' ),
            initialState = { crib: [] },
            state = opponent( initialState, { type: PLAYER_DISCARDS, cards: [ card1, card2 ], dealer: 'Player' } );
        expect( state.crib ).to.deep.equal( [] );
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
            state = opponent( initialState, { type: OPPONENT_DISCARDS, cardIndexes: [ 2, 4 ], dealer: 'Player' } ),
            expextedState = [
                buildCard( 'Ace', 'Spades'),
                buildCard( 'Ace', 'Hearts' ),
                buildCard( 'Ace', 'Clubs' ),
                buildCard( '5', 'Clubs' )
            ];
        expect( state.hand ).to.deep.equal( expextedState );
    } );
    it( 'should remove cards from hand, and add to crib on discard if it is opponents crib', () => {
        const hand = [
                buildCard( 'Ace', 'Spades'),
                buildCard( 'Ace', 'Hearts' ),
                buildCard( 'Ace', 'Diamonds' ),
                buildCard( 'Ace', 'Clubs' ),
                buildCard( '2', 'Hearts' ),
                buildCard( '5', 'Clubs' )
            ],
            cribCard1 = buildCard( '10', 'Diamonds' ),
            cribCard2 = buildCard( '10', 'Hearts' ),
            cribCard3 = buildCard( 'Ace', 'Diamonds' ),
            cribCard4 = buildCard( '2', 'Hearts' ),
            initialState = { hand, crib: [ cribCard1, cribCard2 ] },
            state = opponent( initialState, {
                type: OPPONENT_DISCARDS,
                cardIndexes: [ 2, 4 ],
                cards: [ cribCard3, cribCard4 ],
                dealer: 'Opponent'
            } ),
            expextedState = [
                buildCard( 'Ace', 'Spades'),
                buildCard( 'Ace', 'Hearts' ),
                buildCard( 'Ace', 'Clubs' ),
                buildCard( '5', 'Clubs' )
            ];
        expect( state.hand ).to.deep.equal( expextedState );
        expect( state.crib ).to.deep.equal( [ cribCard3, cribCard4, cribCard1, cribCard2 ] );
    } );
    it( 'should increment score after hand is scored', () => {
        const initialState = { score: 10 },
            state = opponent( initialState, { type: PLAYER_ACCEPTS_OPPONENTS_SCORE, points: 12 } );
        expect( state.score ).to.equal( 22 );
    } );
    it( 'should increment score after crib is scored if opponent is dealer', () => {
        const initialState = { score: 10 },
            state = opponent( initialState, { type: PLAYER_ACCEPTS_CRIB_SCORE, points: 12, person: 'Opponent' } );
        expect( state.score ).to.equal( 22 );
    } );
    it( 'should not increment score after crib is scored if player is dealer', () => {
        const initialState = { score: 10 },
            state = opponent( initialState, { type: PLAYER_ACCEPTS_CRIB_SCORE, points: 12, person: 'Player' } );
        expect( state.score ).to.equal( 10 );
    } );
    it( 'should increment score after his heels is scored if opponent is dealer', () => {
        const initialState = { score: 10 },
            state = opponent( initialState, { type: CONTROLLER_HIS_HEALS, points: 2, person: 'Opponent' } );
        expect( state.score ).to.equal( 12 );
    } );
    it( 'should not increment score after his heels is scored if player is dealer', () => {
        const initialState = { score: 10 },
            state = opponent( initialState, { type: CONTROLLER_HIS_HEALS, points: 2, person: 'Player' } );
        expect( state.score ).to.equal( 10 );
    } );
    it( 'should clone hand to pegging hand after cut card', () => {
        const hand = [
                buildCard( 'Ace', 'Hearts' ),
                buildCard( '2', 'Diamonds' ),
                buildCard( '5', 'Diamonds' ),
                buildCard( '8', 'Clubs' )
            ],
            initialState = { hand },
            state = opponent( initialState, { type: CONTROLLER_CUT_CARD } );
        expect( state.peggingHand ).to.deep.equal( hand );
    } );
    it( 'should remove card from pegging hand after opponent plays', () => {
        const peggingHand = [
            buildCard( 'Ace', 'Hearts' ),
            buildCard( '2', 'Diamonds' ),
            buildCard( '5', 'Diamonds' ),
            buildCard( '8', 'Clubs' )
        ],
            initialState = { peggingHand },
            expected = [
                buildCard( 'Ace', 'Hearts' ),
                buildCard( '2', 'Diamonds' ),
                buildCard( '5', 'Diamonds' )
            ],
            state = opponent( initialState, { type: OPPONENT_PLAYS, card: buildCard( '8', 'Clubs' ) } );
        expect( state.peggingHand ).to.deep.equal( expected );
    } );
    it( 'should update score on opponents go', () => {
        const initialState = { score: 12 },
            state = opponent( initialState, { type: OPPONENT_GO, points: 1 } );
        expect( state.score ).to.equal( 13 );
    } );
} );