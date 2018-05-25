var x =[];
var y =[];

function create2D(){
    for (var i =0; i<noOfCurves()*(filelines[start()[0]].split(" ").length-1); i++){
        x.push([]);
        y.push([]);
    }
}
function noOfCurves(){
    var noOfCurves = 1;
    for (var i = 0; i < filelines.length;i++){
        if (filelines[i].includes("# END OF COOP")){

            noOfCurves++;
        }
    }
    return noOfCurves;
}
function start(){
    var start = [];
    start.push(StartLine());
    for (var i = 0; i < filelines.length;i++){
        if (filelines[i].includes("# END OF COOP")){

            start.push(i+2);
        }
    }
    
    return start;
}

function endOfCurve(){

    var end = [];
    for (var i = 0; i < filelines.length;i++){
        if (filelines[i].includes("# END OF COOP")){

            end.push(i-1);

        }
        if (filelines[i].includes("#FERMI_ENERGY")){

            end.push(i-2);

        } 
    }
    return end;

}
function StartLine(){
    for (var i = 0; i < filelines.length;i++){
        if (filelines[i].includes("#")){

        }
        else {
            return i;
        }
    }
}
function readDos(){
    
    console.log(StartLine());
    create2D();
    enterData();
    console.log(x);
    console.log(y);
    plotDos();
}

var column; 


function enterDataOLD(){
    for (var i = 0; i < noOfCurves(); i++){
        var a = 0;
        // No of columns 
        var L = filelines[start()[i]].split(" ").length;
        console.log(L);
        for(var j = start()[i]; j < endOfCurve()[i];j++){
            
            x[i][a] = filelines[j].split(" ")[L-1];
            y[i][a] = filelines[j].split(" ")[0];
            a++;

        }
    }
}


function enterData(){
    var currentCol = filelines[start()[0]].split(" ").length-1;
    var m = 0;
    var shiftCol = 0;
    //4 is no of curves
    for (i = 0; i < noOfCurves()*(filelines[start()[0]].split(" ").length-1); i++){
       
        var a = 0;
        for(var j = start()[m]; j < endOfCurve()[m];j++){
            x[i][a] = filelines[j].split(" ")[currentCol-shiftCol];
            y[i][a] = filelines[j].split(" ")[0];

            a++;
        }
        if (shiftCol ==(currentCol-1)){
            shiftCol = 0;
        }
        else {
            shiftCol++;
        }
        
        if ((m+1)%currentCol == 0){
            m=0;
        }

        m++;

    }

}




function plotDos(){
    var plt1 = {
        x: y[0],
        y: x[0],
        type: 'scatter'
      };
    Plotly.newPlot('plot',[plt1]);
    
}