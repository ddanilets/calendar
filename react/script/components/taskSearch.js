/** @jsx React.DOM */

var TaskSearch = React.createClass({
	handleChange: function(e) {
		calendarActions.changeSearch(e.target.value);
	},
	render: function() {
		var search = this.props.search.toLowerCase();

		if(search.length > 0) {

			var newDaysList = this.props.days.filter(function(day) {

				var taskList = day.tasks.filter(function(task) {
					return task.taskName.toLowerCase().match(search);
				});


				return taskList.length > 0;
		
			});

			newDaysList = newDaysList.map(function(day, index) {
				return (<li key={index}>{day.num} {day.monthName} {day.year} {day.tasks[index].taskName}</li>)
			});

		}	

		return (
			<div className="task-search-header">
				<h2>Search for Tasks & Occasions</h2>
				<input type="text" value={this.props.search} onChange={this.handleChange} placeholder="Search here" />
				<h2 className="results">Matching Dates:</h2>
					<ul>
						{newDaysList}
					</ul>
			</div>
		)
	}
})