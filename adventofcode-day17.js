var md5 = require('md5');
var input="awrkjxxr";
var puzzle=2;
var latest = undefined;

main();

function main(){
	var paths = [{x:0,y:0,path:''}];

	var i=0;
	while(++i){
		paths = puzzle==1?nextStep(paths):nextStep2(paths);
		if(paths==false){
			return;
		}
		//console.log("Paths after step "+i+":");
		//console.log(paths);
	}
}

function nextStep(paths){
	var result = [];
	for(var path of paths){
		var newPaths = getPaths(path);
		for(var newPath of newPaths){
			if(newPath.x==3 && newPath.y==3){
				console.log("Success! "+newPath.path);
				return false;
			}
			result.push(newPath);
		}
		
	}
	return result;
}

function nextStep2(paths){
	var result = [];
	for(var path of paths){
		var newPaths = getPaths(path);
		for(var newPath of newPaths){
			if(newPath.x==3 && newPath.y==3){
				latest = newPath;
			}else{
				result.push(newPath);
			}
		}
	}
	if(result.length==0){
		console.log("no more possible paths");
		console.log("Longest: "+latest.path+" of length "+ latest.path.length);
	}
	return result;
}

function getPaths(path){
	var result = [];
	var hash = md5(input+path.path).substring(0,4).split('');
	if(path.y!=0 && isOpen(hash[0])){
		result.push({
				x:path.x,
				y:path.y-1,
				path: path.path+'U'
			});
	}

	if(path.y!=3 && isOpen(hash[1])){
		result.push({
				x:path.x,
				y:path.y+1,
				path: path.path+'D'
			});
	}
	if(path.x!=0 && isOpen(hash[2])){
		result.push({
				x:path.x-1,
				y:path.y,
				path: path.path+'L'
			});
	}
	if(path.x!=3 && isOpen(hash[3])){
		result.push({
			x:path.x+1,
			y:path.y,
			path: path.path+'R'
		});
	}
	return result;
}

function isOpen(char){
	return char=='b' || char == 'c' || char=='d' || char=='e' || char=='f';
}
