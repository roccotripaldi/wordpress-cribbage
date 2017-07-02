import { expect } from 'chai';

import { defaultState } from '../controller';
import controller from '../controller';
import {
    CONTROLLER_BUILDS_DECK,
    CONTROLLER_RESET_GAME,
    CONTROLLER_TOGGLE_TIMER,
    PLAYER_INITIAL_DRAW,
    OPPONENT_INITIAL_DRAW,
    CONTROLLER_ASSIGNS_FIRST_DEALER,
    CONNTROLLER_RESET_DECK,
    CONTROLLER_DEALS_CARD_TO_PLAYER,
    CONTROLLER_DEALS_CARD_TO_OPPONENT,
    CONTROLLER_DEAL_COMPLETE,
    PLAYER_DISCARDS,
    OPPONENT_DISCARDS
} from '../../action-types';

describe( 'Controller Reducer', () => {
    it( 'should return a the default state', () => {
        const state = controller( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should await for players initial draw after building deck', () => {
        const state = controller( defaultState, { type: CONTROLLER_BUILDS_DECK, deck: [] } );
        expect( state.nextAppointment ).to.equal( 'awaitDraw' );
    } );
    it( 'should reset to default state', () => {
        const state = controller( undefined, { type: CONTROLLER_RESET_GAME } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should toggle isPaused to true if not paused', () => {
        const state = controller( undefined, { type: CONTROLLER_TOGGLE_TIMER } );
        expect( state.isPaused ).to.be.true;
    } );
    it( 'should toggle isPaused to false if paused', () => {
        const initialState = {
            nextAppointment: defaultState.nextAppointment,
            isPaused: true
        };
        const state = controller( initialState, { type: CONTROLLER_TOGGLE_TIMER } );
        expect( state.isPaused ).to.be.false;
        expect( state.nextAppointment ).to.equal( defaultState.nextAppointment );
    } );
    it( 'should await for opponent to draw after player draws', () => {
        const initialState = { nextAppointment: 'awaitDraw', isPaused: false },
            state = controller( initialState, { type: PLAYER_INITIAL_DRAW, card: {} } );
        expect( state.nextAppointment ).to.equal( 'opponentDraw' );
        expect( state.isPaused ).to.be.false;
    } );
    it( 'should assign first dealer after opponent draws', () => {
        const initialState = { nextAppointment: 'opponentDraw' },
            state = controller( initialState, { type: OPPONENT_INITIAL_DRAW, card: {} } );
        expect( state.nextAppointment ).to.equal( 'assignFirstDealer' );
    } );
    it( 'should reset deck after dealer is assigned', () => {
        const initialState = { nextAppointment: 'assignFirstDealer' },
            state = controller( initialState, { type: CONTROLLER_ASSIGNS_FIRST_DEALER, dealer: 'Player' } );
        expect( state.nextAppointment ).to.equal( 'resetDeck' );
    } );
    it( 'should deal card to opponent if dealer is player', () => {
        const initialState = { nextAppointment: 'resetDeck' },
            state = controller( initialState, { type: CONNTROLLER_RESET_DECK, dealer: 'Player' } );
        expect( state.nextAppointment ).to.equal( 'dealCardToOpponent' );
    } );
    it( 'should deal card to player if dealer is opponent', () => {
        const initialState = { nextAppointment: 'resetDeck' },
            state = controller( initialState, { type: CONNTROLLER_RESET_DECK, dealer: 'Opponent' } );
        expect( state.nextAppointment ).to.equal( 'dealCardToPlayer' );
    } );
    it( 'should speed up timer after resetting deck', () => {
        const initialState = { nextAppointment: 'resetDeck' },
            state = controller( initialState, { type: CONNTROLLER_RESET_DECK, dealer: 'Opponent' } );
        expect( state.timerSpeed ).to.equal( 500 );
    } );
    it( 'should deal card to player after dealing card to opponent', () => {
        const initialState = { nextAppointment: 'dealCardToOpponent' },
            state = controller( initialState, { type: CONTROLLER_DEALS_CARD_TO_OPPONENT } );
        expect( state.nextAppointment ).to.equal( 'dealCardToPlayer' );
    } );
    it( 'should deal card to opponent after dealing card to player', () => {
        const initialState = { nextAppointment: 'dealCardToPlayer' },
            state = controller( initialState, { type: CONTROLLER_DEALS_CARD_TO_PLAYER } );
        expect( state.nextAppointment ).to.equal( 'dealCardToOpponent' );
    } );
    it( 'should await players discard when deal is complete', () => {
        const initialState = { nextAppointment: 'dealCardToPlayer' },
            state = controller( initialState, { type: CONTROLLER_DEAL_COMPLETE } );
        expect( state.nextAppointment ).to.equal( 'playerDiscards' );
    } );
    it( 'should slow down timer after deal is complete', () => {
        const initialState = { nextAppointment: 'resetDeck' },
            state = controller( initialState, { type: CONTROLLER_DEAL_COMPLETE } );
        expect( state.timerSpeed ).to.equal( defaultState.timerSpeed );
    } );
    it( 'should await opponent discard after player discards', () => {
        const initialState = { nextAppointment: 'playerDiscards' },
            state = controller( initialState, { type: PLAYER_DISCARDS } );
        expect( state.nextAppointment ).to.equal( 'opponentDiscards' );
    } );
    it( 'should await opponent cut after opponent discards and player is dealer', () => {
        const initialState = { nextAppointment: 'opponentDiscards' },
            state = controller( initialState, { type: OPPONENT_DISCARDS, dealer: 'Player' } );
        expect( state.nextAppointment ).to.equal( 'opponentCuts' );
    } );
    it( 'should await player cut after opponent discards and opponent is dealer', () => {
        const initialState = { nextAppointment: 'opponentDiscards' },
            state = controller( initialState, { type: OPPONENT_DISCARDS, dealer: 'Opponent' } );
        expect( state.nextAppointment ).to.equal( 'playerCuts' );
    } );
} );