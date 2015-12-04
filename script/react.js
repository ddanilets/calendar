/** @jsx React.DOM */

// Давайте создадим компонент мгновенного поиска

var Search = React.createClass({

    getInitialState: function(){
        return { searchString: '' };
    },

    handleChange: function(e){

        // Если вы закомментируете данную строку, поле ввода не изменит свое значение.
        // Это потому, что в React'е, поле не может измениться независимо от свойства
        // которое было ему присвоено. В нашем случае, это this.state.searchString.

        this.setState({searchString:e.target.value});
    },

    render: function() {

        var libraries = this.props.items,
            searchString = this.state.searchString.trim().toLowerCase();


        if(searchString.length > 0){

            // Ищем. Фильтрируем резальтаты.

            libraries = libraries.filter(function(l){
                return l.name.toLowerCase().match( searchString );
            });

        }

        return 		<div id="search">
					
					<img id="search-img" src="search.png"/>
                    <input id="search-field" type="text" placeholder="Событие, дата или участник" value={this.state.searchString} onChange={this.handleChange}  />

                    <ul> 

                        { libraries.map(function(l){
                            return <li>{l.name} <a href={l.url}>{l.url}</a></li>
                        }) }

                    </ul>

                </div>;

    }
});

                                                                                                                                                             
var libraries = [

    { name: 'Backbone.js', url: 'http://documentcloud.github.io/backbone/'},
    { name: 'AngularJS', url: 'https://angularjs.org/'},
    { name: 'jQuery', url: 'http://jquery.com/'},
    { name: 'Prototype', url: 'http://www.prototypejs.org/'},
    { name: 'React', url: 'http://facebook.github.io/react/'},
    { name: 'Ember', url: 'http://emberjs.com/'},
    { name: 'Knockout.js', url: 'http://knockoutjs.com/'},
    { name: 'Dojo', url: 'http://dojotoolkit.org/'},
    { name: 'Mootools', url: 'http://mootools.net/'},
    { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/'},
    { name: 'Lodash', url: 'http://lodash.com/'},
    { name: 'Moment', url: 'http://momentjs.com/'},
    { name: 'Express', url: 'http://expressjs.com/'},
    { name: 'Koa', url: 'http://koajs.com/'},

];

// Отображаем компонент SearchExample на странице

var NavButton = React.createClass({
render:
	function(){
		return  <div className="button">
				<button name="add">Добавить
				</button> 
				<button name="refresh">Обновить</button>
			</div>
	}
});
React.renderComponent(
    <NavButton items={ libraries } />,
    document.getElementById("buttons")
);
React.renderComponent(
    <Search items={ libraries } />,
    document.getElementById("searchDiv")
);
