var x =[];
var y =[];

function create2D(){
    for (var i =0; i<noOfPoints(); i++){
        x.push([]);
        y.push([]);
    }
}
function noOfPoints(){
    var noOfPoints = 1;
    for (var i = 0; i < filelines.length;i++){
        if (filelines[i].includes("# END OF DOS")){

            noOfPoints++;
        }
    }
    return noOfPoints;
}
function start(){
    var start = [];
    start.push(StartLine());
    for (var i = 0; i < filelines.length;i++){
        if (filelines[i].includes("# END OF DOS")){

            start.push(i+2);
        }
    }
    return start;
}

function ennnnd(){

    var end = [];
    for (var i = 0; i < filelines.length;i++){
        if (filelines[i].includes("# END OF DOS")){

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
    // plotDos();
}

var column; 

function enterData1(){
    for (var i = 0; i < noOfPoints(); i++){
        var a = 0;
        for(var j = start()[i]; j < ennnnd()[i];j++){
            x[i][a] = filelines[j].split(" ")[2];
            y[i][a] = filelines[j].split(" ")[0];
            a++;

        }
    }
}
function enterData(column=0){
    for (var i = 0; i < noOfPoints(); i++){
        var a = 0;
        for(var j = start()[i]; j < ennnnd()[i];j++){
            // No of columns 
            var L = filelines[j].split(" ").length
            console.log(L);
            x[i][a] = filelines[j].split(" ")[L-1];
            y[i][a] = filelines[j].split(" ")[column];
            a++;

        }
    }
}


function plotDos(){
    Plotly.newPlot('plot', x[0],y[0]);
}