/** @jsx React.DOM */

var CHANGE_EVENT = 'change';
function pullTasks(){
	if (localStorage.getItem('Tasks')){
	var serEvents=localStorage["Tasks"];
	_tasks = JSON.parse(serEvents);
	return 1;
	}
	else {
		return 0;
	}
};
function pushTasks(){
	if (_tasks[0].year=="")
	{
		_tasks.splice(0,1);
	}
	var serEvents = JSON.stringify(_tasks);
	localStorage["Tasks"]=serEvents;
};
var _tasks=[{
	year: "",
	monthNum: "",
	monthName: "",
	num: "",
	tasks: [{
				taskName: "",
				taskHolders: "",
				taskDescription: ""
			}]
}];
pullTasks();
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
		year: "",
		month: "",
		num: "",
		tasks: []
	},
	search: '',
	data: {
		year:"",
		monthNum:"",
		monthName:"",
		num:"",
		task: {
				taskName: "",
				taskHolders: "",
				taskDescription: ""
			}
	}
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
	}

};

var updateMonth = function(update) {

	var newMonth = _store.moment.num + update;

	if(newMonth == 0) {
		_store.moment.year -= 1;
		_store.moment.num = 12;
		_store.moment.moment = new Date(_store.moment.year,_store.moment.num - 1);
		_store.moment.name = _months[_store.moment.num-1];

	}
	else if(newMonth == 13) {
		_store.moment.year += 1;
		_store.moment.num = 1;
		_store.moment.moment = new Date(_store.moment.year,_store.moment.num - 1);
		_store.moment.name = _months[_store.moment.num - 1];
	}
	else {
		_store.moment.num = newMonth;
		_store.moment.moment = new Date(_store.moment.year,_store.moment.num - 1);
		_store.moment.name = _months[_store.moment.num-1];
	}

};
var addTask= function(data){
	var flag=true;
	_tasks.forEach(function(item,key,_tasks){
		if(data.num==item.num&&data.monthNum==item.monthNum&&data.year==item.year){
			item.tasks[item.tasks.length]=data.task;
			flag=false;
		};
	});
	if (flag){
		_tasks[_tasks.lenght]=[{year:"",monthName:"",monthNum:"",num:"",tasks:[{}]}];
		_tasks[_tasks.length].year=data.year;
		_tasks[_tasks.length].monthName=data.monthName;
		_tasks[_tasks.length].monthNum=data.monthNum;
		_tasks[_tasks.length].num=data.num;
		_tasks[_tasks.length].tasks[0]=data.task;
	};
	pushTasks();
};
var calendarStore = function(){ 
	pullTasks();
	var self=this;
	this.addChangeListener= function(cb) {
		this.bind(CHANGE_EVENT, cb);
	},
	this.removeChangeListener= function(cb) {
		self.unbind(CHANGE_EVENT, cb);
	},
	this.getMoment= function() {
		return _store.moment;
	},
	this.getSearch= function() {
		return _store.search;
	},
	this.getSelected= function() {
		return _store.selectedDay;
	},
	this.getTasks=function(){
		return _tasks;
	}
	this.getData=function(){
		return _store.data;
	}
};
var microEvent = new MicroEvent();
var x=new calendarStore();
microEvent.mixin(calendarStore); 
AppDispatcher.register(function(payload){
	var action = payload.action;
	switch(action.actionType){
		case appConstants.CHANGE_SEARCH:
			changeSearch(action.data);
			x.trigger(CHANGE_EVENT);
			break;
		case appConstants.UPDATE_MONTH:
			updateMonth(action.data);
			x.trigger(CHANGE_EVENT);
			break;
		case appConstants.SELECT_DAY:
			selectDay(action.data);
			x.trigger(CHANGE_EVENT);
			break;
		case appConstants.ADD_TASK:
			addTask(action.data);
			x.trigger(CHANGE_EVENT);
			break
		default:
			return true;
	}
});
