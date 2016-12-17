var fs = require('fs');

var puzzle = 2;

fs.readFile('input-day12.txt', (err, stream) => {
    main(stream.toString());
});


function main(input){
	var registers = {};
	registers['a'] = 0;
	registers['b'] = 0;
	registers['c'] = puzzle==2?1:0;
	registers['d'] = 0;

    var lines = input.split("\n");
    var index=0;
    while(index<lines.length){
    	var line = lines[index];

    	if(line.indexOf("cpy")==0){
    		var regex = /cpy\s(\d+)?([a-d])?\s([a-d])/;
    		var r = line.match(regex);
    		var value = parseInt(r[1]);
    		if(value){
	    		registers[r[3]] = value;
	    	}else{
	    		registers[r[3]] = registers[r[2]];
	    	}
	    }else if(line.indexOf("inc")==0){
	    	var regex = /inc\s([a-d])/;
    		var r = line.match(regex);
    		registers[r[1]] = registers[r[1]]+1;

	    }else if(line.indexOf("dec")==0){
	    	var regex = /dec\s([a-d])/;
    		var r = line.match(regex);
    		registers[r[1]] = registers[r[1]]-1;
	    }else if(line.indexOf("jnz")==0){
	    	var regex = /jnz\s(.)\s(\-?\d+)/;
    		var r = line.match(regex);

			var x = parseInt(r[1]);
    		if(!x){
	    		x=registers[r[1]];
	    	}

    		if(x!=0){
    			var value = parseInt(r[2]);
    			index = index+value;
    			continue;
    		}
    		
	    }
	    /*console.log("Register a: "+registers['a']);
	    console.log("Register b: "+registers['b']);
	    console.log("Register c: "+registers['c']);
	    console.log("Register d: "+registers['d']);*/
	    index++;
    }	
	console.log("Register a: "+registers['a']);
	console.log("Register b: "+registers['b']);
    console.log("Register c: "+registers['c']);
	console.log("Register d: "+registers['d']);
   
}