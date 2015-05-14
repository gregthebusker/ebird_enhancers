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

	function showMap() {
	  var data = getNeedData();
	  console.log(data);
	}
})();