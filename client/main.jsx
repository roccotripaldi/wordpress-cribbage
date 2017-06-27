import React from 'react';
import Example from 'components/example';

export default function( props ) {
    return(
        <div>
            <p className="hello-world">Hello World!</p>
            { <Example /> }
        </div>
    );
}