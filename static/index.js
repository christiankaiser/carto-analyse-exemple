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
});

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
