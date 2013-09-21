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
    markerLayer.factory(function (m) {
        // Create a marker using the simplestyle factory
        var elem = mapbox.markers.simplestyle_factory(m);
        // Add function that centers marker on click
        MM.addEvent(elem, 'click', function (e) {
            map.ease.location({
                lat: m.geometry.coordinates[1],
                lon: m.geometry.coordinates[0]
            }).zoom(map.zoom()).optimal();
        });
        return elem;
    });

    interaction = mapbox.markers.interaction(markerLayer);
    map.addLayer(markerLayer);
    map.ui.zoomer.add();
    map.ui.zoombox.add();

    interaction.formatter(function (feature) {
        var o = '<h1>' + feature.properties.title + '</h1><p>' + feature.properties.address + '</p><br><p id="infos">' + feature.properties.contact + '</p><p id="infos">' + feature.properties.info + '</p>';
        return o;
    });

 }

