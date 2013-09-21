  document.addEventListener('DOMContentLoaded', function() {
  	var gData;
  	var URL = "0AkuokbMVYNRxdHFTc2k1OG9EZkZ6SlVaeEhRUlZLYlE"
		Tabletop.init( { key: URL, callback: showInfo, simpleSheet: true } ) 
	}) 
  	
  function showInfo(data) {

  	//map

		gData = data;
		// making data into a geoJSON
		var featureElements = ['title', 'address', 'contact', 'info'];
  		var geoJSON = Sheetsee.createGeoJSON(gData, featureElements);
  
  		
  		//declaring the map
  		var map = Sheetsee.loadMap("map")
  		;
  		Sheetsee.addTileLayer(map, "lifewinning.map-7nibzgui");

  		var markerLayer = Sheetsee.addMarkerLayer(geoJSON, map, 14);

  		//popups
  		addPopups(map, markerLayer);
		function addPopups(map, markerLayer) {
 		markerLayer.on('click', function(e) {
    		var feature = e.layer.feature
 	 		var popupContent = '<h2>' + feature.opts.title + '</h2>' +
	                    '<h3>' + feature.opts.address + '</h3><p id="infos">' +
	                    feature.opts.contact + '</p><p id="infos">'+ feature.opts.info;
		e.layer.bindPopup(popupContent,{closeButton: false,})
	 	})
	 	 document.getElementById('mapsidebar').onclick = function(n) {
    	var pos = n.target.getAttribute('data-position');
    	if (pos) {
        var loc = pos.split(',');
        map.setView(loc, 18);
    	}
    }
	}
//generate lists for sidebar

	//foodsec
	  var foodSecIs =  Sheetsee.getKeyword(gData, "foodsec");
	  var foodSecList = ich.foodsec({rows:foodSecIs});
	    $('#foodsec').html(foodSecList); 
	
	//community gardens
		var CGIs = Sheetsee.getKeyword(gData, "communitygarden");
		var CGList = ich.communitygarden({rows: CGIs});
		$('#communitygarden').html(CGList);

	//CSA
		var CSAIs = Sheetsee.getKeyword(gData, "#csa");
		var CSAList = ich.csa({rows: CSAIs});
		$('#csa').html(CSAList);

	//farmer's markers
		var marketIs = Sheetsee.getKeyword(gData, "farmersmarket");
		var marketList = ich.farmersmarket({rows: marketIs});
		$('#farmersmarket').html(marketList);


}
