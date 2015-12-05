/** @jsx React.DOM */
var x=new calendarStore();
var Cal = React.createClass({
	getInitialState: function() {
		return ({
			moment: x.getMoment(),
			selectedDay: x.getSelected(),
			search: x.getSearch(),
			tasks: x.getTasks()
		})
	},
	componentDidMount: function() {
		this.setState({
			selectedDay: x.getSelected()
		});
		x.addChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState({
			moment: x.getMoment(),
			selectedDay: x.getSelected(),
			search: x.getSearch(),
			tasks: x.getTasks()
		});
	},
	render: function() {
		return (
			<div>
				<Month moment={this.state.moment} selectedDay={this.state.selectedDay} search={this.state.search} tasks={this.state.tasks} />
			</div>
		)
	}
});
