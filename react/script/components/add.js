/** @jsx React.DOM */

var AddTask = React.createClass({
	handleAdd: function(data) {
		calendarActions.addTask(data);
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
	setName:function(e){
		setState({name:e.target.value})
	},
	setDate:function(e){
		setState({date:e.target.value})
	},
	setHolders:function(e){
		setState({holders:e.target.value})
	},
	setDescription:function(e){
		setState({description:e.target.value})
	},
	render: function() {
		var self = this;
		
		return (
			<div className="add-task">
				<h2>Add task</h2>
				<input type="text" value={self.state.name} onChange={self.setName(e)}  placeholder="Search here" />
				<input type="text" value={self.state.date} onChange={self.setDate(e)}  placeholder="Search here" />
				<input type="text" value={self.state.holders} onChange={self.setHolders(e)}  placeholder="Search here" />
				<input type="text" value={self.state.description} onChange={self.setDescription(e)}  placeholder="Search here" />
				<div className="add-button" onClick={self.click()}>
					
				</div>
			</div>
		)
	}
})