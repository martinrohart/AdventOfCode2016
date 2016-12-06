var fs = require('fs');
var puzzle = 2;

fs.readFile('input-day6.txt', (err, stream) => {
    main(stream.toString());
});


function main(input){
    var lines = input.split("\r\n");
    var array = lines[1].split('').map(function(value, index, self){
    	return puzzle==1 ? getMaxOccurence(index,lines) : getMinOccurence(index,lines);
	});

    console.log("Message mapping: "+array.join(''));
}

function getMaxOccurence(index, lines)
{
	var counts = {};
	var max = 0;
	var charMax = 0;

	for(var line of lines) {
	    var current = line.split('')[index];
	    counts[current] = (counts[current]|0) + 1;
	    if(counts[current]>max){
			max = counts[current];
			charMax = current;
		}
	}
	return charMax;
}

function getMinOccurence(index, lines)
{
	var counts = {};

	for(var line of lines) {
	    var current = line.split('')[index];
	    counts[current] = (counts[current]|0) + 1;
	}

	var min = undefined;
	var minKey = undefined;
	for (var key in counts) {
	    if (counts.hasOwnProperty(key)) {
	    	if(!min || counts[key]<min){
	    		min = counts[key];
	    		minKey = key;
	    	}
	    }
	}
	return minKey;
}

