import { expect } from 'chai';

import { defaultState } from '../board';
import board from '../board';
import {
    CONTROLLER_RESET_GAME,
    CONTROLLER_HIS_HEALS,
    PLAYER_ACCEPTS_CRIB_SCORE,
    PLAYER_ACCEPTS_OPPONENTS_SCORE,
    PLAYER_ACCEPTS_OWN_SCORE,
    OPPONENT_PLAYS
} from '../../action-types';

describe( 'Board Reducer', () => {
    it( 'should return a the default state', () => {
        const state = board( undefined, { type: 'test' } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should reset to default state', () => {
        const state = board( undefined, { type: CONTROLLER_RESET_GAME } );
        expect( state ).to.deep.equal( defaultState );
    } );
    it( 'should award 2 points for his heels to opponent', () => {
        const initialState= { Opponent: [ 22, 31 ] },
            state = board( initialState, { type: CONTROLLER_HIS_HEALS, points: 2, person: 'Opponent', pegIndex: 0 } );
        expect( state ).to.deep.equal( { Opponent: [ 33, 31 ] } );
    } );
    it( 'should award 2 points for his heels to opponent when peg 2 is lower', () => {
        const initialState= { Opponent: [ 22, 18 ] },
            state = board( initialState, { type: CONTROLLER_HIS_HEALS, points: 2, person: 'Opponent', pegIndex: 1 } );
        expect( state ).to.deep.equal( { Opponent: [ 22, 24 ] } );
    } );
    it( 'should award 2 points for his heels to player', () => {
        const initialState= { Player: [ 80, 87 ] },
            state = board( initialState, { type: CONTROLLER_HIS_HEALS, points: 2, person: 'Player', pegIndex: 0 } );
        expect( state ).to.deep.equal( { Player: [ 89, 87 ] } );
    } );
    it( 'should award 2 points for his heels to player when peg 2 is lower', () => {
        const initialState= { Player: [ 107, 106 ] },
            state = board( initialState, { type: CONTROLLER_HIS_HEALS, points: 2, person: 'Player', pegIndex: 1 } );
        expect( state ).to.deep.equal( { Player: [ 107, 109 ] } );
    } );
    it( 'should award points to player when player accepts score', () => {
        const initialState= { Player: [ 107, 106 ] },
            state = board( initialState, { type: PLAYER_ACCEPTS_OWN_SCORE, points: 8, person: 'Player', pegIndex: 1 } );
        expect( state ).to.deep.equal( { Player: [ 107, 115 ] } );
    } );
    it( 'should award points to opponent when player accepts opponents score', () => {
        const initialState= { Opponent: [ 54, 48 ] },
            state = board( initialState, { type: PLAYER_ACCEPTS_OPPONENTS_SCORE, points: 10, person: 'Opponent', pegIndex: 1 } );
        expect( state ).to.deep.equal( { Opponent: [ 54, 64 ] } );
    } );
    it( 'should award points to opponent when player accepts crib score, and opponent is dealing', () => {
        const initialState= { Opponent: [ 112, 115 ] },
            state = board( initialState, { type: PLAYER_ACCEPTS_CRIB_SCORE, points: 4, person: 'Opponent', pegIndex: 0 } );
        expect( state ).to.deep.equal( { Opponent: [ 119, 115 ] } );
    } );
    it( 'should award points to player when player accepts crib score, and player is dealing', () => {
        const initialState= { Player: [ 30, 42 ] },
            state = board( initialState, { type: PLAYER_ACCEPTS_CRIB_SCORE, points: 10, person: 'Player', pegIndex: 0 } );
        expect( state ).to.deep.equal( { Player: [ 52, 42 ] } );
    } );
    it( 'should not update state if 0 points are awarded', () => {
        const initialState= { Player: [ 30, 42 ] },
            state = board( initialState, { type: PLAYER_ACCEPTS_CRIB_SCORE, points: 0, person: 'Player', pegIndex: 0 } );
        expect( state ).to.deep.equal( { Player: [ 30, 42 ] } );
    } );
    it( 'should award points when opponent scores during play', () => {
        const initialState= { Opponent: [ 30, 42 ] },
            state = board( initialState, { type: OPPONENT_PLAYS, points: 2, person: 'Opponent', pegIndex: 0 } );
        expect( state ).to.deep.equal( { Opponent: [ 44, 42 ] } );
    } );
} );