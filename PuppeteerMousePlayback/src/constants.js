'use strict';

const defaultCanvasId = 'mouse-cursor-canvas';
const defaultCursorColor = 'rgba(255, 0, 0, 0.5)';
const MOUSE_ACTIVITY_TYPES = Object.freeze({
    MOVE: 'move',
    MOUSEDOWN: 'mousedown',
    MOUSEUP: 'mouseup'
});

module.exports = {
    defaultCanvasId,
    defaultCursorColor,
    MOUSE_ACTIVITY_TYPES
};