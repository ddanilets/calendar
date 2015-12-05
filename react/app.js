/** @jsx React.DOM */

var App = React.createClass({
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<Cal />
				</div>
			</div>
		)
	}
});

React.render(<App />, document.getElementById('app'));