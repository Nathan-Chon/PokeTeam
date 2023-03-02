/* exported data */
var data = {
  entries: [],
  view: ''
};

window.addEventListener('beforeunload', function (event) {
  var formJSON = JSON.stringify(data);
  localStorage.setItem('party-local-storage', formJSON);
});

var dataInJSON = localStorage.getItem('party-local-storage');
if (dataInJSON !== null) {
  data = JSON.parse(dataInJSON);
}
