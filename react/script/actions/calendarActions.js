/** @jsx React.DOM */
var calendarActions = {
	changeSearch: function(search) {
		AppDispatcher.handleAction({
			actionType: appConstants.CHANGE_SEARCH,
			data: search
		});
	},
	selectDay: function(index, day) {
		AppDispatcher.handleAction({
			actionType: appConstants.SELECT_DAY,
			data: {
				year: day.year,
				monthName: day.monthName,
				num: day.num,
				tasks: day.tasks,
			}
		});
	},
	updateMonth: function(update) {
		AppDispatcher.handleAction({
			actionType: appConstants.UPDATE_MONTH,
			data: update
		});
	},
	addTask: function(data){
		AppDispatcher.handleAction({
			actionType:appConstants.ADD_TASK,
			data: data
		});
	},
	deleteTask: function(data){
		AppDispatcher.handleAction({
			actionType:appConstants.DELETE_TASK,
			data:data
		})
	}
};
