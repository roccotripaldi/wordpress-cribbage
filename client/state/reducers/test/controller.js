import { expect } from 'chai';

import { defaultState } from '../controller';
import controller from '../controller';
import {
    CONTROLLER_BUILDS_DECK,
    CONTROLLER_RESET_GAME,
    CONTROLLER_TOGGLE_TIMER
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
} );