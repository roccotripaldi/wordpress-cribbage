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
    OPPONENT_DISCARDS,
    CONTROLLER_CUT_CARD,
    CONTROLLER_HIS_HEALS,
    CONTROLLER_SCORES_OPPONENT,
    CONTROLLER_SCORES_PLAYER,
    CONTROLLER_SCORES_CRIB,
    PLAYER_ACCEPTS_OPPONENTS_SCORE,
    PLAYER_ACCEPTS_OWN_SCORE,
    PLAYER_ACCEPTS_CRIB_SCORE,
    CONTROLLER_GAME_COMPLETE,
    OPPONENT_PLAYS,
    PLAYER_PLAYS
} from '../../action-types';
import { buildCard } from '../../../lib/deck';

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
    it( 'should award his heels if a jack is cut', () => {
        const initialState = { nextAppointment: 'playerCuts' },
            card = buildCard( 'Jack', 'Hearts' ),
            state = controller( initialState, { type: CONTROLLER_CUT_CARD, dealer: 'Opponent', card } );
        expect( state.nextAppointment ).to.equal( 'awardHisHeels' );
    } );
    it( 'should await play from player if opponent is dealer and a jack is not drawn', () => {
        const initialState = { nextAppointment: 'playerCuts' },
            card = buildCard( '10', 'Hearts' ),
            state = controller( initialState, { type: CONTROLLER_CUT_CARD, dealer: 'Opponent', card } );
        expect( state.nextAppointment ).to.equal( 'playerPlays' );
    } );
    it( 'should await play from opponent if player is dealer and a jack is not drawn', () => {
        const initialState = { nextAppointment: 'playerCuts' },
            card = buildCard( '10', 'Hearts' ),
            state = controller( initialState, { type: CONTROLLER_CUT_CARD, dealer: 'Player', card } );
        expect( state.nextAppointment ).to.equal( 'opponentPlays' );
    } );
    it( 'should await play from opponent score after his heels if player is person', () => {
        const initialState = { nextAppointment: 'awardHisHeels' },
            state = controller( initialState, { type: CONTROLLER_HIS_HEALS, person: 'Player' } );
        expect( state.nextAppointment ).to.equal( 'opponentPlays' );
    } );
    it( 'should await play from player after his heels if opponent is person', () => {
        const initialState = { nextAppointment: 'awardHisHeels' },
            state = controller( initialState, { type: CONTROLLER_HIS_HEALS, person: 'Opponent' } );
        expect( state.nextAppointment ).to.equal( 'playerPlays' );
    } );
    it( 'should await play from player after opponent plays', () => {
        const initialState = { nextAppointment: 'opponentPlays' },
            state = controller( initialState, { type: OPPONENT_PLAYS } );
        expect( state.nextAppointment ).to.equal( 'playerPlays' );
    } );
    it( 'should restore game timer after player plays', () => {
        const initialState = { nextAppointment: 'playerPlays' },
            state = controller( initialState, { type: OPPONENT_PLAYS } );
        expect( state.timerSpeed ).to.equal( 2000 );
    } );
    it( 'should await play from opponent after player plays', () => {
        const initialState = { nextAppointment: 'playerPlays' },
            state = controller( initialState, { type: PLAYER_PLAYS } );
        expect( state.nextAppointment ).to.equal( 'opponentPlays' );
    } );
    it( 'should slow down game timer after player plays', () => {
        const initialState = { nextAppointment: 'playerPlays' },
            state = controller( initialState, { type: PLAYER_PLAYS } );
        expect( state.timerSpeed ).to.equal( 5000 );
    } );
    it( 'should await acceptance after scoring player', () => {
        const initialState = { nextAppointment: 'playerScores' },
            state = controller( initialState, { type: CONTROLLER_SCORES_PLAYER } );
        expect( state.nextAppointment ).to.equal( 'playerAcceptsOwnScore' );
    } );
    it( 'should await acceptance after scoring player', () => {
        const initialState = { nextAppointment: 'playerScores' },
            state = controller( initialState, { type: CONTROLLER_SCORES_OPPONENT } );
        expect( state.nextAppointment ).to.equal( 'playerAcceptsOpponentsScore' );
    } );
    it( 'should score crib after player accepts their own score, if player is dealer', () => {
        const initialState = { nextAppointment: 'playerAcceptsOwnScore' },
            state = controller( initialState, { type: PLAYER_ACCEPTS_OWN_SCORE, dealer: 'Player' } );
        expect( state.nextAppointment ).to.equal( 'cribScores' );
    } );
    it( 'should score opponent after player accepts their own score, if opponent is dealer', () => {
        const initialState = { nextAppointment: 'playerAcceptsOwnScore' },
            state = controller( initialState, { type: PLAYER_ACCEPTS_OWN_SCORE, dealer: 'Opponent' } );
        expect( state.nextAppointment ).to.equal( 'opponentScores' );
    } );
    it( 'should score crib after player accepts opponent score, if opponent is dealer', () => {
        const initialState = { nextAppointment: 'playerAcceptsOwnScore' },
            state = controller( initialState, { type: PLAYER_ACCEPTS_OPPONENTS_SCORE, dealer: 'Opponent' } );
        expect( state.nextAppointment ).to.equal( 'cribScores' );
    } );
    it( 'should score player after player accepts opponent score, if player is dealer', () => {
        const initialState = { nextAppointment: 'playerAcceptsOwnScore' },
            state = controller( initialState, { type: PLAYER_ACCEPTS_OPPONENTS_SCORE, dealer: 'Player' } );
        expect( state.nextAppointment ).to.equal( 'playerScores' );
    } );
    it( 'should wait for player to accept crib score after scoring crib', () => {
        const initialState = { nextAppointment: 'cribScores' },
            state = controller( initialState, { type: CONTROLLER_SCORES_CRIB } );
        expect( state.nextAppointment ).to.equal( 'playerAcceptsCribScore' );
    } );
    it( 'should complete the hand after crib score is accepted', () => {
        const initialState = { nextAppointment: 'playerAcceptsCribScore' },
            state = controller( initialState, { type: PLAYER_ACCEPTS_CRIB_SCORE } );
        expect( state.nextAppointment ).to.equal( 'handComplete' );
    } );
    it( 'should complete the game', () => {
        const initialState = { nextAppointment: 'cribScores' },
            state = controller( initialState, { type: CONTROLLER_GAME_COMPLETE } );
        expect( state.nextAppointment ).to.equal( 'gameComplete' );
    } );
} );