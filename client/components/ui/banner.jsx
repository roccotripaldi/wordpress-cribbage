/**
 * External Dependencies
 */
import React, { Component } from 'react';
import classNames from 'classnames';

class Banner extends Component {
    render() {
        const icon = ( this.props.icon ) ? <img src={ this.props.icon } /> : null,
            iconClasses = classNames( { 'with-icon': this.props.icon } );
        return (
            <div className="banner">
                { icon } <span className={ iconClasses }>{ this.props.label }</span>
            </div>
        );
    }
}

export default Banner;