/** @jsx React.DOM */

var AddTask = React.createClass({
	handleAdd: function(e) {
		calendarActions.addTask(e.target.value);
	},
	getInitialState: function() {
		return ({
			name: "",
			date: this.props.selectedDay.num+'.'+this.props.selectedDay.monthNum+'.'+this.props.selectedDay.year.slice(2,4),
			holders: "",
			description: ""
		})
	},
	click: function(){
		var self=this;
		var date=self.state.date;
		var day=date.slice(0,2);
		var monthNum=date.slice(3,5);
		var year=20+date.slice(6,8);
		var data={
			year: year,
			monthNum: monthNum,
			monthName: _months[monthNum],
			num: day,
			task:{
				taskName: self.state.name,
				taskHolders: self.state.holders,
				taskDescription: self.state.description
			}
		}
		self.handleAdd.bind(null,data);
	},
	render: function() {
		var self = this;
		
		return (
			<div className="add-task">
				<h2>Add task</h2>
				<input type="text" value={self.state.name}  placeholder="Search here" />
				<input type="text" value={self.state.date}  placeholder="Search here" />
				<input type="text" value={self.state.holders}  placeholder="Search here" />
				<input type="text" value={self.state.description}  placeholder="Search here" />
				<div className="add-button" onClick={self.click()}>
					
				</div>
			</div>
		)
	}
})