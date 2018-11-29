import './css/tui-calendar.app.css!';
import Calendar from './calendar';

export default function link(scope, elem, attrs, ctrl) {
  ctrl.events.on('render', () => {
    render();
    ctrl.renderingCompleted();
  });

  function render() {
    
    const calendarContainer = elem.find('.cal-container');
    const rangeContainer = elem.find('.range-container');

    if (calendarContainer.length != 1) {
      return;
    }

    if (!ctrl.calendar) {
      ctrl.calendar = new Calendar(ctrl, calendarContainer[0],rangeContainer[0]);
      ctrl.calendar.setCalendarColor(ctrl.panel.calendarColor);
    }

    if (!ctrl.data) return;

    ctrl.calendar.clear(true);

    ctrl.calendar.createSchedules(ctrl.data);
    
    ctrl.calendar.setRangeText();

  }
}
