var ebirdEnhancer = function() {
}
window.ebirdEnhancer = ebirdEnhancer;

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp' +
'&signed_in=true&callback=ebirdEnhancer';
document.body.appendChild(script);

(function() {
	var table = document.getElementById('sightingsTable');

	var button = document.createElement('a');
	button.innerHTML = "Show Map";
	button.addEventListener('click', function() {
	  showMap();
	}, false);

	table.parentNode.insertBefore(button, table);

	function getParameterByName(url, name) {
      var pos = url.indexOf('?');
	  var query = url.substr(pos+1);
	  var result = {};
	  query.split("&").forEach(function(part) {
		var item = part.split("=");
		result[item[0]] = decodeURIComponent(item[1]);
	  });
	  return result[name];
    }
	
	function getNeedData() {
	  var table = document.getElementById('sightingsTable');
	  var rows = table.querySelectorAll('tr.has-details');
	  var results = [];
	  for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		var obj = {};
		var cols = row.querySelectorAll('td');
		for (var j = 0; j < cols.length; j++) {
		  var col = cols[j];
		  var header = col.getAttribute('headers');
		  var data = col.innerHTML;
			if (header == 'locname') {
			  var mapAnchor = col.querySelector('a.map');
			  var href = mapAnchor.getAttribute('href');
			  var q = getParameterByName(href, 'q');
			  mapData = q.split(',');
			  obj['mapData'] = mapData;
			}
		  obj[header] = data;
		}
		results.push(obj);			
	  }
	  return results;
	}

	function renderMap(data) {
		var mapEl = document.createElement('div');
		mapEl.style.width = '100%';
		mapEl.style.height = '200px';
		button.parentNode.replaceChild(mapEl, button);
		var mapOptions = {
		  zoom: 8
		};
		var map = new google.maps.Map(mapEl, mapOptions);
		data.forEach(function(datum) {
			var marker = new google.maps.Marker({
			  position: new google.maps.LatLng(datum.mapData[0],datum.mapData[1]),
			  map: map,
			  title: datum.locname
			});
		});
	}
	
	function showMap() {
		console.log(window);
	  var data = getNeedData();
	  renderMap(data);
	  console.log(data);
	}
})();