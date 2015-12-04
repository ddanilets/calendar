/** @jsx React.DOM */
var AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function(action) {
	this.dispatch({
		source: 'VIEW_ACTION',
		action: action
	});
};
