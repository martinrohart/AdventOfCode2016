var fs = require('fs');
var input="";
var puzzle = 1;

var inputtest ="abcdefghjb-1[a]";

fs.readFile('input-day4.txt', (err, stream) => {
    input = stream.toString();
    main();
});


function main(){
    var nbCorrects = 0;
    var sum = 0;

    var rooms = input.split("\n");
    var regex = /^([a-z\-]+)-(\d+).([a-z]+).$/
    for(var room of rooms){
        var r = room.match(regex);
        if(r!=null && r.length==4){

            var name = r[1];
            var sectorId = parseInt(r[2]);
            var checksum = r[3];
            //console.log("Name: "+name+" , sector ID: "+sectorId+", checksum: "+checksum);

            if(computeChecksum(name)==checksum){
                sum = sum+sectorId;
                nbCorrects++;

                var realName = decryptName(name, sectorId);
                if(realName.indexOf("northpole")>=0){
                    console.log(realName + " id "+ sectorId);
                }
            }
        }
    }
    console.log("Correct rooms: "+nbCorrects+" of total "+rooms.length);
    console.log("Sum sector IDs: "+sum);
}

function decryptName(name, sectorId)
{
    var letters = name.split('');
    var rotation = (sectorId%26);

    var decrypted = letters.map(function(value, index, self){
        if(value=="-"){
            return " ";
        }else{
            var charcode = 'a'.charCodeAt(0) + ( ((value.charCodeAt() - 'a'.charCodeAt(0)) + rotation) % 26);
            return String.fromCharCode(charcode);
        }
    });

    return decrypted.join('');
}

function computeChecksum(name)
{
    var letters = name.split('').filter(function(c){return c!=='-'});

    var count = {};
    for(var letter of letters){
        count[letter] = (count[letter] | 0 ) + 1;
    }

    var unique = letters.filter(function(value, index, self) { 
        return self.indexOf(value) === index;
    });

    var sorted = unique.sort(function(a,b){
        if( count[a] == count[b]){
            return  a.charCodeAt(0) - b.charCodeAt(0)
        }else{
            return count[b]-count[a];
        }
    });

    checksum = sorted.slice(0,5).join('');
    //console.log(name +" checksum is "+checksum);
    return checksum;
}