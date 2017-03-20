var map = L.map('mapdiv').setView([46.9, 8.2], 8);

var brew;   // variable globale pour l'objet Classybrew

$.getJSON('/cantons', function(data){
  // Extraction des valeurs en vue de la mise en classes
  var valeurs = [];
  for (var i in data.features){
    var feat = data.features[i];
    valeurs.push(feat.properties.rapport_gde_petites_entreprises);
  }

  // Nous pouvons maintenant faire la mise en classes
  brew = new classyBrew();
  brew.setSeries(valeurs);
  brew.setNumClasses(5);
  brew.setColorCode("Reds");
  brew.classify('jenks');

  L.geoJSON(data, {style: styleFn}).addTo(map);

  addLegend(map, brew)
});


var addLegend = function(map, brew){
  var breaks = brew.getBreaks(),
      colors = brew.getColors();

  var n = colors.length;

  var legend = L.control({position: 'topright'});

  legend.onAdd = function(map){
      var div = L.DomUtil.create('div', 'legend');
      var svg = '<svg width="130" height="' + (colors.length*20+35) + '">';
      for (var i=0; i < n; i++){
        svg += '<rect x="1" y="'+ (10+i*20) +'" width="35" height="19" fill="'+colors[n-i-1]+'" stroke="#fff" stroke-width="1" />';
      }
      svg += '<rect x="1" y="10" width="35" height="'+(n*20-1)+'" fill="none" stroke="#000" stroke-width="0.4" />';
      for (var i=0; i<n; i++){
        svg += '<line x1="36" y1="'+(10+i*20)+'" x2="42" y2="'+(10+i*20)+'" stroke="#000" stroke-width="0.4" />';
        svg += '<text font-family="Verdana" font-size="10" x="45" y="'+ (14+i*20) +'">'+ Math.round(breaks[n-i]*1000)/10 +'</text>';
      }
      svg += '<line x1="36" y1="'+(9+n*20)+'" x2="42" y2="'+(9+n*20)+'" stroke="#000" stroke-width="0.4" />';
      svg += '<text font-family="Verdana" font-size="10" x="45" y="'+ (13+n*20) +'">'+ Math.round(breaks[n-i]*1000)/10 +'</text>';
      svg +=    '</svg>';
      div.innerHTML = '<p>Nombre de grandes entreprises par 100 petites entreprises</p>' + svg;
      return div;
  };

  legend.addTo(map);
};


var styleFn = function(feature){
  var v = feature.properties.rapport_gde_petites_entreprises;
  return {
    fillColor: (brew && brew.getColorInRange(v)) || '#ffffff',
    fillOpacity: 1,
    opacity: 1, 
    weight: 0.4, 
    color: '#ffffff', 
  };
};
