// Retrieve the books from localStorage or initialize an empty array
let books = JSON.parse(localStorage.getItem('books')) || [];

// Function to add a new book to the collection
function addBook(title, author) {
  const newBook = { title, author };
  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
}

// Function to remove a book from the collection
function removeBook(index) {
  books = books.filter((book, i) => i !== index);
  localStorage.setItem('books', JSON.stringify(books));
}

// Function to display the books in the collection
function displayBooks() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  for (let i = 0; i < books.length; i += 1) {
    const book = books[i];

    const listItem = document.createElement('li');
    listItem.textContent = `${book.title} by ${book.author}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', () => {
      removeBook(i);
      displayBooks();
    });

    listItem.appendChild(removeButton);
    bookList.appendChild(listItem);
  }
}

// Add button event listener
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', () => {
  const titleInput = document.getElementById('titleInput');
  const authorInput = document.getElementById('authorInput');

  const title = titleInput.value;
  const author = authorInput.value;

  addBook(title, author);
  displayBooks();

  titleInput.value = '';
  authorInput.value = '';
});

// Display the initial books in the collection
displayBooks();
