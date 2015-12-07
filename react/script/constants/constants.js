/** @jsx React.DOM */
var appConstants = {
	CHANGE_SEARCH: "CHANGE_SEARCH",
	UPDATE_MONTH: "UPDATE_MONTH",
	SELECT_DAY: "SELECT_DAY",
	ADD_TASK: "ADD_TASK",
	DELETE_TASK: "DELETE_TASK"
};
var _months=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
var _monthsRelative={};
_monthsRelative[_months[0]]="Января";
_monthsRelative[_months[1]]="Февраля";
_monthsRelative[_months[2]]="Марта";
_monthsRelative[_months[3]]="Апреля";
_monthsRelative[_months[4]]="Мая";
_monthsRelative[_months[5]]="Июня";
_monthsRelative[_months[6]]="Июля";
_monthsRelative[_months[7]]="Августа";
_monthsRelative[_months[8]]="Сентября";
_monthsRelative[_months[9]]="Октября";
_monthsRelative[_months[10]]="Ноября";
_monthsRelative[_months[11]]="Декабря";