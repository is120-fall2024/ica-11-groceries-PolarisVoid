// JavaScript code goes here
let groceryItems = [];

function addItem() {
	const item = document.getElementById("grocery-item").value;
	const quantity = document.getElementById("grocery-quantity").value;
	const price = document.getElementById("grocery-price").value;
	const category = document.getElementById("grocery-category").value;
	if (item === "" || quantity === "" || price === "" || category === "") {
		alert("Please enter all fields");
		return;
	}
	groceryItems.push({ item: item, quantity: quantity, price: price, category: category, checked: false });
	displayItems();
	UpdateCount();
	document.getElementById("grocery-item").value = "";
	document.getElementById("grocery-quantity").value = "";
	document.getElementById("grocery-price").value = "";
	document.getElementById("grocery-category").value = "";
}

function displayItems() {
	const groceryList = document.getElementById("grocery-list");
	groceryList.innerHTML = "";
	groceryItems.forEach((item) => {
		const li = document.createElement("li");
		const div = document.createElement("div");
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = item.checked;
		checkbox.addEventListener("change", () => {
			item.checked = checkbox.checked;
			UpdateCount();
		})
		div.appendChild(checkbox);
		const span = document.createElement("span");
		span.textContent = `${item.item} - ${item.quantity} - $${item.price} - ${item.category}`;
		let itemPrice = item.quantity * item.price;
		if (itemPrice > 15) {
			span.style.color = "red";
		}
		else if (itemPrice > 10) {
			span.style.color = "orange";
		}
		else if (itemPrice > 5) {
			span.style.color= "yellow";
		}
		div.appendChild(span);
		li.appendChild(div);
		groceryList.appendChild(li);
	});
}

function UpdateCount() {
	document.getElementById("totalCount").textContent = groceryItems.filter(
		(item) => !item.checked
	).length;
	updatePrice();
}

function updatePrice() {
	let total = 0;
	groceryItems.forEach((item) => {
		if (!item.checked) {
			total += item.price * item.quantity;
		}
	});
	document.getElementById("price").textContent = total;
	if (total > 100) {
		document.getElementById("totalPrice").textContent = "You are spending too much money!";
		document.getElementById("totalPrice").style.color = "red";
	}
}

uncheck = true;

function toggleCheck() {
	groceryItems.forEach((item) => {
		item.checked = uncheck;
	});
	uncheck = !uncheck;
	if (uncheck) {
		document.getElementById("checkButton").textContent = "Check All";
	}
	else {
		document.getElementById("checkButton").textContent = "Uncheck All";
	}
	displayItems();
	UpdateCount();
}

function clearAllBought() {
	groceryItems = groceryItems.filter((item) => !item.checked);
	displayItems();
	UpdateCount();
}