var input="L1, L3, L5, L3, R1, L4, L5, R1, R3, L5, R1, L3, L2, L3, R2, R2, L3, L3, R1, L2, R1, L3, L2, R4, R2, L5, R4, L5, R4, L2, R3, L2, R4, R1, L5, L4, R1, L2, R3, R1, R2, L4, R1, L2, R3, L2, L3, R5, L192, R4, L5, R4, L1, R4, L4, R2, L5, R45, L2, L5, R4, R5, L3, R5, R77, R2, R5, L5, R1, R4, L4, L4, R2, L4, L1, R191, R1, L1, L2, L2, L4, L3, R1, L3, R1, R5, R3, L1, L4, L2, L3, L1, L1, R5, L4, R1, L3, R1, L2, R1, R4, R5, L4, L2, R4, R5, L1, L2, R3, L4, R2, R2, R3, L2, L3, L5, R3, R1, L4, L3, R4, R2, R2, R2, R1, L4, R4, R1, R2, R1, L2, L2, R4, L1, L2, R3, L3, L5, L4, R4, L3, L1, L5, L3, L5, R5, L5, L4, L2, R1, L2, L4, L2, L4, L1, R4, R4, R5, R1, L4, R2, L4, L2, L4, R2, L4, L1, L2, R1, R4, R3, R2, R2, R5, L1, L2";
//var input="R8, R4, R4, R8";

var puzzle = 1;
var visitedLocations = {};

main();


function main(){
    var destinationX =0;
    var destinationY=0;

    var currentDirection ="north";

    var instructions = input.split(", ");
    for (var i=0;i<instructions.length;i++){
        var instruction = instructions[i];
        
        currentDirection = switchDirection(currentDirection, instruction.substring(0,1));
        var moveLength = new Number(instruction.substring(1)).valueOf();
        
        for(var j=0;j<moveLength;j++){
            switch(currentDirection){
                case "north":
                    destinationY = destinationY+1 ;
                    break;

                    case "south":
                    destinationY = destinationY-1 ;
                    break;
                    
                      case "east":
                    destinationX = destinationX+1 ;
                    break;
                    
                      case "west":
                    destinationX = destinationX-1 ;
                    break;
            }
            var visited = markVisited(destinationX, destinationY);
            if(visited){
                 $.writeln("twice visited moves needed "+ (Math.abs(destinationX)+Math.abs(destinationY)));
                 if(puzzle==2){
                     return;
                 }
            }
        }        
    }
    $.writeln("Facing:"+currentDirection+" coordinates: "+destinationX+"-"+destinationY);
    $.writeln("moves needed "+ (Math.abs(destinationX)+Math.abs(destinationY)));
}

function  markVisited(destinationX, destinationY){
    var key = destinationX+"-"+destinationY;
    if(visitedLocations[key]=="visited"){
        return true;
    }else{
        visitedLocations[key] = "visited";
        return false;
    }
}

function switchDirection(currentDirection, rotation){
    switch(currentDirection){
        case "north":
            return rotation=="L"?"west":"east";

            case "south":
            return rotation=="L"?"east":"west";
            
              case "east":
            return rotation=="L"?"north":"south";
            
              case "west":
            return rotation=="L"?"south":"north";
    }
}