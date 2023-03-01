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
