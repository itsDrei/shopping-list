const inputItem = document.getElementById('item-input');
const form = document.getElementById('item-form');
const lists = document.getElementById('item-list');
const clear = document.getElementById('clear');
const filter = document.getElementById('filter');
const hiddenText = document.getElementById('hiddenText')

function addItem(e) {
  e.preventDefault();
  const newItem = inputItem.value;
  if (newItem === "") {
    alert("Please Input your List!");
    return;
  }
 // Check if the item already exists in the list
    const listItems = lists.querySelectorAll('li'); // Assuming `lists` is a <ul> or <ol>
    for (const item of listItems) {
        if (item.textContent.includes(newItem)) {
            alert('Item is already on your list!');
            return;
        }
    }
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  lists.appendChild(li);
  clearUI();
  inputItem.value = "";
}

function createButton(classes) {
    const btn = document.createElement('button');
    btn.className = classes;
    const icon = createICon("fa-solid fa-xmark");
    btn.appendChild(icon)
    return btn;
}

function createICon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function clearItems() {
  if (!lists.hasChildNodes()) {
    alert("There are no items to remove");
    return;
  }

  if (confirm("Remove all?")) {
    lists.innerHTML = ""; // Clears all child elements
  }
}



function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure you want to remove this item?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}


function filterItem(e) {
  const lists = document.querySelectorAll("li");
    const text = e.target.value.toLowerCase();
    let matchFound = false

  lists.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
        item.style.display = "flex";
        matchFound = true
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
    const items = document.querySelectorAll("li");
    if (items.length === 0) {
        filter.style.display = 'none'
        clear.style.display = 'none'
    } else {
        filter.style.display = 'block'
        clear.style.display = 'block'
    }
}
clearUI();



form.addEventListener('submit', addItem)
clear.addEventListener('click', clearItems)
lists.addEventListener('click', removeItem)
filter.addEventListener('input', filterItem)
