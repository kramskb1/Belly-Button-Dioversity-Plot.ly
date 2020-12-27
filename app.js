//Use d3 to select the panel with id of `#sample-metadata`
  // Use `.html("") to clear any existing metadata
  var metadataIDTag = d3.select("#sample-metadata");
  document.getElementById("sample-metadata").innerHTML = "";
  var ul = metadataIDTag.append('ul'); 
// Use `d3.json` to fetch the metadata for a sample
var sampleURL = `/metadata/${sample}`;
  d3.json(sampleURL).then(function(data){ 
    mykeys = d3.keys(data).map(function(x){ return x.toUpperCase() })
    myvalues = d3.values(data);
    var myobjects = mykeys.map(function(e, i) {
      return e + " : "+ myvalues[i] + "</br>";
    });
   
    ul.selectAll('li')
	    .data(myobjects)
    	.enter()
	    .append('li')
	    .html(String); 
  });