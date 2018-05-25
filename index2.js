document.getElementById("openfile").addEventListener("change", function(){

    var fr = new FileReader();
    fr.onload = function() {
    filelines = this.result.split("\n");
    //document.getElementById("filecontents").textContent = this.result;
    plotBand(readBand());
    }

    fr.readAsText(this.files[0]);
    }

)