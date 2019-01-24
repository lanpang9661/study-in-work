"use strict";
var Events = /** @class */ (function () {
    function Events() {
        this.handlers = [];
    }
    Events.prototype.on = function (handler) {
        this.handlers.push(handler);
    };
    Events.prototype.off = function (handler) {
        var idx = this.handlers.lastIndexOf(handler);
        if (idx > -1) {
            this.handlers.splice(idx, 1);
        }
    };
    Events.prototype.notify = function (data) {
        this.handlers.slice(0).forEach(function (h) { return h(data); });
    };
    return Events;
}());
var ev = new Events();
ev.on(function (click) {
    console.log(click);
});
ev.on(function (mouseover) {
    console.log(mouseover);
});
ev.on(function (show) {
    console.log(show);
});
console.log(ev);
ev.notify('click');
