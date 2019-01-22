import React, { Component } from 'react';
import './App.css';
import List from './List';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'locations': [
                {
                    name: 'Józsiás Park ',
                    latitude: 45.997531,
                    longitude: 26.136838,
                    type: 'park',
                },
                {
                    name: 'Gábor Áron Park ',
                    latitude: 46.001957,
                    longitude: 26.137942,
                    type: 'park',
                },
                {
                    name: 'Millenium Park ',
                    latitude: 46.001318,
                    longitude: 26.131267,
                    type: 'park',
                },
                {
                    name: 'Mézeskalács ház ',
                    latitude: 46.00551,
                    longitude: 26.130874,
                    type: 'museum',
                },
                {
                    name: 'Race Car Place ',
                    latitude: 45.989657,
                    longitude: 26.151109,
                    type: 'sport',
                },
                {
                    name: 'Sport Complex ',
                    latitude: 45.999682,
                    longitude: 26.124898,
                    type: 'sport',
                },
                {
                    name: 'Bod Péter High School ',
                    latitude: 46.002946,
                    longitude: 26.132548,
                    type: 'school',
                },
                {
                    name: 'Tennis Court ',
                    latitude: 45.996473,
                    longitude: 26.13618,
                    type: 'sport',
                },
                {
                    name: 'Nagy Mózes High School ',
                    latitude: 46.006713,
                    longitude: 26.137923,
                    type: 'school',
                },
                {
                    name: 'Catholic Church ',
                    latitude: 45.999011,
                    longitude: 26.132065,
                    type: 'church',
                },
                {
                    name: 'Reformed Church ',
                    latitude: 45.995754,
                    longitude:26.158093 ,
                    type: 'church',
                },
                {
                    name: 'City Hall ',
                    latitude: 46.002499,
                    longitude:26.137923,
                    type: 'church',
                },
                {
                    name: 'Magistrates Court ',
                    latitude: 45.999898,
                    longitude:26.131411 ,
                    type: 'administrative',
                },
            ],
            'map': '',
            'infowindow': '',
        };

        this.initMap = this.initMap.bind(this);
        this.openInfoWindow = this.openInfoWindow.bind(this);
        this.closeInfoWindow = this.closeInfoWindow.bind(this);
    }

    componentDidMount() {
        window.initMap = this.initMap;
        loadMapJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCtOZza4g5vW-qO9il7GP1ZOEH-yVM9NKQ&callback=initMap')
    }

/*Initializing the map, set up the coordinates, zoom and styles*/
    initMap() {
        let self = this;

        let mapview = document.getElementById('map');
        mapview.style.height = window.innerHeight + "px";
        let map = new window.google.maps.Map(mapview, {
            center: {lat: 46.0006, lng: 26.134578},
            zoom: 16,
            mapTypeControl: false,
            /*Styling the map. Starter code from google-developers*/
            styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#95A5A6'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#186A3B'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#21618C'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#B2BABB'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
          ]
        });

/*setting up the infowindow*/
        let InfoWindow = new window.google.maps.InfoWindow({});

        window.google.maps.event.addListener(InfoWindow, 'closeclick', function () {
            self.closeInfoWindow();
        });

        this.setState({
            map: map,
            infowindow: InfoWindow
        });

        window.google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            window.google.maps.event.trigger(map, "resize");
            self.state.map.setCenter(center);
        });

        window.google.maps.event.addListener(map, 'click', function () {
            self.closeInfoWindow();
        });
/*making the markers on the map, adding listener to them*/
        var locations = [];
        this.state.locations.forEach(function (location) {
            var longname = location.name
            var marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location.latitude, location.longitude),
                animation: window.google.maps.Animation.DROP,
                map: map,
                title: longname,
});
            marker.addListener('click', function () {
                self.openInfoWindow(marker);
            });

            location.longname = longname;
            location.marker = marker;
            location.display = true;
            locations.push(location);
        });
        this.setState({
            'locations': locations
        });
    }
/*setting up the info window*/
    openInfoWindow(marker) {
        this.closeInfoWindow();
        this.state.infowindow.open(this.state.map, marker);
        marker.setAnimation(window.google.maps.Animation.DROP);
        this.state.infowindow.setContent('Loading Data...');
        this.state.map.setCenter(marker.getPosition());
        this.state.map.panBy(0, -200);
        this.getMarkerInfo(marker);
    }
/*setting up the info which will show up on the info windows*/
    getMarkerInfo(marker) {
        var self = this;
        var clientId = "Z5QIZGQ2Q0GINUMBAU4N5GUFOZ5NY5ONR3IQVXPL4ETOPGB0";
        var clientSecret = "2NWE3K4QVRXU50ZL5KIHTRF32XS0UK44TQPRWSUQUSEJBKOH";
        var url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        self.state.infowindow.setContent("Sorry, can't load!");
                        return;
                    }

                    response.json().then(function (data) {
                        var location_data = data.response.venues[0];
                        var title = 'This is the ' + marker.title;
                        var readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Read more</a>'
                        self.state.infowindow.setContent(title + readMore);
                    });
                }
            )
            .catch(function (err) {
                self.state.infowindow.setContent("Sorry, can't load!");
            });
    }

/* Close the infowindow*/
    closeInfoWindow() {
        this.state.infowindow.close();
    }

/*Render function*/
    render() {
        return (
            <div>
                <List key="100" locations={this.state.locations} openInfoWindow={this.openInfoWindow}
                              closeInfoWindow={this.closeInfoWindow}/>
                <div id="map"></div>
            </div>
        );
    }
}
/*Loading the map async*/
function loadMapJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onerror = function () {
        document.write("Sorry, the map can't be loaded");
    };
    ref.parentNode.insertBefore(script, ref);
}

export default App;
