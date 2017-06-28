export const loadState = () => {
    try {
        const serializedState = localStorage.getItem( 'cribbageState' );
        if ( serializedState === null ) {
            return undefined;
        }
        return JSON.parse( serializedState );
    } catch( err ) {
        console.log( err );
        return undefined;
    }
};

export const saveState = ( state ) => {
    try {
        const serializedState = JSON.stringify( state );
        localStorage.setItem( 'cribbageState', serializedState );
    } catch( err ) {
        // ignore write errors
        console.log( err );
    }
};