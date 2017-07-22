import ScoringRules from './scoring-rules';

const isSumThirtyOne = ( cards ) => {
    return ( cards.reduce( ( sum, card ) => { return sum + card.value }, 0 ) === 31 );
};

const cardDoesNotMatchFirstCardInSequence = ( card, index, sequence ) => {
    return card.name !== sequence[0].name;
};

export const getPegScore = ( card, sequence ) => {
    let score = 0,
        runs = 0,
        pairs,
        reason = '',
        newSequence;

    if ( sequence.length === 0 ) {
        return { score, reason };
    }

    newSequence = [ card ].concat( sequence );

    if ( ScoringRules.isSumFifteen( newSequence ) ) {
        score = 2;
        reason = '2 points for 15. ';
    }

    if ( isSumThirtyOne( newSequence ) ) {
        score = 2;
        reason = '2 points for 31. ';
    }

    pairs = newSequence.findIndex( cardDoesNotMatchFirstCardInSequence );
    pairs = ( pairs === -1 ) ? newSequence.length - 1 : pairs - 1;
    pairs = ( pairs * pairs ) + pairs;
    score += pairs;
    reason += ( pairs === 0 ) ? '' : pairs.toString() + ' points for pairs.';

    for ( let i = newSequence.length; i > 2; i-- ) {
        const slice = newSequence.slice( 0, i );
        if ( ScoringRules.isSequential( slice ) ) {
            runs = i;
            break;
        }
    }

    score += runs;
    reason += ( runs === 0 ) ? '' : runs.toString() + ' card run.';

    return {
        score,
        reason
    };
};