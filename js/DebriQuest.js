"use strict";

WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

var wwd = new WorldWind.WorldWindow("canvasOne");

var layers = [
    {layer: new WorldWind.BMNGLayer(), enabled: true},
    {layer: new WorldWind.BingAerialLayer(null), enabled: false}
];

for (var l = 0; l < layers.length; l++) {
    layers[l].layer.enabled = layers[l].enabled;
    layers[l].layer.hide = layers[l].hide;
    wwd.addLayer(layers[l].layer);
}

var renderableLayer = new WorldWind.RenderableLayer("Orbit");
wwd.addLayer(renderableLayer);

var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.5,
    WorldWind.OFFSET_FRACTION, 1.0);

var position = new WorldWind.Position(55.0, -106.0, 100.0);

var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);
placemark.label = "Placemark";

renderableLayer.addRenderable(placemark);

