/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
/**
 * Internal Dependencies
 */
import { appointments } from './appointments';
import { getNextAppointment } from 'state/selectors/controller';
import { controllerBuildsDeck } from 'state/actions/controller';
import { buildDeck } from 'lib/deck';

let appointmentTimer;

class Controller extends Component {
    componentDidMount() {
        console.log( 'Setting timer on mount' );
        appointmentTimer = setInterval( this.checkAppointments, 2000, this.props );
    }
    componentWillReceiveProps() {
        console.log( 'Resetting timer on props receive' );
        clearInterval( appointmentTimer );
        appointmentTimer = setInterval( this.checkAppointments, 2000, this.props );
    }

    checkAppointments( props ) {
        console.log( 'checking next appointment' );

        switch ( props.nextAppointment ) {
            case 'buildDeck':
                const deck = shuffle( buildDeck() );
                props.controllerBuildsDeck( deck );
                break;
        }
    }

    renderMessage() {
        const message = appointments[ this.props.nextAppointment ].message;
        return <p>{ message }</p>;
    }

    render() {
        return (
            <div className="controller">
                { this.renderMessage() }
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            nextAppointment: getNextAppointment( state )
        }
    },
    {
        controllerBuildsDeck
    }
)( Controller );