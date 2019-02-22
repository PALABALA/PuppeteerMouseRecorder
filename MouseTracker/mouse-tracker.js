'use strict';

const MOUSE_ACTIVITY_TYPES = Object.freeze({
    MOVE: 'move',
    MOUSEDOWN: 'mousedown',
    MOUSEUP: 'mouseup'
});

const mouseActivityies = [];
let lastMouseActivityTime = Date.now();

function onMouseActivity(event, type) {
    const x = event.clientX;
    const y = event.clientY;
    const currentTime = Date.now();
    const timeLapsed = currentTime - lastMouseActivityTime;
    console.log(`type: ${type} x: ${x} y: ${y} time lapsed: ${timeLapsed}`);
    mouseActivityies.push({
        type: type,
        x: x,
        y: y,
        time: timeLapsed
    });
    lastMouseActivityTime = currentTime;
}

function onMouseMove(event) {
    const x = event.clientX;
    const y = event.clientY;
    const currentTime = Date.now();
    const timeLapsed = currentTime - lastMouseActivityTime;
    console.log(`type: ${type} x: ${x} y: ${y} time lapsed: ${timeLapsed}`);
    mouseActivityies.push({
        type: MOUSE_ACTIVITY_TYPES.MOVE,
        x: x,
        y: y,
        time: timeLapsed
    });
    lastMouseActivityTime = currentTime;
}

function save(event) {
    // 's' key
    if (event.keyCode !== 83) {
        return;
    }
    console.log('saving');
    const blob = new Blob([JSON.stringify(mouseActivityies)], {type: "application/json"});
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', blobUrl);
    a.setAttribute('download', 'testfile.json');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.addEventListener('mousemove', event => onMouseActivity(event, MOUSE_ACTIVITY_TYPES.MOVE));
document.addEventListener('mousedown', event => onMouseActivity(event, MOUSE_ACTIVITY_TYPES.MOUSEDOWN));
document.addEventListener('mouseup', event => onMouseActivity(event, MOUSE_ACTIVITY_TYPES.MOUSEUP));
document.addEventListener('keydown', save);