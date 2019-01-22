import React, {Component} from 'react';
import BestLocations from './BestLocations';

class List extends Component {
     constructor(props) {
         super(props);
         this.state = {
             'location': '',
             'query': '',
             'suggestions': true,
         };

         this.filterLocations = this.filterLocations.bind(this);
         this.toggleSuggestions = this.toggleSuggestions.bind(this);
     }

/*setting up the opportunity of filter and searching*/
     filterLocations(event) {
         this.props.closeInfoWindow();
         const {value} = event.target;
         var locations = [];
         this.props.locations.forEach(function (location) {
             if (location.longname.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                 location.marker.setVisible(true);
                 locations.push(location);
             } else {
                 location.marker.setVisible(false);
             }
         });

         this.setState({
             'locations': locations,
             'query': value
         });
     }

     componentWillMount() {
         this.setState({
             'locations': this.props.locations
         });
     }

/*Show and hide*/
     toggleSuggestions() {
         this.setState({
             'suggestions': !this.state.suggestions
         });
     }

/*Render function of the list*/
     render() {
         var locationlist = this.state.locations.map(function (listItem, index) {
             return (
                 <BestLocations key={index} openInfoWindow={this.props.openInfoWindow.bind(this)} data={listItem}/>
             );
         }, this);

         return (
           <div id="bar">
             <div className="search">
                 <input role="search" aria-labelledby="filter" id="search-field" className="search-field" type="text" placeholder="Search"
                        value={this.state.query} onChange={this.filterLocations}/>
                 <ul>
                     {this.state.suggestions && locationlist}
                 </ul>
                 <button className="button" onClick={this.toggleSuggestions}>Show/Hide</button>
             </div>
            </div>
         );
     }
 }

 export default List;
