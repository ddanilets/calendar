/** @jsx React.DOM */

var AddTask = React.createClass({
	handleAdd: function(e) {
		calendarActions.addTask(e.target.value);
	},
	render: function() {
		return (
			<div className="add-task">
				<h2>Add task</h2>
				<input type="text" value={}  placeholder="Search here" />
				<input type="text" value={}  placeholder="Search here" />
				<input type="text" value={}  placeholder="Search here" />
				<input type="text" value={}  placeholder="Search here" />
				<div className="add-button" onClick={self.handleAdd.bind(null,data)}>
					
				</div>
			</div>
		)
	}
})