/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

/**
 * Internal Dependencies
 */
import { getLog } from 'state/selectors/debug-log';

class Menu extends Component {
    render() {
        if ( isEmpty( this.props.log ) ) {
            return null;
        }
        return (
            <div className="menu">
                <a className="menu__debug">View Debug</a>
                <a className="menu__reset">Reset Game</a>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            log: getLog( state )
        }
    }
)( Menu );