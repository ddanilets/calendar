/** @jsx React.DOM */
var calendarActions = {
	changeSearch: function(search) {
		AppDispatcher.dispatch({
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
				occasions: day.occasions
			}
		});
	},
	updateMonth: function(update) {
		AppDispatcher.handleAction({
			actionType: appConstants.UPDATE_MONTH,
			data: update
		});
	}
};
