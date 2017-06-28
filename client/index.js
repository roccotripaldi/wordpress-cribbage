/**
 * External Dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { throttle } from 'lodash';
/**
 * Internal Dependencies
 */
import cribbageState from 'state/reducers';
import { loadState, saveState } from 'state/utils';

const persistedState = loadState();
const store = createStore( cribbageState, persistedState );

store.subscribe( throttle( () => {
    saveState( store.getState() );
} ), 1000 );

import Main from './main';

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('app')
);