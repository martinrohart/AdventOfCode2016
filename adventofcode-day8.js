var fs = require('fs');

var screen = [ 	[],
					[],
					[],
					[],
					[],
					[]];


fs.readFile('input-day8.txt', (err, stream) => {
    main(stream.toString());
});


function main(input){
	screen = screen.map(function(value){
		for (var i=0;i<50;i++){
			value.push('.');
		}
		return value;
	});

    var lines = input.split("\n");
    for(var line of lines){

    	if(line.indexOf("rect")==0){
    		var regex = /^\s*rect\s(\d+)x(\d+)\s*$/;
    		var r = line.match(regex);
		    if(r!=null && r.length==3){
		    	var height = parseInt(r[2]);
		    	var width = parseInt(r[1]);
		    	for(var i = 0; i<height;i++){
		    		for(var j=0;j<width;j++){
						screen[i][j] = 1;
					}
		    	}
	    	}
	    }else if(line.indexOf("rotate row")==0){
    		var regex = /^\s*rotate\srow\sy=(\d+)\sby\s(\d+)\s*$/;
    		var r = line.match(regex);
		    if(r!=null && r.length==3){
		    	var rowIndex = parseInt(r[1]);
		    	var offset = parseInt(r[2]);
		    	screen[rowIndex] = screen[rowIndex].map(function(value,index,self){
		    		if((index-offset)<0){
		    			return self[self.length-(offset-index)];
		    		}else{
		    			return self[index-offset]
		    		}
		    	});
	    	}
	    }else if(line.indexOf("rotate column")==0){
    		var regex = /^\s*rotate\scolumn\sx=(\d+)\sby\s(\d+)\s*$/;
    		var r = line.match(regex);
		    if(r!=null && r.length==3){
		    	var columnIndex = parseInt(r[1]);
		    	var offset = parseInt(r[2]);

		    	var column = [screen[0][columnIndex],screen[1][columnIndex],screen[2][columnIndex],screen[3][columnIndex],screen[4][columnIndex],screen[5][columnIndex] ];
		    	column = column.map(function(value,index,self){
		    		if((index-offset)<0){
		    			return self[self.length-(offset-index)];
		    		}else{
		    			return self[index-offset]
		    		}
		    	});
		    	screen[0][columnIndex] = column[0];
		    	screen[1][columnIndex] = column[1];
		    	screen[2][columnIndex] = column[2];
		    	screen[3][columnIndex] = column[3];
		    	screen[4][columnIndex] = column[4];
		    	screen[5][columnIndex] = column[5];
	    	}
	    }

    	displayScreen();
    }	

    console.log("Pixels "+pixelsLit());
}

function pixelsLit()
{
	var count = 0;
	for(var row of screen){
		for(var i=0;i<row.length;i++){
			if(row[i]==1){
				count++;
			}
		}
	}
	return count;
}

function displayScreen()
{
	console.log("Screen starts#########################");
	for (var line of screen){
		console.log(line.join(''));
	}
	console.log("Screen ends#########################");
}