let starWarsPeopleList = document.querySelector('ul');

fetch('https://swapi.dev/api/people')
  .then(function(response){
      return response.json();
  })
  .then(function(json){
      let people = json.results;

      for(p of people){
          let listItem = document.createElement('li');
          listItem.innerHTML = '<p>' + p.name + '</p>';
          starWarsPeopleList.appendChild(listItem);
      }
  })

fetch('https://swapi.dev/api/planets')
  .then(function(response){
      return response.json();
  })
  .then(function(json){
      let planets = json.results;

      for(pt of planets){
          let listItem = document.createElement('li');
          listItem.innerHTML = '<p>' + pt.climate + '</p>';
          starWarsPeopleList. appendChild(listItem);
      }
  })