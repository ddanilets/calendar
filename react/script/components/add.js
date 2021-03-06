/** @jsx React.DOM */

var AddTask = React.createClass({
	handleAdd: function() {
		var self=this;
		var date=self.state.date;
		var day=date.slice(0,2);
		var monthNum=date.slice(3,5)-1;
		var year=date.slice(6,10);
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
		calendarActions.addTask(data);
	},
	getInitialState: function() {
		return ({
			name: "",
			date: "",
			holders: "",
			description: ""
		})
	},
	click: function(){
	},
	setName:function(e){
		this.setState({name:e.target.value})
	},
	setDate:function(e){
		this.setState({date:e.target.value})
	},
	setHolders:function(e){
		this.setState({holders:e.target.value})
	},
	setDescription:function(e){
		this.setState({description:e.target.value})
	},
	render: function() {
		var self = this;
		
		return (
			<div className="add-task1">
				<h2>Добавить событие</h2>
				<input type="text" value={self.state.name} onChange={self.setName}  placeholder="Название" />
				<input type="text" value={self.state.date} onChange={self.setDate}  placeholder="Дата(ДД.ММ.ГГГГ)" />
				<input type="text" value={self.state.holders} onChange={self.setHolders}  placeholder="Участники" />
				<input type="text" value={self.state.description} onChange={self.setDescription}  placeholder="Описание" />
				<div className="add-button" onClick={self.handleAdd.bind(null)}>
					Добавить событие
				</div>
			</div>
		)
	}
})