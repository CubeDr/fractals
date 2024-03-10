import mouseDragInteraction from './modules/interactions/mouseDragInteraction.js';
import mouseZoomInteraction from './modules/interactions/mouseZoomInteraction.js';

const canvas = document.getElementById('myCanvas');

mouseDragInteraction.register(canvas);
mouseZoomInteraction.register(canvas);
