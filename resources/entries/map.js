import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Vector from 'ol/source/Vector';
import {fromLonLat} from 'ol/proj';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import 'bootstrap/js/dist/modal';

var App = Backbone.View.extend({
  // attributes
  el: '#workspace',
  // tables
  teacherCarrerTable: null,
  teacherId: null,
  map: null,
  elModal: 'modal',
  // constructor
	initialize: function(){
    // TODO ???
  },
  // events
	events: {
    'click #loadMap': 'loadMap',
  },
  loadMap: function(event){    
    // get data from template
    var latitude = parseFloat($('#latitude').val());
    var longitude = parseFloat($('#longitude').val());
    // modal tempalte
    var resource = `
      <div class="modal-dialog modal-lg" role="document" id="modal-workspace">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"><%= title %></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="col-md-12">
              <div id="map" style="width:100%;height:400px;"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
                <i class="fa fa-times" style="margin-right:5px"></i>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    `;
    var template = _.template(resource);
    var templateCompiled = template({
      title: 'Mapita',
    });
    $('#' + this.elModal).html(templateCompiled);
    $('#' + this.elModal).modal();
    // load modal
    var _this = this;
    $('#' + this.elModal).on('shown.bs.modal', function(){
      _this.showOLMap(latitude, longitude);
    });
    $('#' + this.elModal).on('hidden.bs.modal', function () {
      _this.cloaseOLMap();
    });
    // load map
  },
  showOLMap: function(latitude, longitude){
    // map
    var features = [];
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([longitude, latitude]),
        zoom: 15
      })
    });
    // icon
    var iconStyle = new Style({
      image: new Icon(({
          anchor: [0.5, 1],
          src: BASE_URL + 'img/marker.png',
      }))
    });
    var iconFeature = new Feature({
      geometry: new Point(fromLonLat([longitude, latitude]))
    });
    iconFeature.setStyle(iconStyle);
    features.push(iconFeature);
    // marker
    var layer = new VectorLayer({
      source: new Vector({
        features: features,
      })
    });
    this.map.addLayer(layer);
  },
  cloaseOLMap: function(){
    this.map = null;
    $('#' + this.elModal).off();
  },
});

$(document).ready(function(){
  new App();
});
