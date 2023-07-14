const container = document.querySelector('#bookList');
const addBtn = document.querySelector('#addButton');

let bookCollection = JSON.parse(localStorage.getItem('bookCollection')) || [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBook(title, author) {
    const newBook = new Book(title, author);
    bookCollection.unshift(newBook);
    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
  }

  static removeBook(book) {
    bookCollection = bookCollection.filter((b) => b !== book);
    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
  }
}

const displayBooks = (container) => {
  container.innerHTML = '';
  bookCollection.forEach((book) => {
    const newBook = document.createElement('li');
    newBook.classList.add('newBook');
    newBook.textContent = `${book.title} by ${book.author}`;
    newBook.classList.add('bg-gray');

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', () => {
      Book.removeBook(book);
      newBook.remove();
    });
    newBook.appendChild(removeButton);
    container.appendChild(newBook);
  });
};

displayBooks(container);

addBtn.addEventListener('click', (event) => {
  const titleInput = document.querySelector('#titleInput');
  const authorInput = document.querySelector('#authorInput');
  const title = titleInput.value;
  const author = authorInput.value;
  if (title === '' || author === '') {
    return null;
  }
  Book.addBook(title, author);
  displayBooks(container);

  titleInput.value = '';
  authorInput.value = '';
  return event.preventDefault();
});

const addSection = document.getElementById('addNew');
const listSection = document.getElementById('booklist');
const contactSection = document.getElementById('contact');
const add = document.getElementById('add');
add.addEventListener('click', () => {
  contactSection.style.display = 'none';
  listSection.style.display = 'none';
  addSection.style.display = 'block';
});

const list = document.getElementById('list');
list.addEventListener('click', () => {
  contactSection.style.display = 'none';
  addSection.style.display = 'none';
  listSection.style.display = 'block';
});

const contact = document.getElementById('contactBtn');
contact.addEventListener('click', () => {
  addSection.style.display = 'none';
  listSection.style.display = 'none';
  contactSection.style.display = 'block';
});

const dynamicParagraph = document.getElementById('dynamicParagraph');

function updateDateTime() {
  const currentDate = new Date();
  const dateTimeString = currentDate.toLocaleString();
  dynamicParagraph.textContent = dateTimeString;
}
updateDateTime();
setInterval(updateDateTime, 1000);