﻿var input="UULLULLUULLLURDLDUURRDRRLDURDULLRURDUDULLLUULURURLRDRRRRULDRUULLLLUUDURDULDRRDRUDLRRLDLUDLDDRURURUURRRDDDLLRUDURDULUULLRRULLRULDUDRDRLDLURURUDDUDLURUDUDURLURURRURLUDDRURRDLUURLLRURRDUDLULULUDULDLLRRRDLRDLDUDRDDDRRUURRRRRUURRDRRDLURDRRURDLLUULULLRURDLDDDRRLLRRUURULURUUDDLRRUDDRURUUDLRLRDLRURRRDULLDLRUDDUULRDULURUURDULUDLLRRLDDLRDLRUDRLDDRLRRRDURDULLRRRDRRLUURURDRRDRRLDLUDURURLDUURDRUDRDDRLDRRLDLURURULLUURUDUUDLRLL\
LLLULLULDDULRLLURLLLRUUDDLRUULRLULLDLLRRDRLRLRLLDRUUURULDRDDLUDLLDUDULLLRLULLLRULDRDRUDLLRLRLLUDULRRRLDRUULDDULLDULULLUDUDLDRDURDLDLLDUDRRRDLUURRUURULLURLDURLRRLLDDUUULDRLUUDUDLURLULUDURRDRLLDDDDDRRULLRLDULULDDRUURRDLUDDDUDURDDRDRULULLLLUURDURUUUULUDLRURRULRDDRURURLLRLUUDUUURDLLDDLUDRLLLUDLLLLULRLURDRRRDUUDLLDLDDDURRDDRURUURDDRURRLDDDURDLLUURUUULRLUURRUDRLLDLURDUDRLULDLRLULULUDDLRDUDRUDLUULUULDURDRRRRLRULLUDRDDRDLDUDRDRRLDLLLLUDDLRULDLLDDUULDDRRULRRUURUDRDURLLLDDUUDRUUDLULLDR\
UDUUULLDDDDLUDLDULRLRDLULLDDRULDURRLURRUDLRRUDURRDUDRRRUULRLLRLUDLDRRDUURDDRDRDUUUDUDLDLLRRLUURLUUUDDDUURLULURRLURRRDRDURURUDRLRUURUDRUDDDRDRDLDRDURDLDRRDUUDLLURLDDURRRLULDRDRLLRLLLRURLDURDRLDRUURRLDLDRLDDDRLDLRLDURURLLLLDDRDUDLRULULLRDDLLUDRDRRLUUULDRLDURURDUDURLLDRRDUULDUUDLLDDRUUULRRULDDUDRDRLRULUUDUURULLDLLURLRRLDDDLLDRRDDRLDDLURRUDURULUDLLLDUDDLDLDLRUDUDRDUDDLDDLDULURDDUDRRUUURLDUURULLRLULUURLLLLDUUDURUUDUULULDRULRLRDULDLLURDLRUUUDDURLLLLDUDRLUUDUDRRURURRDRDDRULDLRLURDLLRRDRUUUURLDRURDUUDLDURUDDLRDDDDURRLRLUDRRDDURDDRLDDLLRR\
ULDRUDURUDULLUDUDURLDLLRRULRRULRUDLULLLDRULLDURUULDDURDUUDLRDRUDUDDLDRDLUULRRDLRUULULUUUDUUDDRDRLLULLRRDLRRLUDRLULLUUUUURRDURLLRURRULLLRLURRULRDUURRLDDRRDRLULDDRRDRLULLRDLRRURUDURULRLUDRUDLUDDDUDUDDUDLLRDLLDRURULUDRLRRULRDDDDDRLDLRRLUUDLUURRDURRDLDLDUDRLULLULRLDRDUDLRULLULLRLDDRURLLLRLDDDLLLRURDDDLLUDLDLRLUULLLRULDRRDUDLRRDDULRLLDUURLLLLLDRULDRLLLUURDURRULURLDDLRRUDULUURRLULRDRDDLULULRRURLDLRRRUDURURDURDULURULLRLDD\
DURLRRRDRULDLULUDULUURURRLULUDLURURDDURULLRRUUDLRURLDLRUDULDLLRRULLLLRRLRUULDLDLLRDUDLLRLULRLLUUULULRDLDLRRURLUDDRRLUUDDRRUDDRRURLRRULLDDULLLURRULUDLRRRURRULRLLLRULLRRURDRLURULLDULRLLLULLRLRLLLDRRRRDDDDDDULUUDUDULRURDRUDRLUULURDURLURRDRRRRDRRLLLLUDLRRDURURLLULUDDLRLRLRRUURLLURLDUULLRRDURRULRULURLLLRLUURRULLLURDDDRURDUDDULLRULUUUDDRURUUDUURURRDRURDUDRLLRRULURUDLDURLDLRRRRLLUURRLULDDDUUUURUULDLDRLDUDULDRRULDRDULURRUURDU";

var inputtest="ULL\
RRDDD\
LURDL\
UUUUD";


var puzzle = 2;

var moves1 =
{
  "U": {
    "1":"1",
    "2":"2",
    "3":"3",
    "4":"1",
    "5":"2",
    "6":"3",
    "7":"4",
    "8":"5",
    "9":"6"
  },
  "D": {
    "1":"4",
    "2":"5",
    "3":"6",
    "4":"7",
    "5":"8",
    "6":"9",
    "7":"7",
    "8":"8",
    "9":"9"
  },
  "L": {
    "1":"1",
    "2":"1",
    "3":"2",
    "4":"4",
    "5":"4",
    "6":"5",
    "7":"7",
    "8":"7",
    "9":"8"
  },
  "R": {
    "1":"2",
    "2":"3",
    "3":"3",
    "4":"5",
    "5":"6",
    "6":"6",
    "7":"8",
    "8":"9",
    "9":"9"
  }
};

var moves2 =
{
  "U": {
    "1":"1",
    "2":"2",
    "3":"1",
    "4":"4",
    "5":"5",
    "6":"2",
    "7":"3",
    "8":"4",
    "9":"9",
    "A":"6",
    "B":"7",
    "C":"8",
    "D":"B"
  },
  "D": {
    "1":"3",
    "2":"6",
    "3":"7",
    "4":"8",
    "5":"5",
    "6":"A",
    "7":"B",
    "8":"C",
    "9":"9",
    "A":"A",
    "B":"D",
    "C":"C",
    "D":"D"
  },
  "L": {
    "1":"1",
    "2":"2",
    "3":"2",
    "4":"3",
    "5":"5",
    "6":"5",
    "7":"6",
    "8":"7",
    "9":"8",
    "A":"A",
    "B":"A",
    "C":"B",
    "D":"D"
  },
  "R": {
    "1":"1",
    "2":"3",
    "3":"4",
    "4":"4",
    "5":"6",
    "6":"7",
    "7":"8",
    "8":"9",
    "9":"9",
    "A":"B",
    "B":"C",
    "C":"C",
    "D":"D"
  }
};



main();


function main(){
 var current = "5";
 var code = [];
 var lines = input.split("\n");
 for(var i=0;i<lines.length;i++){
   for(var j=0;j<lines[i].length;j++){
     var move = lines[i].substr(j,1);
     current = executeMove(current, move);
   }
   code.push(current);
 }
 
 $.writeln("Code: "+code);
}

function executeMove(currentPosition, move){
  return puzzle==1 ? moves1[move][currentPosition] : moves2[move][currentPosition] ;
}
