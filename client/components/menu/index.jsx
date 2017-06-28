import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <a className="menu__debug">View Debug</a>
            </div>
        );
    }
}

export default connect()( Menu );