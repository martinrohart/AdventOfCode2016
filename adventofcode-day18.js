var input=".^..^....^....^^.^^.^.^^.^.....^.^..^...^^^^^^.^^^^.^.^^^^^^^.^^^^^..^.^^^.^^..^.^^.^....^.^...^^.^.";
var puzzle=2;

var nbRows = puzzle==1?40:400000;

main(input);


function main(input){
	var map = [[]];
	for(var i=0;i<input.length;i++){
		map[0].push(input.substring(i,i+1));
	}

	var rowIndex=1;
	while(rowIndex < nbRows){
		var newRow = map[0].map(function(value, i, self){
			var ref = map[rowIndex-1];
			var refLeft = i==0?'.':ref[i-1];
			var refCenter = ref[i];
			var refRight = (i==(input.length-1))?'.':ref[i+1];
			if( (refLeft=='^' && refCenter=='^' && refRight=='.') ||
				(refLeft=='.' && refCenter=='^' && refRight=='^') ||
				(refLeft=='^' && refCenter=='.' && refRight=='.') ||
				(refLeft=='.' && refCenter=='.' && refRight=='^')){
				return '^';
			}else{
				return '.';
			}
		});
		map.push(newRow);
		rowIndex++;
	}

	var safe = 0;
	for(var row of map){
		for(var tile of row){
			if(tile=='.'){
				safe++;
			}
		}
	}
	console.log("Safe tiles: "+safe);
}