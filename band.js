
function readBand(){
    // findind the starting line
    var start;
    start = false;
    // scanning through the entire text
    for( var i =0 ; i < filelines.length; i++ ) {
        if (filelines[i].search("Begin band data.") !== -1){
            start = i ;
            break
        }
    }
    // check if actually found the line 
    if (start !== false) {
        var bandData = filelines.slice(start+1,filelines.length);
        return organizeBand(bandData);
    }
    // if not found then return false
    else {
        return false;
    } 
}


function organizeBand(band) { 
    // Find the number of bands (energy values) 
    var nBands;
    nBands = filelines[4].split(" ")[0]; 
    // number of K points
    nKpts  = filelines[3].split(" ")[0]; 
    
    // make empty list for bands data => [ [], [], [] ....   ]
    var bands = [];
    for( var i =0 ; i < nBands; i++ ) {
        bands.push([]);
    }
    // j is the line number
    var j = 0;
    for( var k =0 ; k <= nKpts; k++ ) {
        // skipping first line
        j++
        for( var i =0 ; i < nBands; i++ ) {
            bands[i].push(band[j])
            j++
        }
    }    
    return bands; 
}


function getTicks(){
    // number of special points
    nSpts = filelines[2].split(" ")[0];
    // finding the starting line
    var start;
    start = false;
    // scanning through the entire text
    for( var i =0 ; i < filelines.length; i++ ) {
        if (filelines[i].search("Begin band data.") !== -1){
            start = i ;
            break
        }
    }
    var end = start;
    start = start - nSpts ;
    Kspts = filelines.slice(start,end)

    var pos = []
    var name = []
    for (var i = 0 ; i < nSpts; i++ ){
        // search ith special point position 
        var count = 0
        for (var j = 0 ; j < filelines.length; j++ ){
            if (filelines[j].search("; K point:") !== -1){
                var point = Kspts[i].split(" ").slice(1,).join(" ");
                if (filelines[j].search(point) !==-1){
                    pos.push(count);
                    name.push(Kspts[i].split(" ")[0]);
                    break
                }
                count++
            }
            
        }
    }
    return [name, pos] ; 
}

function plotBand(bands,xlabel){
    data = [];
    for (var i = 0; i< bands.length; i++ ){

        data.push({ x: [...Array(bands[i].length).keys()], y: bands[i],name: 'E <sub>'+ i.toString() + '</sub>'});
    }
    var ticks = getTicks();
    Plotly.newPlot('plot', data, {title:'Band Structure', xaxis:{tickvals:ticks[1],
        ticktext : ticks[0]                                                  
    } }); 
} 