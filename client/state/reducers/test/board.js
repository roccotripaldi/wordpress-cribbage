import { expect } from 'chai';

import { defaultState } from '../board';
import board from '../board';
import { CONTROLLER_RESET_GAME, CONTROLLER_HIS_HEALS } from '../../action-types';

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
} );