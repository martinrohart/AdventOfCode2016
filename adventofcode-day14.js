var md5 = require('md5');
var input="qzyelonm";
var puzzle=2;

main(input);


function main(input){

	var potentialKeys = [];
	var keys = [];

	var cnt=0;
	var cntWhenLimitReached = 0;

	while(keys.length<64 || cnt<(cntWhenLimitReached+1000)){

		var key = md5(input+cnt);
		if(puzzle==2){
			for(var i=0;i<2016;i++){
				key=md5(key);
			}
		}

		var triple = getTriple(key);
		if(triple){
			
			var quintuples = getQuintuples(key);
			for(var quintuple of quintuples){
					for(var checkKey of potentialKeys){
						if(checkKey.triple==quintuple && (checkKey.cnt+1000)>=cnt && checkKey.added==undefined){
							keys.push(checkKey);
							console.log("Found key: "+checkKey.key + " nr"+keys.length);
							checkKey.added = true;
							if(keys.length==64){
								cntWhenLimitReached = cnt;
							}
						}else{
							//Remove potential key
						}
					}
			}
			potentialKeys.push({
				key: key,
				triple: triple,
				cnt: cnt
			});
		}

		cnt++;
	}
	
	keys.sort(function(a,b){
		return (a.cnt - b.cnt);
	});
	console.log(keys);
	console.log("64th keys: "+keys[63].key+" at index "+keys[63].cnt);
}

function getTriple(key){
	var result = undefined;
	key.split('').forEach(function(value, index, self){
		if(self[index]==self[index+1] && self[index]==self[index+2]){
			result = result || value;
		}
	});
	return result;
}

function getQuintuples(key){
	var result = [];
	key.split('').forEach(function(value, index, self){
		if(value==self[index+1] && value==self[index+2] && value==self[index+3] && value==self[index+4]){
			result.push(value);
		}
	});
	return result;
}