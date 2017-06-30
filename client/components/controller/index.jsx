/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
/**
 * Internal Dependencies
 */
import { getStatusMessage } from './status-messages';
import { getNextAppointment, isPaused } from 'state/selectors/controller';
import { controllerBuildsDeck } from 'state/actions/controller';
import { buildDeck } from 'lib/deck';

let appointmentTimer;

class Controller extends Component {
    componentDidMount() {
        if ( ! this.props.paused ) {
            console.log( 'Setting timer on mount' );
            appointmentTimer = setInterval( this.checkAppointments, 2000 );
        } else {
            clearInterval( appointmentTimer );
            console.log( 'timer is paused on mount' );
        }
    }
    componentWillReceiveProps( nextProps ) {
        clearInterval( appointmentTimer );
        if ( ! nextProps.paused ) {
            console.log( 'resetting timer on received props' );
            appointmentTimer = setInterval( this.checkAppointments, 2000 );
        } else {
            console.log( 'timer is paused on received props' );
        }
    }

    checkAppointments = () => {
        console.log( 'checking next appointment', this.props.nextAppointment );

        switch ( this.props.nextAppointment ) {
            case 'buildDeck':
                const deck = shuffle( buildDeck() );
                this.props.controllerBuildsDeck( deck );
                break;
        }
    };

    render() {
        return (
            <div className="controller">
                <p>{ this.props.statusMessage }</p>
            </div>
        );
    }
}

export default connect(
    state => {
        const nextAppointment = getNextAppointment( state ),
            paused = isPaused( state );
        return {
            nextAppointment,
            paused,
            statusMessage: getStatusMessage( state, nextAppointment, paused )
        }
    },
    {
        controllerBuildsDeck
    }
)( Controller );