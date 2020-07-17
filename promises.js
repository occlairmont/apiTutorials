// setTimeout(() => console.log('this is test of timesout!'), 1000);

let promise = new Promise(function(resolve, reject){
    setTimeout (() => {
        if (false){
            resolve('success');
        } else {
            reject ('failure');
        }
    }, 3000);
})

promise
  .then(blah => console.log(blah)) //blah = 'success'
  .catch(err => console.log(err)); //err = 'failure'

console.log('this code is after our promise & .then chain!');
function playFunc(){
    return 5;
}

console.log(playFunc());