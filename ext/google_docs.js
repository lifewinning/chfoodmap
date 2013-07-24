// converts google spreadsheet data to map data

function mmg_google_docs_spreadsheet(id, sheet, callback) {
    if (typeof reqwest === 'undefined'){
        throw 'CSV: reqwest required for mmg_csv_url';
    }

    var url = 'https://spreadsheets.google.com/feeds/list/' + id +
        '/' + sheet + '/public/values?alt=json-in-script&callback=callback';
    reqwest({
        url: url,
        type: 'jsonp',
        jsonpCallback: 'callback',
        success: response,
        error: response
    }); 
   
    function response(x) {
        var features = [],
            latfield = '',
            lonfield = '';
        if (!x || !x.feed) return features;
        for (var f in x.feed.entry[0]) {
            if (f.match(/\$Lat/i)){
                latfield = f;           
            }
            if (f.match(/\$Lon/i)){
                lonfield = f;              
            }
        }

        for (var i = 0; i < x.feed.entry.length; i++) {                             
            var entry = x.feed.entry[i];
            var feature = {
                geometry: {
                    type: 'Point',
                    coordinates: []
                },
                // identify what's in the spreadsheet to convert to JSON properties
                properties: {
                    'marker-color':'#fff',
                    'marker-size':'medium',
                
                    'title': entry['gsx$address'],
                    'type': entry['gsx$type'],
                    'tenants':entry['gsx$tenants']
                         
                }
            };

            for (var y in entry) {
                if (y === latfield) feature.geometry.coordinates[1] = parseFloat(entry[y].$t);
                else if (y === lonfield) feature.geometry.coordinates[0] = parseFloat(entry[y].$t);
                else if (y.indexOf('gsx$') === 0) {                            
                    feature.properties[y.replace('gsx$', '')] = entry[y].$t;
                }
            }
            
            if (feature.geometry.coordinates.length == 2) features.push(feature);

           _.each(feature, function(value, key) {
                if(feature.properties['type']=="CSA"){feature.properties['marker-color']='#1BC6E0'} 
                if(feature.properties['type']=="schoolgarden"){feature.properties['marker-color']='#96DB1F'}
                if(feature.properties['type']=="communitygarden"){feature.properties['marker-color']='#4D8A45'}
                if(feature.properties['type']=="farmersmarket"){feature.properties['marker-color']='#8B3FBA'}
                if(feature.properties['type']=="foodsec"){feature.properties['marker-color']='#E09B1B'}
               
            });
        }
        return callback(features);
    }
}

