
function setup(){
	loadJSON("data.json",gotData);

}

function gotData (data){


var newArray = [];

for (var i = 0; i < data.data.length; i+=1) {
// for (var i = 0; i < 100; i+=1) {	

	println('----- index ' + i + ' -----');
		
	var nowItem = data.data[i]

	var yearN = nowItem[8];
	var monthN = nowItem[9];
	var racknumberN = nowItem[15];
	var locationN = nowItem[18];
	var latN = locationN[1];
	var lonN = locationN[2];

	// println(nowItem)

	// println(yearN);
	// println(monthN);
	// println(racknumberN);
    println(latN);
     println(lonN);


if(latN != null && lonN != null){
		newArray.push({'lat':latN, 'lng':lonN, 'count':racknumberN});
}

};

var testData = {
          max: 20,
          data: newArray
      };

   var baseLayer = L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
          }
        );

        var cfg = {
          // radius should be small ONLY if scaleRadius is true (or small radius is intended)
          "radius": .002,
          "maxOpacity": .8, 
          // scales the radius based on map zoom
          "scaleRadius": true, 
          // if set to false the heatmap uses the global maximum for colorization
          // if activated: uses the data maximum within the current map boundaries 
          //   (there will always be a red spot with useLocalExtremas true)
          "useLocalExtrema": true,
          // which field name in your data represents the latitude - default "lat"
          latField: 'lat',
          // which field name in your data represents the longitude - default "lng"
          lngField: 'lng',
          // which field name in your data represents the data value - default "value"
          valueField: 'count'
        };


        var heatmapLayer = new HeatmapOverlay(cfg);

        var map = new L.Map('map', {
          center: new L.LatLng(37.7735759476, -122.429860009),
          zoom: 13,
          layers: [baseLayer, heatmapLayer]
        });

        heatmapLayer.setData(testData);

        // make accessible for debugging
        layer = heatmapLayer;

}


function draw(){
}	


