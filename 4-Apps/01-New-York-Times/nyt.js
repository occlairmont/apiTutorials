const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = '7fKnCIh1G3JeLqhb2lHkMjDNAqBoM0iL'; 
let url;

const searchTerm = document.querySelector('.search'); //querySelector affects the first tag with that class; querySelectorAll affect all tags with the same class. 
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');
const section = document.querySelector('section');

nav.style.display = 'none'; //not giving a style to nav display

let pageNumber = 0;//
let displayNav = false;
// console.log('PageNumber:', pageNumber); 

searchForm.addEventListener('submit', fetchResults); // when submit is selected, it get information from fetchResults
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

function fetchResults(e) {
  // console.log(e);
  e.preventDefault();//prevents form from always refreshing page when clicking submit.**
  url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}`;//combines elements into url
  console.log('URL:', url);

  if (startDate.value !== '') {
    console.log(startDate.value)
    url += '&begin_date=' + startDate.value;//'&begin_date=' + startDate.value is added to url string
  }// if start date is empty 

  if (endDate.value !== '') {
    console.log(endDate.value)
    url += '&end_date=' + endDate.value;
  }

  fetch(url) //takes url 
    .then(function(result) {
      console.log(result)
      return result.json();//and get information and provides results/response into a json
    })
    .then(function(json) {
      console.log(json);
      displayResults(json);//any data you received from fetch, always put in second '.then'.
    })
}

function displayResults(json) {
  while (section.firstChild) {//while statement is also a loop.
    section.removeChild(section.firstChild);
  }//while there's a child in the section tag, removed it so it's like it wasn't there.

  let articles = json.response.docs;

  if (articles.length === 0) {//article.length = the total items in array
    console.log('No results');//if it strictly equals 0 then print 'No results'
  } else {
    for (let i = 0; i < articles.length; i++) {
      let article = document.createElement('article');
      let heading = document.createElement('h2');
      let link = document.createElement('a');
      let img = document.createElement('img');
      let para = document.createElement('p');
      let clearfix = document.createElement('div');

      let current = articles[i];
      console.log('Current:', current);//up to here, loops through articles

      link.href = current.web_url;
      console.log(link);
      link.textContent = current.headline.main;

      para.textContent = 'Keywords: ';

      for (let j = 0; j < current.keywords.length; j++) {
        let span = document.createElement('span');
        span.textContent += current.keywords[j].value + ' ';
        para.appendChild(span);
      }

      if (current.multimedia.length > 0) {
        img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
        img.alt = current.headline.main;
      }

      clearfix.setAttribute('class', 'clearfix');

      article.appendChild(heading);
      heading.appendChild(link);
      article.appendChild(img);
      article.appendChild(para);
      article.appendChild(clearfix);
      section.appendChild(article);
    }
  }

  if (articles.length === 10) {
    nav.style.display = 'block';
  } else {
    nav.style.display = 'none';
  }
}

function nextPage(e) {
  pageNumber++;
  fetchResults(e);
  console.log('Page Number:', pageNumber);
}

function previousPage(e) {
  if (pageNumber > 0) {
    pageNumber--;
    fetchResults(e);
  } else {
    return;
  }
  fetchResults(e);
  console.log('Page:', pageNumber);
}









