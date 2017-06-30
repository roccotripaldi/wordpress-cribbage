/**
 * Internal Dependencies
 */
import { CONTROLLER_BUILDS_DECK } from '../action-types';

export const controllerBuildsDeck = deck => {
    return {
        type: CONTROLLER_BUILDS_DECK,
        deck
    }
}