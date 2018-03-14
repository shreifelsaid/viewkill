var x =[];
var y =[];

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

    for (var i = 0; i < filelines.length;i++){
       
           x.push(filelines[i].split(" ")[2]);
           y.push(filelines[i].split(" ")[0]);
       
    }
 
    plotDos()
}

function plotDos(){
    for(var i = 0; i <2;i++){
       for (var j = start()[i]; j < ennnnd()[i];j++){
            console.log("x value is : "+x[j]);
            console.log("y value is : "+y[j]);

        } 
        
    }
}