'use strict';

/**
 * mouse-player module
 * @module mouse-player
 */

const { sleep } = require('./utils');
const { drawDot, createOverlayCanvas, removeOverlayCanvas } = require('./painter');
const { defaultCanvasId, defaultCursorColor, MOUSE_ACTIVITY_TYPES } = require('./constants');

/**
 * Play a mouse activity.
 * @param {Object} page - Puppeteer browser page.
 * @param {Object} activity - Mouse activity: { type: mouse activity type (string), x: mouse coordinate x (number), y: mouse coordinate y (number), time: time since last mouse activity (number) }. Mouse activity types: 'move', 'mousedown', 'mouseup'.
 * @param {number} width - The width of the overlay canvas, this should be the same as the width of the page.
 * @param {number} height - The height of the overlay canvas, this should be the same as the height of the page.
 * @param {string} overlayCanvasId - The id of the overlay canvas for drawing the cursor, defaults to 'mouse-cursor-canvas'.
 * @param {string} cursorColor - The color of the overlay cursor, defaults to 'rgba(255, 0, 0, 0.5)'.
 */
async function playMouseActivity(page, activity, width, height, overlayCanvasId=defaultCanvasId, cursorColor=defaultCursorColor) {
    const x = activity.x;
    const y = activity.y;

    // for mouse down and mouse up, we first move the mouse to the correct coordinates.
    await page.mouse.move(x, y);
    // draw the cursor
    await drawDot(page, x, y, true, overlayCanvasId, cursorColor);

    switch (activity.type) {
        case MOUSE_ACTIVITY_TYPES.MOVE:
            break;
        case MOUSE_ACTIVITY_TYPES.MOUSEDOWN:
            // remove overlay canvas so the elements under the canvas with mouse down event handlers gets triggered correctly
            await removeOverlayCanvas(page, overlayCanvasId);
            await page.mouse.down();
            await createOverlayCanvas(page, width, height, overlayCanvasId);
            break;
        case MOUSE_ACTIVITY_TYPES.MOUSEUP:
            // remove overlay canvas so the elements under the canvas with mouse down event handlers gets triggered correctly
            await removeOverlayCanvas(page, overlayCanvasId);
            await page.mouse.up();
            await createOverlayCanvas(page, width, height, overlayCanvasId);
            break;
        default:
            break;
    }
}

/**
 * Play an array mouse activities in sequence.
 * @param {Object} page - Puppeteer browser page.
 * @param {Array} mouseActivities - An array of mouse activities. See playMouseActivity for details.
 * @param {number} width - The width of the overlay canvas, this should be the same as the width of the page.
 * @param {number} height - The height of the overlay canvas, this should be the same as the height of the page.
 * @param {string} overlayCanvasId - The id of the overlay canvas for drawing the cursor, defaults to 'mouse-cursor-canvas'.
 * @param {string} cursorColor - The color of the overlay cursor, defaults to 'rgba(255, 0, 0, 0.5)'.
 */
async function playAllMouseActivities(page, mouseActivities, width, height, overlayCanvasId=defaultCanvasId, cursorColor=defaultCursorColor) {
    await createOverlayCanvas(page, width, height);

    for (let i = 0; i < mouseActivities.length; ++i) {
        const activity = mouseActivities[i];
        const waitTime = activity.time;
        console.log(activity);
        await sleep(waitTime);
        await playMouseActivity(page, activity, width, height, overlayCanvasId, cursorColor);
    }

    await removeOverlayCanvas(page, overlayCanvasId);
}

module.exports = {
    playAllMouseActivities
};