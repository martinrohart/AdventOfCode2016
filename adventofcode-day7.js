var fs = require('fs');
var puzzle = 1;

fs.readFile('input-day7.txt', (err, stream) => {
    main(stream.toString());
});


function main(input){
	var countTLS = 0;
	var countSSL = 0;
    var lines = input.split("\n");
    for(var line of lines){
    	if(supportsTLS(line)){
    		countTLS++;
    	}
    	if(supportsSSL(line)){
    		countSSL++;
    	}
    }	

    console.log("IPs with TLS: "+countTLS+" of "+lines.length);
    console.log("IPs with SSL: "+countSSL+" of "+lines.length);
}

function supportsSSL(line)
{
	var tokens = line.split(']');

	var ABAs = [];
	var hypernets = [];

	var regex = /^\s*([a-z]+)(\[([a-z]+))?\s*$/

	for(var token of tokens){
		var r = token.match(regex);
	    if(r!=null && r.length>1){
	    	if(r[3]){
	    		hypernets.push(r[3]);
	    	}
	    	var result =getABAs(r[1]);
	    	for(var aba of result){
	    		ABAs.push(aba);
	    	}
	    }
	}

	for(var hypernet of hypernets){
		for(var aba of ABAs){
			if(hasBAB(aba.substring(0,1), aba.substring(1,2),hypernet)){
				return true;
			}
		}
	}

	return false;
}

function getABAs(text)
{
	var result = [];
	var array = text.split('');
	for(var i=0;i<(array.length-2);i++){
		if(array[i]!=array[i+1] && array[i]==array[i+2]){
			result.push(array[i]+array[i+1]+array[i+2]);
		}
	}
	return result;
}

function hasBAB(a, b, text)
{
	//console.log("hasBAB: "+a+", "+b+" in "+text);
	var array = text.split('');
	for(var i=0;i<(array.length-2);i++){
		if(array[i]==b && array[i+1]==a && array[i+2]==b){
			return true;
		}
	}
	return false;
}

function supportsTLS(line)
{
	var success = false;
	var tokens = line.split(']');
	for(var token of tokens){

		var regex = /^\s*([a-z]+)(\[([a-z]+))?\s*$/
		var r = token.match(regex);
	    if(r!=null && r.length>1){
	    	if(r[3] && hasABBA(r[3])){
	    		return false;
	    	}
	    	success = success || hasABBA(r[1]);
	    }
	}
	return success;
}

function hasABBA(text)
{
	var array = text.split('');
	for(var i=0;i<(array.length-3);i++){
		if(array[i]!=array[i+1] && array[i+1]==array[i+2] && array[i]==array[i+3]){
			return true;
		}
	}
	return false;
}
