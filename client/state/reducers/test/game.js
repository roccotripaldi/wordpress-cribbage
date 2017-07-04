import { expect } from 'chai';

import { defaultState } from '../game';
import game from '../game';
import { buildDeck, buildCard } from '../../../lib/deck/';
import {
    CONTROLLER_BUILDS_DECK,
    CONTROLLER_RESET_GAME,
    PLAYER_INITIAL_DRAW,
    OPPONENT_INITIAL_DRAW,
    CONTROLLER_ASSIGNS_FIRST_DEALER,
    CONNTROLLER_RESET_DECK,
    CONTROLLER_DEALS_CARD_TO_PLAYER,
    CONTROLLER_DEALS_CARD_TO_OPPONENT,
    CONTROLLER_CUT_CARD,
    CONTROLLER_SCORES_OPPONENT,
    CONTROLLER_SCORES_PLAYER
} from '../../action-types';

describe( 'Game Reducer', () => {
    it( 'should return a the default state', () => {
        const state = game( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should add deck to the state', () => {
        const deck = buildDeck(),
            state = game( defaultState, { type: CONTROLLER_BUILDS_DECK, deck } );
        expect( state.deck.length ).to.equal( 52 );
    } );
    it( 'should reset to default state', () => {
        const state = game( undefined, { type: CONTROLLER_RESET_GAME } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should remove the top card from the deck after players draw', () => {
        const initialState = { deck: buildDeck() },
            state = game( initialState, { type: PLAYER_INITIAL_DRAW, card: {} } );
        expect( state.deck.length ).to.equal( 51 );
    } );
    it( 'should remove the top card from the deck after opponents draw', () => {
        const initialState = { deck: buildDeck() },
            state = game( initialState, { type: OPPONENT_INITIAL_DRAW, card: {} } );
        expect( state.deck.length ).to.equal( 51 );
    } );
    it( 'should assign the dealer', () => {
        const initialState = { dealer: null },
            state = game( initialState, { type: CONTROLLER_ASSIGNS_FIRST_DEALER, dealer: 'Player' } );
        expect( state.dealer ).to.equal( 'Player' );
    } );
    it( 'should reset deck', () => {
        const initialState = { deck: [] },
            deck = buildDeck(),
            state = game( initialState, { type: CONNTROLLER_RESET_DECK, deck } );
        expect( state.deck.length ).to.equal( 52 );
    } );
    it( 'should remove the top card from the deck after dealing to player', () => {
        const initialState = { deck: buildDeck() },
            state = game( initialState, { type: CONTROLLER_DEALS_CARD_TO_PLAYER } );
        expect( state.deck.length ).to.equal( 51 );
    } );
    it( 'should remove the top card from the deck after dealing to opponent', () => {
        const initialState = { deck: buildDeck() },
            state = game( initialState, { type: CONTROLLER_DEALS_CARD_TO_OPPONENT } );
        expect( state.deck.length ).to.equal( 51 );
    } );
    it( 'should set cut card', () => {
        const initialState = { cutCard: null },
            card = buildCard( 'Ace', 'Spades' ),
            state = game( initialState, { type: CONTROLLER_CUT_CARD, card } );
        expect( state.cutCard ).to.deep.equal( card );
    } );
    it ( 'should set players score', () => {
        const scoreObjectFromIntellegence = {},
            state = game( {}, { type: CONTROLLER_SCORES_PLAYER, score: scoreObjectFromIntellegence } );
        expect( state.playersHandScore ).to.deep.equal( scoreObjectFromIntellegence );
    } );
    it ( 'should set opponents score', () => {
        const scoreObjectFromIntellegence = {},
            state = game( {}, { type: CONTROLLER_SCORES_OPPONENT, score: scoreObjectFromIntellegence } );
        expect( state.opponentsHandScore ).to.deep.equal( scoreObjectFromIntellegence );
    } );
} );