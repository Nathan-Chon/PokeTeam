var search = document.querySelector('.search-icon');
var searchInput = document.querySelector('.search');
var $imageName = document.querySelector('.img-name');
var $searchAddMember = document.querySelector('.search-add-member');
var dataResponse;

search.addEventListener('click', function (event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  var input = searchInput.value;
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + input);
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    dataResponse = xhr.response;
    if (xhr.status === 200) {
      $searchAddMember.classList.remove('hidden');
      pokemonAdd(xhr.response);
      searchInput.value = '';
    }
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

function pokemonAdd(event) {
  var $imageTitle = document.createElement('h2');
  $imageTitle.setAttribute('class', 'image-title');
  $imageTitle.textContent = searchInput.value;
  $imageName.appendChild($imageTitle);
  var $addButton = document.createElement('i');
  $addButton.setAttribute('class', 'fa-solid fa-plus fa-2x add-image-icon');
  $imageName.appendChild($addButton);
  var $image = document.createElement('img');
  $image.setAttribute('class', 'search-img');
  $image.setAttribute('src', event.sprites.front_default);
  $imageName.appendChild($image);
}

$imageName.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    var $div = event.target.closest('div');
    $div.firstChild.nextSibling.remove();
    $div.firstChild.nextSibling.remove();
    $div.firstChild.nextSibling.remove();
    $searchAddMember.classList.add('hidden');
    data.entries.push(dataResponse);
  }
});
