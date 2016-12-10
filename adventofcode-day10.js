var fs = require('fs');

var puzzle = 1;

fs.readFile('input-day10.txt', (err, stream) => {
	puzzle==2 ? getLength(stream.toString()) : main(stream.toString());
});

var searchingFor = [17,61];

function main(input){
	var instructions = [];
	var responsible = undefined;
	var bots = {};
	var outputs = {};

	var lines = input.split('\r\n');
	for(var line of lines){
		if(line.indexOf("value")==0){
			var valueRegex = /^value.(\d+).goes.to.bot.(\d+)$/;
			var r = line.match(valueRegex);

			var value = parseInt(r[1]);
			var botNr = r[2];

			if(!bots[botNr]){
				bots[botNr] = {values: []};
			}
			bots[botNr].values.push(value);
		}else{
			var botRegex = /^bot.(\d+).gives.low.to.([a-z]+)\s(\d+).and.high.to.([a-z]+)\s(\d+)$/;
			var r = line.match(botRegex);

			var botNr = r[1];
			var lowDestType = r[2];
			var lowDestNr = r[3];
			var highDestType = r[4];
			var highDestNr = r[5];

			instructions.push([botNr, lowDestType, lowDestNr, highDestType, highDestNr ]);
		}
	}

	//Execution
	var executed = 0;
	while(executed<instructions.length){
		for(var instruction of instructions){
			if(instruction){
				console.log("Starts "+instruction);
				if(bots[instruction[0]] && bots[instruction[0]].values.length==2){
					var botValues = bots[instruction[0]].values;

					var low = botValues[0]<botValues[1] ? botValues[0]:botValues[1];
					var high = botValues[0]<botValues[1] ? botValues[1]:botValues[0];

					if(low==searchingFor[0] && high==searchingFor[1]){
						responsible = instruction[0];
						console.log("bot "+instruction[0]+ " responsible");
					}

					if(instruction[1]=='bot'){
						if(!bots[instruction[2]]){
							bots[instruction[2]] = {values: []};
						}
						bots[instruction[2]].values.push(low);
					}else{
						if(!outputs[instruction[2]]){
							outputs[instruction[2]] = {values: []};
						}
						outputs[instruction[2]].values.push(low);
					}


					if(instruction[3]=='bot'){
						if(!bots[instruction[4]]){
							bots[instruction[4]] = {values: []};
						}
						bots[instruction[4]].values.push(high);
					}else{
						if(!outputs[instruction[4]]){
							outputs[instruction[4]] = {values: []};
						}
						outputs[instruction[4]].values.push(high);
					}

					bots[instruction[0]].values = [];
					//Empty instruction
					instruction = undefined;
					executed++;
				}
			}
		}
	}

	status(bots, "Bot");
	status(outputs, "Output");
	console.log("Responsible: "+responsible);
	console.log("Result puzzle 2 = "+outputs["0"].values[0]*outputs["1"].values[0]*outputs["2"].values[0])
}

function status(bots, type){
	for (var key in bots) {
	    if (bots.hasOwnProperty(key)) {
	        console.log(type+key+": "+bots[key].values);
	    }
	}
}

