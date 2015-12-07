/** @jsx React.DOM */
var TaskList = React.createClass({
	 componentWillMount: function() {
		 calendarActions.selectDay(null, this.props.days[this.props.moment.today+1])
	 },
	render: function() {
		return (
				<div className="task-list-header">
					<h2>Список событий на {this.props.selectedDay.num} {_monthsRelative[parseInt(this.props.selectedDay.month)+1]} </h2>
					<div className="tasks">
						<h2>События</h2>
						<Tasks tasks={this.props.selectedDay.tasks} />
					</div>
				</div>
			
		)

	}
})
