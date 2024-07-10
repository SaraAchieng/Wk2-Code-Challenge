// Array to store shopping list items
let shoppingList = [];

// DOM elements
const shoppingForm = document.getElementById('shopping-form');
const itemInput = document.getElementById('item-input');
const listContainer = document.getElementById('list-container');

// Function to render shopping list items
function renderList() {
    // Clear current list
    listContainer.innerHTML = '';
  
    // Render each item in the shoppingList array
    shoppingList.forEach((item, index) => {
      const listItem = document.createElement('div');
      listItem.classList.add('list-item');
      listItem.innerHTML = `
        <span class="item-text ${item.purchased ? 'purchased' : ''}">${item.name}</span>
        <button class="mark-btn">${item.purchased ? 'Unmark' : 'Mark'}</button>
      `;

    // Apply different styles or classes based on item's 'purchased' status
    if (item.purchased) {
      listItem.innerHTML = `
        <span class="item-text purchased">${item.name}</span>
        <button class="mark-btn">Unmark</button>
      `;
    } else {
      listItem.innerHTML = `
        <span class="item-text">${item.name}</span>
        <button class="mark-btn">Mark</button>
      `;
    }
  
      listContainer.appendChild(listItem);
  
      // Event listener for mark/unmark button
      listItem.querySelector('.mark-btn').addEventListener('click', () => {
        item.purchased = !item.purchased;
        renderList();
        updateLocalStorage();
      });
  
    });
  }
  
  // Function to add new item to the shopping list
  function addItem(name) {
    shoppingList.push({ name, purchased: false });
    renderList();
    updateLocalStorage();
  }
  
  // Event listener for form submission (adding new item)
  shoppingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const itemName = itemInput.value.trim();
    if (itemName !== '') {
      addItem(itemName);
      itemInput.value = '';
    }
  });
  
  // Event listener for clear list button
  document.getElementById('clear-btn').addEventListener('click', () => {
    shoppingList = [];
    renderList();
    updateLocalStorage();
  });
  
  // Function to update local storage with shopping list data
  function updateLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }
  
  // Function to retrieve shopping list data from local storage
  function retrieveLocalStorage() {
    const storedList = localStorage.getItem('shoppingList');
    if (storedList) {
      shoppingList = JSON.parse(storedList);
      renderList();
    }
  }
  
  // Initial setup: Retrieve stored data from local storage on page load
  retrieveLocalStorage();