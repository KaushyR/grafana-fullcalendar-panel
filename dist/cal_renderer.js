"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = link;

require("./css/tui-calendar.app.css!");

var _calendar = _interopRequireDefault(require("./calendar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function link(scope, elem, attrs, ctrl) {
  ctrl.events.on('render', function () {
    render();
    ctrl.renderingCompleted();
  });

  function render() {
    var calendarContainer = elem.find('.cal-container');
    var rangeContainer = elem.find('.range-container');

    if (calendarContainer.length != 1) {
      return;
    }

    if (!ctrl.calendar) {
      ctrl.calendar = new _calendar.default(ctrl, calendarContainer[0], rangeContainer[0]);
      ctrl.calendar.setCalendarColor(ctrl.panel.calendarColor);
    }

    if (!ctrl.data) return;
    ctrl.calendar.clear(true);
    ctrl.calendar.createSchedules(ctrl.data);
    ctrl.calendar.setRangeText();
  }
}
//# sourceMappingURL=cal_renderer.js.map
