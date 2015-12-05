/** @jsx React.DOM */
var Cal = React.createClass({
	var x= new calendarStore();
	getInitialState: function() {
		return ({
			moment: x.getMoment(),
			selectedDay: calendarStore.getSelected(),
			search: calendarStore.getSearch()
		})
	},
	componentDidMount: function() {
		this.setState({
			selectedDay: calendarStore.getSelected()
		});
		calendarStore.addChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState({
			moment: calendarStore.getMoment(),
			selectedDay: calendarStore.getSelected(),
			search: calendarStore.getSearch()
		});
	},
	render: function() {
		return (
			<div>
				<Month moment={this.state.moment} selectedDay={this.state.selectedDay} search={this.state.search} />
			</div>
		)
	}
});
