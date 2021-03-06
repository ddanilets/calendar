/** @jsx React.DOM */
var Days = React.createClass({
	handleSelectDay: function(index, day) {
		calendarActions.selectDay(index, day);
	},
	render: function() {
		pullTasks();
		var self = this;
		var days = this.props.days.map(function(day, index) {
			var classes="day";
			var tasks = day.tasks;

			if(self.props.moment.todayYear == day.year && self.props.moment.todayMonth == day.monthNum && self.props.moment.today == day.num) {
				classes += ' today';
			}

			if (self.props.selectedDay.year == day.year && self.props.selectedDay.monthName == day.monthName && self.props.selectedDay.num == day.num) {
				classes += ' selected';
			}
			if ((index) % 7 == 0) {
				classes += ' last';
			}

			return (<div key={index} className={classes} onClick={self.handleSelectDay.bind(null, index, day)}>
						<span className="num">{day.num}</span>
						<div className="info">
							<Tasks tasks={day.tasks}/>
						</div>
					</div>
				)

		
		});
		return(
			<div>
				{days}
			</div>
		)
	}
});
