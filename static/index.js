var map = L.map('mapdiv').setView([46.9, 8.2], 8);

$.getJSON('/cantons', function(data){
  L.geoJSON(data, {style: styleFn}).addTo(map);
});

var styleFn = function(feature){
  var v = feature.properties.rapport_gde_petites_entreprises * 100;
  return {
    fillColor: 'rgb(120, '+ parseInt(v) +', 120)',
    fillOpacity: 1,
    opacity: 1, 
    weight: 0.4, 
    color: '#ffffff', 
  };
};
