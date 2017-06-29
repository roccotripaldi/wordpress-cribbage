/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';
/**
 * Internal Dependencies
 */
import appointments from './appointments';

let appointmentTimer;

class Controller extends Component {
    componentDidMount() {
        console.log( 'Setting timer on mount' );
        appointmentTimer = setInterval( this.checkAppointments, 2000 );
    }
    componentWillReceiveProps() {
        console.log( 'Resetting timer on props receive' );
        clearInterval( appointmentTimer );
        appointmentTimer = setInterval( this.checkAppointments, 2000 );
    }

    checkAppointments() {
        console.log( 'checking appointments' );
    }

    render() {
        return (
            <div className="controller">
                <p>Lowest card deals first.<br />Draw a card to start the game!</p>
            </div>
        );
    }
}

export default Controller;