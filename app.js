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
   createchart(sample);
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
        // var trace = {
        //     values: values,
        //     labels: labels,
        //     type: "pie",
        //     text: hovers,
        //     hoverinfo: "label+text+value+percent",
        //     textinfo: "percent"
        // };
        // var data = [trace]
        // var layout = {
        //     margin: {
        //         l: 10,
        //         r: 10,
        //         b: 10,
        //         t: 10,
        //         pad: 4
        //     }
        // }   
  
        // Plotly.newPlot("pieChart", data, layout)
    });

};
function optionChanged (newsample){
    metadata(newsample);
    createchart(newsample)
}
function createchart (sampleID){
    d3.json("samples.json").then(function(data){
        var chartsamples = data.samples;
        var dataarray = chartsamples.filter(sample=>sample.id==sampleID);
        var result = dataarray[0];
        console.log(result);
        var otu_ids = result.otu_ids;
        var sample_values = result.sample_values;
        var otu_labels = result.otu_labels;
        var bubbledata = [{
            x:otu_ids,
            y:sample_values,
            text:otu_labels,
            mode:"markers",
            marker:{
                size:sample_values,
                color:otu_ids
            }
        }];
        var bubblelayout={
            title:"Bacteria Culture per Sample"
        }
        Plotly.newPlot("bubble", bubbledata,bubblelayout);
        var bardata=[{
            x:sample_values.slice(0,10).reverse(),
            y:otu_ids.slice(0,10).map(otu_ids=>`OTU ${otu_ids}`).reverse(),
            text:otu_labels.slice(0,10).reverse(),
            type:"bar",
            orientation:"h"


        }];
        var barlayout={
            title:"Top Ten Data Points for Bar Chart"
        }
        Plotly.newPlot("bar",bardata,barlayout)
    });
}
