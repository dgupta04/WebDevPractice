//Extract DOM elements

var inp = document.getElementById('inp');
var btn = document.getElementById('btn');
var res = document.getElementById('result');


var count = 0;
var todoList = {};
var id;
refresh();

btn.onclick = addTodo; // onclikc takes a function definition

function addTodo(){
	count++;
	id = "todo" + count;
	console.log(id);
	var value = inp.value; // do not do this outside the function else it is empty when the page loads and remains the same way.
	// value = '<li>' + value + '</li>'
	// res.innerHTML = value;
	var li = document.createElement('li');
	var delBtn = document.createElement('button');
	var updateBtn = document.createElement('button');
	var updateTxt = document.createElement('input');
	updateTxt.type = "text";
	updateTxt.id = "updateTxt" + id;
	// updateTxt.style.visibility = "hidden";
	li.id = id;	
	// li.style.display = "inline";
	li.style.marginTop = "20px";
	delBtn.id = "del" + id;
	delBtn.innerText = "Delete"
	delBtn.onclick = deleteItem(id);
	updateBtn.id = 'update' + id;
	updateBtn.innerText = "Update"
	// updateBtn.onclick= updateTodo(id);
	todoList[id] = value;
	localStorage.setItem('taskList', JSON.stringify(todoList));
	localStorage.setItem('count', JSON.stringify(count));
	li.innerText = value;
	res.appendChild(li);
	li.appendChild(updateTxt);
	// res.appendChild(updateTxt);
	res.appendChild(delBtn);
	res.appendChild(updateBtn);
	updateBtn.onclick = update(id);
	
}

// btn.onclick = addTodo; // onclikc takes a function definition

function refresh(){
	res.innerHTML = "";
	todoList = JSON.parse(localStorage.getItem('taskList')) || {};
	count = JSON.parse(localStorage.getItem('count'));
	for(let key in todoList){
		var val = todoList[key];
		var li = document.createElement('li');
		li.innerText = val;
		res.appendChild(li);
		var delBtn = document.createElement('button');
		var updateBtn = document.createElement('button');
		var updateTxt = document.createElement('input');
		updateTxt.type = "text";
		updateTxt.id = "updateTxt" + key;	
		// updateTxt.style.visibility = "hidden";
		li.appendChild(updateTxt);
		li.id = key;
		li.style.marginTop = "20px";
		delBtn.id = "del" + key;
		delBtn.innerText = "Delete"
		delBtn.onclick = deleteItem(key);
		updateBtn.id = 'update' + key;
		updateBtn.innerText = "Update"
		updateBtn.onclick = update(key);
		res.appendChild(delBtn);
		res.appendChild(updateBtn);
		
	}
}

function deleteItem(delKey) {
	return function(){
	delete todoList[delKey];
	localStorage.setItem('taskList', JSON.stringify(todoList));
	refresh();
	}
}

function update(updateKey){
	return function(){
		var updateVal = document.getElementById("updateTxt" + updateKey);
		var newTxt = updateVal.value;
		if(newTxt === ""){
			alert("Add something to update!");
			refresh();
			return;
		}
		todoList[updateKey] = newTxt;
		localStorage.setItem('taskList', JSON.stringify(todoList));
		refresh();
	}
}