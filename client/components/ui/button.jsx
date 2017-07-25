/**
 * External Dependencies
 */
import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

/**
 * Internal Dependencies
 */
import { isPaused } from 'state/selectors/controller';


class Button extends Component {
    render() {
        const classes = classNames( {
            button: true,
            clickable: ! this.props.paused,
            deactivated: this.props.paused
        } );
        return (
            <a onClick={ this.props.onClick } className={ classes } id={ this.props.id }>
                <span className="button__inner">
                    { this.props.children }
                </span>
            </a>
        );
    }
}

export default connect(
    ( state ) => {
        return {
            paused: isPaused( state )
        }
    }
)(Button);