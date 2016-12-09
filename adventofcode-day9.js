var fs = require('fs');

var puzzle = 2;

fs.readFile('input-day9.txt', (err, stream) => {
	puzzle==2 ? getLength(stream.toString()) : main(stream.toString());
});

function getLength(remaining){
	var total = 0;
	while(remaining){
    	var temp = decompressLength(remaining);
    	remaining = temp.remaining;
    	total = total + temp.count;
	}
	console.log(total);
	return total;
}

function decompressLength(line){
	var count = 0;
	var regex = /([^\(]*)(\((\d+)x(\d+)\))?(.*)/;

	var r = line.match(regex);
	if(r!=null && r.length==6){
		count = count + r[1].length;

		var repeatExpression = r[2];
		var remainingText = r[5];

		if(r[2]){
				var length = parseInt(r[3]);
				var repetitions = parseInt(r[4]);
				var repeatText = remainingText.substring(0,length);

				count = count + (repetitions * getLength(repeatText));

				remainingText = remainingText.substring(length);
		}

		return {remaining: remainingText, count:count};
	}

	return {};
}

function main(input){
	var answer = "";
	while(input){
    	var temp = decompress(input);
    	input = temp.remaining;
    	answer = answer + temp.result;
	}
    console.log("Decompressed length: "+answer.length);
}

var decompress= function(line)
{
	//console.log("hit"+line);
	var result = "";
	var regex = /([^\(]*)(\((\d+)x(\d+)\))?(.*)/;

	var r = line.match(regex);
	if(r!=null && r.length==6){
		result = result + r[1];

		var repeatExpression = r[2];
		var remainingText = r[5];

		if(r[2]){
				var length = parseInt(r[3]);
				var repetitions = parseInt(r[4]);
				var repeatText = remainingText.substring(0,length);
				for(var i=0;i<repetitions;i++){
					result = result + repeatText;
				}

				remainingText = remainingText.substring(length);
		}

		return {
			result: result, 
			remaining: remainingText
		};

	}

	return {};
}
