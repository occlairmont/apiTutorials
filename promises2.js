// fetch('http:/taco-randomizer.herokuapp.com/random/?full-taco=true')
//     .then(res => res.json())
//     .then(json => console.log(json));

function slowResult(){
    fetch('http:/taco-randomizer.herokuapp.com/random/?full-taco=true')
        .then(res => res.json())
        .then(json => console.log(json))
    console.log('This is a message!')
}

slowResult();