/** @jsx React.DOM */
var Tasks = React.createClass({
	render: function() {
		if (this.props.tasks!=undefined){
			if (this.props.tasks.length > 0) {
				var classes = "task";
				var tasks=this.props.tasks.map(function(task){
					return (<h3 className={classes}>{task.taskName}</h3>);
				});
	
			}
			else {
				var tasks = [];
			}
		}
		else{
			var tasks=[];
		}
	
		return (
			<div>
				{tasks}
			</div>
		)
	}
})
