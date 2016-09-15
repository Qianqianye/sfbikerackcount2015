
var heatmapLayer ;
var globalDataArray = [];

function setup(){
	loadJSON("data.json",gotData);
}

function gotData (data){
  var newArray = [];
  for (var i = 0; i < data.data.length; i+=1) {
    println('----- index ' + i + ' -----');

    var nowItem = data.data[i]
    var yearN = nowItem[8];
    var monthN = nowItem[9];
    var racknumberN = nowItem[15];
    var locationN = nowItem[18];
    var latN = locationN[1];
    var lonN = locationN[2];

    println(latN);
    println(lonN);
    if(latN != null && lonN != null){
      newArray.push({'lat':latN, 'lng':lonN, 'count':racknumberN, 'month': monthN, 'year': yearN });
    }
  }

  view();
  globalDataArray = newArray;
}

function setData(arrayIn){
  var testData = {
    max: 20,
    data: arrayIn
  };
  heatmapLayer.setData(testData);
}

function view(){

 
// option 1 Black and white
// var baseLayer = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}',{
//     subdomains: 'abcd',
//     maxZoom: 18,
//     ext: 'png',
//   });

// option 2 Darkmatter
var baseLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
    subdomains: 'abcd',
    maxZoom: 18,
  });

  var cfg = {
            // radius should be small ONLY if scaleRadius is true (or small radius is intended)
            "radius": .0018,
            "maxOpacity": .75, 
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


          heatmapLayer = new HeatmapOverlay(cfg);

          var map = new L.Map('map', {
            center: new L.LatLng(37.7735759476, -122.429860009),
            zoom: 13,
            fullscreenControl: true,
            timeDimension: true,
            timeDimensionOptions: {
            timeInterval: "1997-09/2015-12",
            period: "P1M",
           },
           timeDimensionControl: true,
           timeDimensionControlOptions: {
           autoPlay: true,
           loopButton: true,
           timeSteps: 1,
           playReverseButton: true,
           limitSliders: true,
           playerOptions: {
           buffer: 0,
           transitionTime: 250,
           loop: true,
            }
          },
          layers: [baseLayer, heatmapLayer]
        });

          map.timeDimension.on('timeload', newTimeLoad);
          layer = heatmapLayer;
        }

        function newTimeLoad(e){
          timeNow = e.time;
          var d = new Date(timeNow);
          var Dyear;
          var Dmonth;
          Dyear = d.getFullYear();
          Dmonth = d.getMonth();

       var newTimeArray = []; // start off with a blank array

       for (var i = 0; i < globalDataArray.length; i++) {
         var dataMonth = globalDataArray[i].month;
         var dataYear = globalDataArray[i].year;

         if(dataYear <= Dyear){
           if(dataYear == Dyear && dataMonth <= Dmonth){
             newTimeArray.push({'lat':globalDataArray[i].lat, 'lng':globalDataArray[i].lng, 'count':globalDataArray[i].count });
           }
           else if(dataYear < Dyear){
             newTimeArray.push({'lat':globalDataArray[i].lat, 'lng':globalDataArray[i].lng, 'count':globalDataArray[i].count });
           }
         }
       };

       setData(newTimeArray);
     }