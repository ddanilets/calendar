/** @jsx React.DOM */

var TaskSearch = React.createClass({
	handleChange: function(e) {
		calendarActions.changeSearch(e.target.value);
	},
	render: function() {
		pullTasks();
		var search = this.props.search.toLowerCase();

		if(search.length > 0) {

			var newDaysList = this.props.days.filter(function(day) {

				var taskList = day.tasks.filter(function(task) {
					return task.taskName.toLowerCase().match(search)||task.taskHolders.toLowerCase().match(search)||day.monthNum.toString().match(search)||day.num.toString().match(search)||day.year.toString().match(search);
				});


				return taskList.length > 0;
		
			});

			newDaysList = newDaysList.map(function(day, index) {
				return (<li key={index}>{day.num} {day.monthName} {day.year} {day.tasks[index].taskName} {day.tasks[index].taskHolders}</li>)
			});

		}	

		return (
			<div className="task-search-header">
			<h2>Поиск события</h2>
				<input type="text" value={this.props.search} onChange={this.handleChange} placeholder="Название, или участники" />
					<ul>
						{newDaysList}
					</ul>
			</div>
		)
	}
})