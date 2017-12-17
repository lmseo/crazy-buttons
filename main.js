//run Crazy function by passing a string selector 
var c = C$('.centeBtn').get();
//var c = C$().crazyButtons('.wrapper',101 ).setSelector('.centeBtn');
//c.log();
//var b = c.setSelector('.lol');
console.log(typeof c);
for (const prop in c) {
  console.log(`c.${prop} = ${c[prop]}`);
}





