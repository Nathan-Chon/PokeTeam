var search = document.querySelector('.search-icon');
var searchInput = document.querySelector('.search');
var $imageName = document.querySelector('.img-name');

search.addEventListener('click', function (event) {
  event.preventDefault();
  var input = searchInput.value;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + input);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      var $imageTitle = document.createElement('h2');
      $imageTitle.setAttribute('class', 'image-title');
      $imageTitle.textContent = input;
      $imageName.appendChild($imageTitle);
      var $addButton = document.createElement('i');
      $addButton.setAttribute('class', 'fa-solid fa-plus fa-2x add-image-icon');
      $imageName.appendChild($addButton);
      var $image = document.createElement('img');
      $image.setAttribute('class', 'search-img');
      $image.setAttribute('src', xhr.response.sprites.front_default);
      $imageName.appendChild($image);
      var $addButtonListener = document.querySelector('.add-image-icon');
      $addButtonListener.addEventListener('click', function (event) {
        data.entries.push(xhr.response);
      });
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
