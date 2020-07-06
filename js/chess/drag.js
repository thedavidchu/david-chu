// Drag and drop icons

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev){
 	ev.dataTransfer.setData("img", ev.target.id);
}

function drop(ev){
	ev.preventDefault();								// Allow drop
	var data = ev.dataTransfer.getData("img");			// "img" or "text"
	console.log(data);
	ev.target.appendChild(document.getElementById(data));
}