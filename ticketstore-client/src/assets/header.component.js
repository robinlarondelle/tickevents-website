$('#form').submit(function(e) {
  e.preventDefault();
  // Coding
  $('#loginModal').modal('toggle'); //or  $('#IDModal').modal('hide');
  return false;
});