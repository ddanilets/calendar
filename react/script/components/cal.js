/** @jsx React.DOM */
var Cal = React.createClass({
	getInitialState: function() {
		return ({
			moment: calendarStore.getMoment(),
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

module.exports = Cal;