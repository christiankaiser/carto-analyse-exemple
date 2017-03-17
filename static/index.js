var map = L.map('mapdiv').setView([46.9, 8.2], 8);

$.getJSON('/cantons', function(data){
  L.geoJSON(data).addTo(map);
});
