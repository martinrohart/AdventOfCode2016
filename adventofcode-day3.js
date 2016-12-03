var fs = require('fs');
var input="";
var puzzle = 2;

fs.readFile('input-day3.txt', (err, stream) => {
    input = stream.toString(),
    //console.log(input);
    puzzle==1 ? main1() : main2();
});


function main1(){
    var nbCorrects = 0;
    var triangles = input.split("\n");
    var regex = /^\s*(\d+)\s+(\d+)\s+(\d+)\s*$/

    for(var triangle of triangles){
        
        var r = triangle.match(regex);
        if(r!=null && r.length==4){
            var r1 = parseInt(r[1]);
            var r2 = parseInt(r[2]);
            var r3 = parseInt(r[3]);
            if( (r1+r2)>r3 && (r2+r3)>r1 && (r1+r3)>r2 ){
                nbCorrects++;
            }
        }

    }

    console.log("Correct triangles: "+nbCorrects+" of total "+triangles.length);
}

function main2(){
    var nbCorrects = 0;
    var lines = input.split("\n");
    var regex = /^\s*(\d+)\s+(\d+)\s+(\d+)\s*$/
    
    var correctLines = lines.filter(function(line){
        var r = line.match(regex);
        return r!=null && r.length==4;
    });

    console.log(correctLines.length % 3);
    
    var allSidesSorted = [];

    for(var line of correctLines){
        var r = line.match(regex);
        allSidesSorted.push(parseInt(r[1]));
    }
    for(var line of correctLines){
        var r = line.match(regex);
        allSidesSorted.push(parseInt(r[2]));
    }
    for(var line of correctLines){
        var r = line.match(regex);
        allSidesSorted.push(parseInt(r[3]));
    }

    for(var i=0;i<allSidesSorted.length;i=i+3){
        var r1 = allSidesSorted[i];
        var r2 = allSidesSorted[i+1];
        var r3 = allSidesSorted[i+2];
        if( (r1+r2)>r3 && (r2+r3)>r1 && (r1+r3)>r2 ){
            nbCorrects++;
        }
    }

    console.log("Correct triangles: "+nbCorrects+" of total "+correctLines.length);
}
