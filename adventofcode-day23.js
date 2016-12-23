var fs = require('fs');

var puzzle = 2;

fs.readFile('input-day23.txt', (err, stream) => {
    main(stream.toString());
});


function main(input){
	var registers = {};
	registers['a'] = puzzle==1?7:12;
	registers['b'] = 0;
	registers['c'] = 0;
	registers['d'] = 0;

    var lines = input.split("\n");
    var index=0;
    while(index<lines.length){
    	var line = lines[index];

    	if(line.indexOf("cpy")==0){
    		var regex = /cpy\s([^\s]+)(\s([^\s]+))?/;
    		var r = line.match(regex);
    		if(!isNaN(parseInt(r[3]))){
    			console.log("invalid instruction, skip");
    		}else{
	    		if(isNaN(parseInt(r[1]))){
		    		registers[r[3]] = registers[r[1]];
		    	}else{
		    		registers[r[3]] = parseInt(r[1]);

		    	}
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
	    	var regex = /jnz\s([^\s]+)(\s([^\s]+))?/;
    		var r = line.match(regex);

			var x = parseInt(r[1]);
    		if(isNaN(x)){
	    		x=registers[r[1]];
	    	}

    		if(x!=0){
    			var value = parseInt(r[3]);
    			if(isNaN(value)){
		    		value = registers[r[3]];
		    	}

    			index = index+value;
    			//console.log("jump "+value+" to " +index);
    			continue;
    		}
    		
	    }else if(line.indexOf("tgl")==0){
	    	var regex = /tgl\s([^\s]+)(\s([^\s]+))?/;
    		var r = line.match(regex);

			var x = parseInt(r[1]);
    		if(isNaN(x)){
	    		x=registers[r[1]];
	    	}

	    	if((index+x)<lines.length){
		    	var lineToToggle =lines[index+x];
		    	var remainingLine = lineToToggle.substring(3);
		    	if(lineToToggle.indexOf("inc")==0){
		    		lineToToggle = "dec"+remainingLine;
		    	}else if(lineToToggle.indexOf("dec")==0 || lineToToggle.indexOf("tgl")==0){
		    		lineToToggle = "inc"+remainingLine;
		    	}else if(lineToToggle.indexOf("jnz")==0){
		    		lineToToggle = "cpy"+remainingLine;
		    	}else if(lineToToggle.indexOf("cpy")==0){
		    		lineToToggle = "jnz"+remainingLine;
		    	}
		    	lines[index+x] = lineToToggle;

		    	console.log("toggled line "+(index+x)+" into "+lineToToggle);
		    }
    		
	    }
	    //console.log(index+":" + line);
	    /*console.log("Register a: "+registers['a']);
	    console.log("Register b: "+registers['b']);
	    console.log("Register c: "+registers['c']);
	    console.log("Register d: "+registers['d']);
	    console.log(lines);*/
	    index++;
    }	
	console.log("Register a: "+registers['a']);
	console.log("Register b: "+registers['b']);
    console.log("Register c: "+registers['c']);
	console.log("Register d: "+registers['d']);
   
}