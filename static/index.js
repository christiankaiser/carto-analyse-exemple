var map = L.map('mapdiv').setView([46.9, 8.2], 8);

$.getJSON('/cantons', function(data){
  L.geoJSON(data, {style: styleFn}).addTo(map);
});

var styleFn = function(feature){
  return {
    fillColor: '#669966',   // couleur de remplissage
    fillOpacity: 1,         // opacité du remplissage
    opacity: 1,             // opacité du contour
    weight: 0.4,            // largeur du contour
    color: '#ffffff',       // couleur de contour
  };
};
