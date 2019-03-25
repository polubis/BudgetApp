// Arrays methods shorthands 

// Reduce 

const exampleArray = [2,3,5,8,10];

function reduceExample() {
  return exampleArray.reduce((prev, next) => {
    return prev + next;
  });
}

const reduceResult = reduceExample();
// console.log(reduceResult);

// podanie argumentu definiuje wartosc startowa + 1 iteracja
// nie podanie argumentu powoduje rozpoczecie od 1 argumentu tablicy


// Array.from

const newArray = Array.from({length: 5}).fill(0);

const newArraySecond = new Array(5).fill(0);

const newArrayThird = Array.from({length: 5}, (v, k) => k++);

function createArrayFromArgs() {
  return Array.from(arguments);
}

const createArrayFromArgsArrow = (...params) => {
  return Array.from(params);
}

function addNumbers(x, y){
  if (arguments.length == addNumbers.length) {
     return (x + y);
  }
  else
     return 0;
}


// console.log(newArray, newArraySecond, newArrayThird);

// Array some

// Przeszukiwanie tablicy w celu sprawzenia czy cos w niej jest zwraca true/false

const somedArray = exampleArray.some((value) => value > 100);

console.log(somedArray);



