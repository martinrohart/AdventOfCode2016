
var input="11100010111110100";
var diskLength = 35651584; //puzzle1: 272

main(input);


function main(input){

	while(input.length<diskLength){
		input = dragon(input);
	}
	input = input.substring(0, diskLength);
	console.log(input);

	
	var checksum=input;
	while(checksum.length % 2 != 1){
		checksum = dragonChecksum(checksum);
	}

	console.log("Checksum "+checksum + " length "+checksum.length);
}


function dragon(text)
{
	var reverted = text.split('').map(function(value, index, self){
		var temp = self[self.length-index-1];
		return temp=='0'?'1':'0';
	});

	return text+"0"+reverted.join('');
}

function dragonChecksum(text)
{
	var checksum = text.split('').map(function(value, index, self){
		if(index % 2 ==1){
			return "";
		}
		return (value==self[index+1]) ? '1' : '0';
	});
	return checksum.join('');
}