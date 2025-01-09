const inputItem = document.getElementById("item-input");
const form = document.getElementById("item-form");
const lists = document.getElementById("item-list");
const clear = document.getElementById("clear");
const filter = document.getElementById("filter");
const hiddenText = document.getElementById("hiddenText");
let isEditMode = false;
const formBtn = form.querySelector('button')

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => {
    addItemToDom(item);
    clearUI();
  });
}

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = inputItem.value.trim(); // Trim to avoid extra whitespace
  if (newItem === "") {
    alert("Please Input your List!");
    return;
  }



  if (isEditMode) {
    const itemToEdit = lists.querySelector('.edit-mode')
    removeItemfromStorage(itemToEdit.textContent)
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;

  } else {
    if (checkItem(newItem)) {
      alert("Item already on the list")
      inputItem.classList.add('.red-border')
      return;
    } else {
      inputItem.classList.remove('red-border')
    }
  }
  // Add the item to the DOM and storage
  addItemToDom(newItem);
  addItemToStorage(newItem);

  // Clear the input field and update the UI
  clearUI();
  inputItem.value = "";
}

function checkItem(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item)
}


function addItemToDom(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  lists.appendChild(li);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function createButton(classes) {
  const btn = document.createElement("button");
  btn.className = classes;
  const icon = createICon("fa-solid fa-xmark");
  btn.appendChild(icon);
  return btn;
}

function createICon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    editMode(e.target)
  }
}

function clearItems() {
  if (!lists.hasChildNodes()) {
    alert("There are no items to remove");
    return;
  }

  if (confirm("Remove all?")) {
    lists.innerHTML = ""; // Clears all child elements
  }

  localStorage.removeItem("items");
}


function editMode(item) {
  isEditMode = true;
   lists.querySelectorAll("li").forEach((i) => {
     i.classList.remove("edit-mode");
   });
  item.classList.add('edit-mode')
  formBtn.innerHTML = '<i class="fa-solid fa-pen"> Update Item</i>';
  formBtn.style.backgroundColor = 'green'
  inputItem.value = item.textContent;

}

function removeItem(item) {
  if (confirm("Are you sure?")) {
    item.remove();
    removeItemfromStorage(item.textContent)
    clearUI();
  }
}

function removeItemfromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
    
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item)

  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function filterItem(e) {
  const lists = document.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  let matchFound = false;

  lists.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
      matchFound = true;
    } else {
      item.style.display = "none";
    }
  });

  if (matchFound) {
    hiddenText.style.display = "none";
  } else {
    hiddenText.style.display = "block";
  }
}

function clearUI() {
  inputItem.value = ''
  const items = document.querySelectorAll("li");
  if (items.length === 0) {
    filter.style.display = "none";
    clear.style.display = "none";
  } else {
    filter.style.display = "block";
    clear.style.display = "block";
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"> Add Item</i>';
  formBtn.style.backgroundColor = '#333'
  isEditMode = false;
}
clearUI();

form.addEventListener("submit", onAddItemSubmit);
clear.addEventListener("click", clearItems);
lists.addEventListener("click", onClickItem);
filter.addEventListener("input", filterItem);
document.addEventListener("DOMContentLoaded", displayItems);
