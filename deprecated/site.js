// declare your spreadsheet ID and basemap

var data_id = '0AkuokbMVYNRxdHFTc2k1OG9EZkZ6SlVaeEhRUlZLYlE',
    sheet = 'od6',
    map_id = 'lifewinning.map-7nibzgui',
    markerLayer,
    features,
    features_summary,
    interaction,
    layer = mapbox.layer().id(map_id),
    map = mapbox.map('map', layer, null, [easey_handlers.DragHandler()]);
// center and zoom your map
mmg_google_docs_spreadsheet(data_id, sheet, mapData);
map.centerzoom({
lat: 40.66835, 
        lon: -73.94475
,
        }, 14);
map.setZoomRange(12, 18);
map.ui.attribution.add().content('<a href="http://mapbox.com/about/maps">Terms &amp; Feedback</a>');


// Build map
function mapData(f) {
    features = f;
    markerLayer = mapbox.markers.layer().features(features);


//center markers layer
    markerLayer.factory(function (n) {
        // Create a marker using the simplestyle factory
        var elem = mapbox.markers.simplestyle_factory(n);
        // Add function that centers marker on click
        MM.addEvent(elem, 'click', function(e) {
            
            //centering against markerwindow 

            var markerCenterX = $('.marker-popup').height()/2;
            var markerCenterY = $('.marker-popup').width()/2;
            var markerpopupHeight= $('.marker-popup').height();

            console.log($('.marker-popup').height());

            var markerWindowLatLon = map.pointLocation({x: e.clientX-markerCenterX, y: e.clientY-markerCenterY});
            
             map.ease.location({
               lat: markerWindowLatLon.lat,
               lon: markerWindowLatLon.lon
             }).zoom(map.zoom()).optimal();
              
            
        
        });
        return elem;


    });

    interaction = mapbox.markers.interaction(markerLayer);
    map.addLayer(markerLayer);
    map.ui.zoomer.add();
    map.ui.zoombox.add();

    interaction.formatter(function (feature) {
        var o = '<h1>' + feature.properties.title + '</h1><p>' + feature.properties.address + '</p>';
        return o;
    });

 }

