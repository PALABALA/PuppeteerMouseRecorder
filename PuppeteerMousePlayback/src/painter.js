'use strict';

const { defaultCanvasId, defaultCursorColor } = require('./constants');

async function drawDot(page, x, y, clearCanvas=true, canvasId=defaultCanvasId, color=defaultCursorColor) {
    await page.evaluate(({ x, y, canvasId, clearCanvas, color }) => {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext("2d");
        if (clearCanvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);   // Clear canvas. This is faster than canvas.width = canvas.width
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
    }, { x, y, canvasId, clearCanvas, color });
}

async function createOverlayCanvas(page, width, height, id=defaultCanvasId) {
    await page.evaluate(({ id, width, height }) => {
        const canvas = document.createElement('canvas');
        canvas.id = id;
        canvas.width = width;
        canvas.height = height;
        canvas.setAttribute('style', 'z-index: 999; position: absolute; top: 0; left: 0; margin: 0; background: transparent;');
        document.body.appendChild(canvas);
    }, { id, width, height });
}

async function removeOverlayCanvas(page, id=defaultCanvasId) {
    await page.evaluate(({ id }) => {
        const canvas = document.getElementById(id);
        canvas.parentNode.removeChild(canvas);
    }, { id });
}

module.exports = {
    drawDot,
    createOverlayCanvas,
    removeOverlayCanvas
};
