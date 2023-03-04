var search = document.querySelector('.search-icon');
var searchInput = document.querySelector('.search');
var $imageName = document.querySelector('.img-name');
var $searchAddMember = document.querySelector('.search-add-member');
var dataResponse;
var $partyMembers = document.querySelector('.party-members');

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
    renderPokemon(data.entries[4]);
  }
});

function renderPokemon(entry) {

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $partyMembers.appendChild($row);

  var $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf);

  var $pokemonGroup = document.createElement('div');
  $pokemonGroup.setAttribute('class', 'pokemon-group');
  $columnHalf.appendChild($pokemonGroup);
  var $newTitle = document.createElement('h2');
  $newTitle.setAttribute('class', 'new-title');
  $pokemonGroup.appendChild($newTitle);
  var $newImage = document.createElement('img');
  $newImage.setAttribute('class', 'new-image');
  $newImage.setAttribute('src', entry.sprites.front_default);
  $pokemonGroup.appendChild($newImage);

  var $abilitiesTitle = document.createElement('p');
  $abilitiesTitle.setAttribute('class', 'ability-title');
  $abilitiesTitle.textContent = 'Abilities:';
  $pokemonGroup.appendChild($abilitiesTitle);
  var $abilities = document.createElement('p');
  for (var j = 0; j < entry.abilities.length; j++) {
    $abilities.textContent += entry.abilities[j].ability.name + ' ';
  }
  $abilities.setAttribute('class', 'abilities');
  $pokemonGroup.appendChild($abilities);

  var $typeTitle = document.createElement('p');
  $typeTitle.setAttribute('class', 'type-title');
  $typeTitle.textContent = 'Type:';
  $pokemonGroup.appendChild($typeTitle);
  var $type = document.createElement('p');
  for (var k = 0; k < entry.types.length; k++) {
    $type.textContent += entry.types[k].type.name + ' ';
  }
  $type.setAttribute('class', 'types');
  $pokemonGroup.appendChild($type);

  var $moveAndLevel = document.createElement('div');
  $moveAndLevel.setAttribute('class', 'move-and-level');
  $pokemonGroup.appendChild($moveAndLevel);

  var $levelTitle = document.createElement('p');
  $levelTitle.setAttribute('class', 'level-title');
  $levelTitle.textContent = 'Level:';
  $moveAndLevel.appendChild($levelTitle);
  var $moveTitle = document.createElement('p');
  $moveTitle.setAttribute('class', 'move-title');
  $moveTitle.textContent = 'Moves:';
  $moveAndLevel.appendChild($moveTitle);

  var $moves = document.createElement('p');
  $moves.setAttribute('class', 'moves');
  var array1 = [];
  for (var l = 0; l < entry.moves.length; l++) {
    if (entry.moves[l].version_group_details[0].level_learned_at > 0) {
      array1.push({ name: entry.moves[l].move.name, level: entry.moves[l].version_group_details[0].level_learned_at });
    }
  }
  array1.sort(function (a, b) {
    return a.level - b.level;
  });
  for (var i = 0; i < array1.length; i++) {
    // outer div
    var $moveHolder = document.createElement('div');
    $moveHolder.setAttribute('class', 'move-holder-container');
    var $level = document.createElement('div');
    var $name = document.createElement('div');
    $level.textContent = array1[i].level;
    $name.textContent = array1[i].name;
    $moveHolder.appendChild($level);
    $moveHolder.appendChild($name);
    $moves.appendChild($moveHolder);
  }
  $pokemonGroup.appendChild($moves);
}

// console.log(renderPokemon(data.entries[4]));
