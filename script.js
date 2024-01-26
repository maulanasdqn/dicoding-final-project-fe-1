const themeSwitch = document.getElementById("switch");
const textSwitch = document.getElementById("switch-text");
const formCaption = document.getElementById("form-caption");
const isUpdate = false;
const button = document.getElementById("button");
const bookComplete = document.getElementById("book-complete");
const bookUncomplete = document.getElementById("book-uncomplete");
const countComplete = document.getElementById("count-complete-book");
const countUncomplete = document.getElementById("count-uncomplete-book");

//Create Books
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookYear = document.getElementById("year");
const bookIsComplete = document.getElementById("isComplete");
const bookForm = document.getElementById("book-form");

/**
 * Renders the complete page with content from completed books.
 * @returns {Array} - Array of book content from completed books.
 */
const renderCompletePage = () => {
  // Filter completed books and map to their content
  return books
    .filter((book) => book.isComplete)
    .map((book) => bookContent(book));
};

/**
 * Renders the list of incomplete books with their content.
 * @param {Array} books - The array of book objects
 * @returns {Array} - The array of incomplete books content
 */
const renderUncompletePage = (books) => {
  // Filter out the incomplete books and map their content
  return books
    .filter((book) => !book.isComplete)
    .map((book) => bookContent(book));
};

/**
 * Just Dummy Data for Testing Purpose
 * Represents a collection of books
 * @type {Array<object>}
 */
const books = JSON.parse(localStorage.getItem("books")) || [];

const booksToCreate = [];

const createBook = (e) => {
  e.preventDefault();
  const book = {
    id: +new Date(),
    title: bookTitle.value,
    author: bookAuthor.value,
    year: bookYear.value,
    isComplete: bookIsComplete.checked,
  };
  books.push(book);
  bookForm.reset();
  bookComplete.innerHTML =
    renderCompletePage(books).length === 0
      ? bookNotFound
      : renderCompletePage(books).join("");
  bookUncomplete.innerHTML =
    renderUncompletePage(books).length === 0
      ? bookNotFound
      : renderUncompletePage(books).join("");

  localStorage.setItem("books", JSON.stringify(books));
  countComplete.innerHTML = renderCompletePage(books).length;
  countUncomplete.innerHTML = renderUncompletePage(books).length;
};

const form = document.getElementById("book-form");

// Add an event listener to the form
form.addEventListener("submit", createBook);

/**
 * SVG moon icon
 * @returns {string} SVG string
 */
const moon = `
<svg
  width="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  stroke="#ffffff"
>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      d="M13 6V3M18.5 12V7M14.5 4.5H11.5M21 9.5H16M15.5548 16.8151C16.7829 16.8151 17.9493 16.5506 19 16.0754C17.6867 18.9794 14.7642 21 11.3698 21C6.74731 21 3 17.2527 3 12.6302C3 9.23576 5.02061 6.31331 7.92462 5C7.44944 6.05072 7.18492 7.21708 7.18492 8.44523C7.18492 13.0678 10.9322 16.8151 15.5548 16.8151Z"
      stroke="#ffffff"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </g>
</svg>
`;

/**
 * SVG Sun icon.
 * @returns {string} - The SVG string.
 */
const sun = `
<svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <path
      d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
      stroke="#393e46"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </g>
</svg>
`;

/**
 * Represents the HTML content for when a book is not found
 */
const bookNotFound = `
    <div class="book__content">
        <span>Data tidak ditemukan</span>
    </div>
`;

/**
 * Generate book content based on the provided id, title, author, and year.
 *
 * @param {object} id - The unique identifier of the book
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book
 * @param {number} year - The year the book was published
 * @return {string} The HTML content of the book
 */
const bookContent = ({ id, title, author, year }) => `
          <div class="book__content">
            <div class="between">
              <div class="flex-col">
                <span>${title}</span>
                <span style="font-size: 12px">${author} - ${year}</span>
              </div>
              <div>
                <svg
                  onclick="updateBook(${id})"
                  class="svg-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M9.65661 17L6.99975 17L6.99975 14M6.10235 14.8974L17.4107 3.58902C18.1918 2.80797 19.4581 2.80797 20.2392 3.58902C21.0202 4.37007 21.0202 5.6364 20.2392 6.41745L8.764 17.8926C8.22794 18.4287 7.95992 18.6967 7.6632 18.9271C7.39965 19.1318 7.11947 19.3142 6.8256 19.4723C6.49475 19.6503 6.14115 19.7868 5.43395 20.0599L3 20.9998L3.78312 18.6501C4.05039 17.8483 4.18403 17.4473 4.3699 17.0729C4.53497 16.7404 4.73054 16.424 4.95409 16.1276C5.20582 15.7939 5.50466 15.4951 6.10235 14.8974Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>

                <svg
                  onclick="deleteBook(${id})"
                  class="svg-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>
                    <path
                      d="M20.5 6H3.49988"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>
                    <path
                      d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>
                    <path
                      d="M9.5 11L10 16"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>
                    <path
                      d="M14.5 11L14 16"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>
                  </g>
                </svg>

                <svg
                  onclick="changeStatusBook(${id})"
                  class="svg-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                      stroke="white"
                      stroke-width="1.5"
                    ></path>
                    <path
                      d="M6 15.8L7.14286 17L10 14"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M6 8.8L7.14286 10L10 7"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M13 9L18 9"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>
                    <path
                      d="M13 16L18 16"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>

`;

/**
 * Perform a book search based on the input value, and display the
 * filtered books in the appropriate sections on the page.
 *
 * @param {void}
 * @return {void}
 */
const bookSearch = () => {
  const search = document.getElementById("search-book").value;
  const filteredBook = books
    .filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))
    .map((book) => bookContent(book));

  if (search) {
    bookComplete.innerHTML =
      filteredBook.filter((x) => x.isComplete).length === 0
        ? bookNotFound
        : filteredBook.filter((x) => x.isComplete).join("");
    bookUncomplete.innerHTML =
      filteredBook.filter((x) => !x.isComplete).length === 0
        ? bookNotFound
        : filteredBook.filter((x) => !x.isComplete).join("");
  } else {
    bookComplete.innerHTML =
      renderCompletePage(books).length === 0
        ? bookNotFound
        : renderCompletePage(books).join("");

    bookUncomplete.innerHTML =
      renderUncompletePage(books).length === 0
        ? bookNotFound
        : renderUncompletePage(books).join("");
  }
};

const searchInput = document.getElementById("search-book");
searchInput.addEventListener("input", bookSearch);

bookComplete.innerHTML =
  renderCompletePage(books).length === 0
    ? bookNotFound
    : renderCompletePage(books).join("");

bookUncomplete.innerHTML =
  renderUncompletePage(books).length === 0
    ? bookNotFound
    : renderUncompletePage(books).join("");

/**
 * Set the theme color in the local storage.
 *
 * @param {string} color - The color to set as the theme.
 */
const setTheme = (color) => {
  localStorage.setItem("theme", color);
};

/**
 * Retrieves the theme preference from local storage or the user's system settings.
 *
 * @return {string} The preferred theme ("dark" or "light").
 */
const getTheme = () => {
  if (localStorage.getItem("theme") === "dark") {
    return "dark";
  } else if (localStorage.getItem("theme") === "light") {
    return "light";
  } else {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
};

const changeStatusBook = (id) => console.log("Change Status", id);
const updateBook = (id) => console.log("Update", id);
const deleteBook = (id) => console.log("Delete", id);

themeSwitch.addEventListener("click", () => {
  if (themeSwitch.checked) {
    setTheme("dark");
    textSwitch.innerHTML = moon;
    document.documentElement.setAttribute("theme", getTheme());
  } else {
    setTheme("light");
    textSwitch.innerHTML = sun;
    document.documentElement.setAttribute("theme", getTheme());
  }
});

textSwitch.innerHTML = getTheme().toLocaleLowerCase() === "dark" ? moon : sun;

themeSwitch.checked = getTheme() === "dark";

document.documentElement.setAttribute("theme", getTheme());

formCaption.innerText = isUpdate ? "Update Buku" : "Tambah Buku";

button.innerText = isUpdate ? "Update" : "Simpan";

countComplete.innerText = renderCompletePage(books).length;
countUncomplete.innerHTML = renderUncompletePage(books).length;

console.log("Books from localstorage", books);
