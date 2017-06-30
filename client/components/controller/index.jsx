/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
/**
 * Internal Dependencies
 */
import { appointments } from './appointments';
import { getNextAppointment } from 'state/selectors/controller';

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
    }
)( Controller );