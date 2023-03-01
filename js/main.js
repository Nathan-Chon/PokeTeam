var search = document.querySelector('.search-icon');
var searchInput = document.querySelector('.search');

search.addEventListener('click', function (event) {
  event.preventDefault();
  var input = searchInput.value;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + input);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log('xhr.status', xhr.status);
    // console.log('xhr.repsonse', xhr.response);
  });
  xhr.send();
});

var searchTab = document.querySelector('.search-tab');
var partyTab = document.querySelector('.party-tab');
var searchButton = document.querySelector('.nav-search');
var partyButton = document.querySelector('.nav-party');

searchButton.addEventListener('click', function (event) {
  searchTab.classList.remove('hidden');
  partyTab.classList.add('hidden');
});

partyButton.addEventListener('click', function (event) {
  searchTab.classList.add('hidden');
  partyTab.classList.remove('hidden');
});
