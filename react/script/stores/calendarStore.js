/** @jsx React.DOM */

var CHANGE_EVENT = 'change';

var _months=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
var _store = {
	moment: {
		todayYear: new Date().getFullYear(),
		todayMonth: new Date().getMonth(),
		today: new Date().getDate(),
		moment: new Date(),
		num: new Date().getMonth() + 1,
		name: _months[new Date().getMonth()],
		year: new Date().getFullYear()
	},
	selectedDay: {
		year: null,
		month: null,
		num: null,
		tasks: [],
		occasions: []
	},
	search: ''
};

var changeSearch = function(data) {
	_store.search = data;
};

var selectDay = function(data) {
	_store.selectedDay = {
		year: data.year,
		monthName: data.monthName,
		num: data.num,
		tasks: data.tasks,
		occasions: data.occasions
	}

};

var updateMonth = function(update) {

	var newMonth = _store.moment.num + update;

	if(newMonth == 0) {
		_store.moment.year -= 1;
		_store.moment.num = 12;
		_store.moment.moment = new Date(_store.moment.year,_store.moment.num - 1);
		_store.moment.name = months[_store.moment.num - 1];

	}
	else if(newMonth == 13) {
		_store.moment.year += 1;
		_store.moment.num = 1;
		_store.moment.moment = new Date(_store.moment.year,_store.moment.num - 1);
		_store.moment.name = months[_store.moment.num - 1];
	}
	else {
		_store.moment.num += update;
		_store.moment.moment = new Date(_store.moment.year,_store.moment.num - 1);
		_store.moment.name = months[newMonth];
	}

};
var calendarStore = function(){ 
	addChangeListener= function(cb) {
		this.on(CHANGE_EVENT, cb);
	},
	removeChangeListener= function(cb) {
		this.removeListener(CHANGE_EVENT, cb);
	},
	getMoment= function() {
		return _store.moment;
	},
	getSearch= function() {
		return _store.search;
	},
	getSelected= function() {
		return _store.selectedDay;
	}
};
MicroEvent.mixin(calendarStore); 
AppDispatcher.register(function(payload){
	var action = payload.action;
	switch(action.actionType){
		case appConstants.CHANGE_SEARCH:
			changeSearch(action.data);
			calendarStore.trigger(CHANGE_EVENT);
			break;
		case appConstants.UPDATE_MONTH:
			updateMonth(action.data);
			calendarStore.trigger(CHANGE_EVENT);
			break;
		case appConstants.SELECT_DAY:
			selectDay(action.data);
			calendarStore.trigger(CHANGE_EVENT);
			break;
		default:
			return true;
	}
});
