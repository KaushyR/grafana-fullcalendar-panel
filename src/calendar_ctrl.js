/*eslint id-length: ["error", { "min": 1 }]*/
import { MetricsPanelCtrl } from 'app/plugins/sdk';
import kbn from 'app/core/utils/kbn';
import calRenderer from './cal_renderer';
import DataFormatter from './data_formatter';
import './css/calendar.css!';

const packageId = 'kaushyr-tui-calendar-panel';

const panelDefaults = {
  calendarId: '1',
  calendarColor: {
    color: '#333333',
    bgColor: '#1396FF',
    borderColor: '#999999'
  },
  columnMappings: {
    idField: 'id',
    titleField: 'title',
    startField: 'start',
    endField: 'end',
    allDayField: 'all_day',
    dataField: 'url',
    categoryField: 'category'
  }
}

export default class CalendarCtrl extends MetricsPanelCtrl {
  calendar;
  
  constructor($scope, $injector, contextSrv) {
    super($scope, $injector);

    _.defaults(this.panel,panelDefaults);
    this.dataFormatter = new DataFormatter(this, kbn);

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('panel-teardown', this.onPanelTeardown.bind(this));
    this.events.on('data-snapshot-load', this.onDataSnapshotLoad.bind(this));

    $scope.$watch(
      'ctrl.panel.content',
      _.throttle(() => {
        this.render();
      }, 1000)
    );
  }

  onDataError(error){
    console.log('Data error %o', error);
  }

  onPanelTeardown() {
    if(this.calendar){
      this.calendar.destroy();
    }
  }

  onInitEditMode() {
    this.addEditorTab('Calendar', 'public/plugins/'+packageId+'/partials/editor.html', 2);
  }

  onDataReceived(dataList) {
    console.log('OnDataReceived %o',dataList);
    if (!dataList || !dataList.length || dataList.length==0) return;

    const data = [];

    if (dataList[0].type === 'table') {
      const tableData = dataList.map(DataFormatter.tableHandler.bind(this));
      this.dataFormatter.setTableValues(tableData, data);
    }

    this.data = data;

    this.render();
   
  }

  onDataSnapshotLoad(snapshotData) {
    this.onDataReceived(snapshotData);
  }

  setCalendarColors(){
    if(!this.calendar){
      return;
    }
    this.calendar.setCalendarColor(this.panel.calendarColor);
    this.refresh();
  }

  /* eslint class-methods-use-this: 0 */
  link(scope, elem, attrs, ctrl) {
    calRenderer(scope, elem, attrs, ctrl);
  }

}

CalendarCtrl.templateUrl = 'module.html'
