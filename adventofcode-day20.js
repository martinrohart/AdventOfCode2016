var fs = require('fs');


fs.readFile('input-day20.txt', (err, stream) => {
    main(stream.toString());
});


function main(input){
	var min=0;
	var max=10;
	var intervals = [];
    var lines = input.split("\n");
    for(var line of lines){
    	var low = line.substring(0, line.indexOf('-'));
    	var high = line.substring(line.indexOf('-')+1);
    	var interval = {
    		low:parseInt(low),
    		high:parseInt(high)
    	};
    	intervals.push(interval);
    }

    intervals.sort(function(a,b){
    	return (a.low-b.low);
    });


    var i=0;
    var nb =0;
	for(var j=0;j<intervals.length;j++){
		if(i>=intervals[j].low && i<=intervals[j].high){
			i=intervals[j].high+1;
		}else if((j==(intervals.length-1)) || (i<intervals[j].low)) {
			if(nb==0){
				console.log("First IP allowed "+i);
			}

			if(j==(intervals.length-1)){
				if(i<max){
					nb = nb +(max-i)+1;
				}
			}else{
				nb = nb +(intervals[j].low-i);
				i=intervals[j].high+1;
			}
			
		}
	}
	console.log("Nb included: "+nb);
}
