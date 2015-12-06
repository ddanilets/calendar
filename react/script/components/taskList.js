/** @jsx React.DOM */
var TaskList = React.createClass({
	 componentWillMount: function() {
		 calendarActions.selectDay(null, this.props.days[this.props.moment.today+this.props.moment.moment.getDay()-1])
	 },
	render: function() {
		return (
				<div className="task-list-header">
					<h2>List for {this.props.selectedDay.monthName} {this.props.selectedDay.num}</h2>
					<div className="tasks">
						<h2>Tasks</h2>
						<Tasks tasks={this.props.selectedDay.tasks} />
					</div>
				</div>
			
		)

	}
})
