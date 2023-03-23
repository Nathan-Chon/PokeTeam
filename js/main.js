var search = document.querySelector('.search-icon');
var searchInput = document.querySelector('.search');
var $imageName = document.querySelector('.img-name');
var $searchAddMember = document.querySelector('.search-add-member');
var dataResponse;
var $partyMembers = document.querySelector('.party-members');
var $partyNone = document.querySelector('.party-none');
var removalItem;
var $invalidSearch = document.querySelector('.invalid-search');

search.addEventListener('click', function (event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  var input = searchInput.value;
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + input);
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    dataResponse = xhr.response;
    if (xhr.status === 200) {
      $imageName.replaceChildren();
      $invalidSearch.classList.add('hidden');
      $searchAddMember.classList.remove('hidden');
      pokemonAdd(xhr.response);
      searchInput.value = '';
    } else {
      $imageName.replaceChildren();
      $invalidSearch.classList.remove('hidden');
      searchInput.value = '';
    }
  });
  xhr.send();
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

  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', 'https://pokeapi.co/api/v2/pokemon-species/' + event.id);
  xhr2.responseType = 'json';
  xhr2.addEventListener('load', function () {
    var $description = document.createElement('p');
    $description.setAttribute('class', 'description');
    for (var i = 0; i < xhr2.response.flavor_text_entries.length; i++) {
      if (xhr2.response.flavor_text_entries[i].language.name === 'en') {
        var descriptionText = xhr2.response.flavor_text_entries[i].flavor_text;
      }
    }
    var descriptionText2 = descriptionText.replace('\f', '');
    var descriptionText3 = descriptionText2.replace('POKéMON', 'Pokémon');
    var descriptionText4 = descriptionText3.replace(event.forms[0].name.toUpperCase(), event.forms[0].name.charAt(0).toUpperCase() + event.forms[0].name.slice(1));
    $description.textContent = descriptionText4;
    $imageName.appendChild($description);
  });
  xhr2.send();
}

$imageName.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.tagName === 'I') {
    var $div = event.target.closest('div');
    $div.replaceChildren();
    $searchAddMember.classList.add('hidden');
    var pokemon = dataResponse;
    pokemon.pkmnimage = dataResponse.sprites.front_default;
    data.entries.push(pokemon);
    $partyMembers.replaceChildren();
    renderPokemon(data.entries);
  }
});

function renderPokemon(entry) {
  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $partyMembers.appendChild($row);
  for (var h = 0; h < data.entries.length; h++) {
    if (h % 2 === 0) {
      var $columnHalf2 = document.createElement('div');
      $columnHalf2.setAttribute('class', 'column-half');
      $row.appendChild($columnHalf2);

      var $pokemonGroup2 = document.createElement('div');
      $pokemonGroup2.setAttribute('class', 'pokemon-group');
      $columnHalf2.appendChild($pokemonGroup2);
      var $newTitle2 = document.createElement('h2');
      $newTitle2.setAttribute('class', 'new-title');
      $newTitle2.textContent = entry[h].forms[0].name;
      $pokemonGroup2.appendChild($newTitle2);

      var $addButton = document.createElement('i');
      $addButton.setAttribute('class', 'fa-solid fa-minus fa-2x remove-image-icon');
      $pokemonGroup2.appendChild($addButton);

      var $addStar = document.createElement('i');
      $addStar.setAttribute('class', 'fa-regular fa-star star-icon');

      if (entry[h].pkmnimage === entry[h].sprites.front_default) {
        $addStar.setAttribute('class', 'fa-regular fa-star star-icon');
      } else if (entry[h].pkmnimage === entry[h].sprites.front_shiny) {
        $addStar.setAttribute('class', 'fa-solid fa-star star-icon');
      }

      $pokemonGroup2.appendChild($addStar);

      var $newImage2 = document.createElement('img');
      $newImage2.setAttribute('class', 'new-image');
      $newImage2.setAttribute('src', entry[h].pkmnimage);
      $pokemonGroup2.appendChild($newImage2);

      var $extraInfo2 = document.createElement('i');
      $extraInfo2.setAttribute('class', 'fa-sharp fa-solid fa-circle-info info-circle');
      $pokemonGroup2.appendChild($extraInfo2);

      var $abilitiesTitle2 = document.createElement('p');
      $abilitiesTitle2.setAttribute('class', 'ability-title');
      $abilitiesTitle2.textContent = 'Abilities:';
      $pokemonGroup2.appendChild($abilitiesTitle2);

      var $abilities2 = document.createElement('p');
      for (var j = 0; j < entry[h].abilities.length; j++) {
        $abilities2.textContent += entry[h].abilities[j].ability.name + ' ';
      }
      $abilities2.setAttribute('class', 'abilities');
      $pokemonGroup2.appendChild($abilities2);

      var $typeTitle2 = document.createElement('p');
      $typeTitle2.setAttribute('class', 'type-title');
      $typeTitle2.textContent = 'Type:';
      $pokemonGroup2.appendChild($typeTitle2);
      var $type2 = document.createElement('p');
      for (var k = 0; k < entry[h].types.length; k++) {
        $type2.textContent += entry[h].types[k].type.name + ' ';
      }
      $type2.setAttribute('class', 'types');
      $pokemonGroup2.appendChild($type2);

      var $moveAndLevel2 = document.createElement('div');
      $moveAndLevel2.setAttribute('class', 'move-and-level');
      $pokemonGroup2.appendChild($moveAndLevel2);

      var $levelTitle2 = document.createElement('p');
      $levelTitle2.setAttribute('class', 'level-title');
      $levelTitle2.textContent = 'Level:';
      $moveAndLevel2.appendChild($levelTitle2);
      var $moveTitle2 = document.createElement('p');
      $moveTitle2.setAttribute('class', 'move-title');
      $moveTitle2.textContent = 'Moves:';
      $moveAndLevel2.appendChild($moveTitle2);

      var $moves2 = document.createElement('p');
      $moves2.setAttribute('class', 'moves');
      var array2 = [];
      for (var i = 0; i < entry[h].moves.length; i++) {
        if (entry[h].moves[i].version_group_details[0].level_learned_at > 0) {
          array2.push({ name2: entry[h].moves[i].move.name, level2: entry[h].moves[i].version_group_details[0].level_learned_at });
        }
      }
      array2.sort(function (a, b) {
        return a.level2 - b.level2;
      });
      for (var l = 0; l < array2.length; l++) {
        var $moveHolder2 = document.createElement('div');
        $moveHolder2.setAttribute('class', 'move-holder-container');
        var $level2 = document.createElement('div');
        var $name2 = document.createElement('div');
        $level2.textContent = array2[l].level2;
        $name2.textContent = array2[l].name2;
        $moveHolder2.appendChild($level2);
        $moveHolder2.appendChild($name2);
        $moves2.appendChild($moveHolder2);
      }
      $pokemonGroup2.appendChild($moves2);
    } else if (h % 2 === 1) {

      var $columnHalf = document.createElement('div');
      $columnHalf.setAttribute('class', 'column-half');
      $row.appendChild($columnHalf);

      var $pokemonGroup = document.createElement('div');
      $pokemonGroup.setAttribute('class', 'pokemon-group');
      $columnHalf.appendChild($pokemonGroup);
      var $newTitle = document.createElement('h2');
      $newTitle.setAttribute('class', 'new-title');
      $newTitle.textContent = entry[h].forms[0].name;
      $pokemonGroup.appendChild($newTitle);

      var $addButton2 = document.createElement('i');
      $addButton2.setAttribute('class', 'fa-solid fa-minus fa-2x remove-image-icon');
      $pokemonGroup.appendChild($addButton2);

      var $addStar2 = document.createElement('i');
      if (entry[h].pkmnimage === entry[h].sprites.front_default) {
        $addStar2.setAttribute('class', 'fa-regular fa-star star-icon');
      } else if (entry[h].pkmnimage === entry[h].sprites.front_shiny) {
        $addStar2.setAttribute('class', 'fa-solid fa-star star-icon');
      }
      $pokemonGroup.appendChild($addStar2);

      var $newImage = document.createElement('img');
      $newImage.setAttribute('class', 'new-image');
      $newImage.setAttribute('src', entry[h].pkmnimage);
      $pokemonGroup.appendChild($newImage);

      var $extraInfo = document.createElement('i');
      $extraInfo.setAttribute('class', 'fa-sharp fa-solid fa-circle-info info-circle');
      $pokemonGroup.appendChild($extraInfo);

      var $abilitiesTitle = document.createElement('p');
      $abilitiesTitle.setAttribute('class', 'ability-title');
      $abilitiesTitle.textContent = 'Abilities:';
      $pokemonGroup.appendChild($abilitiesTitle);
      var $abilities = document.createElement('p');
      for (var m = 0; m < entry[h].abilities.length; m++) {
        $abilities.textContent += entry[h].abilities[m].ability.name + ' ';
      }
      $abilities.setAttribute('class', 'abilities');
      $pokemonGroup.appendChild($abilities);

      var $typeTitle = document.createElement('p');
      $typeTitle.setAttribute('class', 'type-title');
      $typeTitle.textContent = 'Type:';
      $pokemonGroup.appendChild($typeTitle);
      var $type = document.createElement('p');
      for (var n = 0; n < entry[h].types.length; n++) {
        $type.textContent += entry[h].types[n].type.name + ' ';
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
      for (var o = 0; o < entry[h].moves.length; o++) {
        if (entry[h].moves[o].version_group_details[0].level_learned_at > 0) {
          array1.push({ name: entry[h].moves[o].move.name, level: entry[h].moves[o].version_group_details[0].level_learned_at });
        }
      }
      array1.sort(function (c, d) {
        return c.level - d.level;
      });
      for (var p = 0; p < array1.length; p++) {
        var $moveHolder = document.createElement('div');
        $moveHolder.setAttribute('class', 'move-holder-container');
        var $level = document.createElement('div');
        var $name = document.createElement('div');
        $level.textContent = array1[p].level;
        $name.textContent = array1[p].name;
        $moveHolder.appendChild($level);
        $moveHolder.appendChild($name);
        $moves.appendChild($moveHolder);
      }
      $pokemonGroup.appendChild($moves);
    }
  }
}
document.addEventListener('DOMContentLoaded', function (event) {
  if (data.entries.length > 0) {
    $partyMembers.replaceChildren();
    $partyNone.classList.add('hidden');
    renderPokemon(data.entries);
  } else if (data.entries.length === 0) {
    $partyNone.classList.remove('hidden');
  }
  viewSwap(data.view);
});

var $view = document.querySelectorAll('.view');
function viewSwap(screenChange) {
  data.view = screenChange;
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === screenChange) {
      $view[i].classList.remove('hidden');
    } else {
      $view[i].classList.add('hidden');
    }
  }
}

var searchButton = document.querySelector('.nav-search');
var partyButton = document.querySelector('.nav-party');

searchButton.addEventListener('click', function (event) {
  viewSwap('search-form');
});

partyButton.addEventListener('click', function (event) {
  viewSwap('party-form');
  if (data.entries.length > 0) {
    $partyNone.classList.add('hidden');
  } else if (data.entries.length === 0) {
    $partyNone.classList.remove('hidden');
  }
});
var $moreInfo = document.querySelector('.more-info');
var $backgroundInfo = document.querySelector('.background-info');

document.addEventListener('click', function (event) {
  if (event.target.className === 'fa-solid fa-minus fa-2x remove-image-icon') {
    var $deleteFunction = document.querySelector('.delete-function');
    $deleteFunction.classList.remove('hidden');
    removalItem = event.target.closest('div').parentElement;
  } else if (event.target.className === 'fa-regular fa-star star-icon') {
    var starItem = event.target.closest('div').firstChild.innerHTML;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].species.name === starItem) {
        event.target.nextSibling.setAttribute('src', data.entries[i].sprites.front_shiny);
        data.entries[i].pkmnimage = data.entries[i].sprites.front_shiny;
      }
    }
    event.target.setAttribute('class', 'fa-solid fa-star star-icon');
  } else if (event.target.className === 'fa-solid fa-star star-icon') {
    var starItem2 = event.target.closest('div').firstChild.innerHTML;
    for (var j = 0; j < data.entries.length; j++) {
      if (data.entries[j].species.name === starItem2) {
        event.target.nextSibling.setAttribute('src', data.entries[j].sprites.front_default);
        data.entries[j].pkmnimage = data.entries[j].sprites.front_default;
      }
    }
    event.target.setAttribute('class', 'fa-regular fa-star star-icon');
  }
});

document.addEventListener('click', function (event) {
  if (event.target.className === 'fa-sharp fa-solid fa-circle-info info-circle') {
    var starItem3 = event.target.closest('div').firstChild.innerHTML;
    for (var k = 0; k < data.entries.length; k++) {
      if (data.entries[k].species.name === starItem3) {
        $moreInfo.classList.remove('hidden');

        var $infoTitle = document.createElement('h3');
        $infoTitle.setAttribute('class', 'info-title');
        $infoTitle.textContent = data.entries[k].forms[0].name;
        $backgroundInfo.appendChild($infoTitle);
        var $infoStats = document.createElement('p');
        $infoStats.setAttribute('class', 'info-stats');
        $infoStats.textContent = 'Base Stats';
        $backgroundInfo.appendChild($infoStats);
        var $hideButton = document.createElement('i');
        $hideButton.setAttribute('class', 'fa-solid fa-x remove-button');
        $backgroundInfo.appendChild($hideButton);
        var $statHolder = document.createElement('div');
        $statHolder.setAttribute('class', 'stat-holder');
        for (var l = 0; l < data.entries[k].stats.length; l++) {
          var $stat = document.createElement('div');
          $stat.setAttribute('class', 'stat');
          var $statType = document.createElement('div');
          $statType.setAttribute('class', 'stat-type');
          var $value = document.createElement('div');
          $value.setAttribute('class', 'value-type');
          $statType.textContent = data.entries[k].stats[l].stat.name;
          $value.textContent = data.entries[k].stats[l].base_stat;
          $stat.appendChild($statType);
          $stat.appendChild($value);
          $statHolder.appendChild($stat);

        }
        $backgroundInfo.appendChild($statHolder);
      }
    }
  } else if (event.target.className === 'fa-solid fa-x remove-button') {
    $moreInfo.classList.add('hidden');
    $backgroundInfo.replaceChildren();
  }
});

var $cancel = document.querySelector('.cancel');
var $confirm = document.querySelector('.confirm');

$cancel.addEventListener('click', function (event) {
  var $deleteFunction = document.querySelector('.delete-function');
  $deleteFunction.classList.add('hidden');
});

$confirm.addEventListener('click', function (event) {
  var removalItem2 = removalItem.firstChild;
  var removalItem3 = removalItem2.firstChild.innerHTML;
  var updatedArray = [];
  removalItem.remove();
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].species.name !== removalItem3) {
      updatedArray.push(data.entries[i]);
    }
  }
  data.entries = updatedArray;
  var $deleteFunction = document.querySelector('.delete-function');
  $deleteFunction.classList.add('hidden');
  if (data.entries.length === 0) {
    $partyNone.classList.remove('hidden');
  }
});
