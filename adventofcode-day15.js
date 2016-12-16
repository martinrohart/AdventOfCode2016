var fs = require('fs');

var puzzle = 2;

fs.readFile('input-day15.txt', (err, stream) => {
	main(stream.toString());
});


function main(input){
	input = puzzle==2?input+"\nDisc #7 has 11 positions; at time=0, it is at position 0.":input;
	var discs = [];
	var regex = /Disc.*has.(\d+).positions.*position.(\d+)./;

	var lines = input.split('\n');
	for(var line of lines){
		var r = line.match(regex);
		discs.push({
			positions:parseInt(r[1]),
			start:parseInt(r[2])
		});
	}

	var t = 0;
	while(++t){
		

		for(var i=0;i<discs.length;i++){
			var disc = discs[i];
			var discTime = t+i+1;

			var discPosition = disc.start + discTime;
			discPosition = discPosition % disc.positions;
			if(discPosition!=0){
				//console.log("T="+t+" - DT="+discTime+" - Fail disc "+(i+1));
				break;
			}
			//console.log("T="+t+" - Pass disc "+(i+1));

			if(i==(discs.length-1)){
				console.log("Success at time "+t);
				return;
			}
		}
	}

}
