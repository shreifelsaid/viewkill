
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
    // Find the number of bands
    var nBands;
    nBands = filelines[4].split(" ")[0]; 
    // number of K points
    nKpts  = filelines[3].split(" ")[0]; 
    
    // make empty list for bands data
    var bands = [];
    for( var i =0 ; i < nBands; i++ ) {
        bands.push([]);
    }
    
    var j = 0;
    for( var k =0 ; k < nKpts; k++ ) {
        // skipping first line
        j++
        for( var i =0 ; i < nBands; i++ ) {
            bands[i].push(band[j])
            j++
        }
    }    
    return bands; 
}