var modal = document.getElementById("modal-deletion");
var cancel = document.getElementsByClassName("cancel")[0];

// Open popup by default
modal.style.display = "block";

// Closing of modal
cancel.onclick = function() {
  history.back();
}