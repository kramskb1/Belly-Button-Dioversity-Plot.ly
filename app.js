//Use d3 to select the panel with id of `#sample-metadata`
  // Use `.html("") to clear any existing metadata
//   var metadataIDTag = d3.select("#sample-metadata");
//   document.getElementById("sample-metadata").innerHTML = "";
//   var ul = metadataIDTag.append('ul'); 
// Use `d3.json` to fetch the metadata for a sample
// var sampleURL = `/metadata/${sample}`;
function dropdown () {


  d3.json("samples.json").then(function(data){
      var names = data.names;
      console.log(names) 
   var dropdown =d3.select ("#selDataset");
   names.forEach ((sample)=>{
       dropdown.append("option")
       .text(sample)
       .property("value",sample);
   });
   var sample = names[0];
   metadata(sample);
   });
  
}
dropdown();
function metadata (dataid) {
    d3.json("samples.json").then(function(data){
        var metadata = data.metadata;
        var dataarray = metadata.filter(sample=>sample.id==dataid);
        var result = dataarray[0];
        console.log(result);
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key,value])=>{
            panel.append("h6").text(`${key}${value}`);
        }
        );
        var trace = {
            values: values,
            labels: labels,
            type: "pie",
            text: hovers,
            hoverinfo: "label+text+value+percent",
            textinfo: "percent"
        };
        var data = [trace]
        var layout = {
            margin: {
                l: 10,
                r: 10,
                b: 10,
                t: 10,
                pad: 4
            }
        }   
  
        Plotly.newPlot("pieChart", data, layout)
    });
  };
});
