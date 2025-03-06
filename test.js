import needle from 'needle';

const BASE_URL = 'http://localhost:3000';

// testing a book
const addBook = async (book) => {
    const res = await needle('post', `${BASE_URL}/add-book`, book, { json: true });
    console.log('Add Book Response:', res.body);
};

// isbn only
const findByIsbnAndAuthor = async (isbn, author) => {
    const res = await needle('get', `${BASE_URL}/find-by-isbn-author?isbn=${isbn}&author=${encodeURIComponent(author)}`);
    console.log('Find by ISBN and Author Response:', res.body);
};

// author only
const findByAuthor = async (author) => {
    const res = await needle('get', `${BASE_URL}/find-by-author?author=${encodeURIComponent(author)}`);
    console.log('Find by Author Response:', res.body);
};

// Run tests
(async () => {
    const book1 = {
        book_name: "Harry Potter and the Philosopher’s Stone",
        ISBN: "978-0-7475-3269-9",
        author: "J.K. Rowling",
        year_published: "1997"
    };

    const book2 = {
        book_name: "The Hobbit",
        ISBN: "978-0-261-10221-7",
        author: "J.R.R. Tolkien",
        year_published: "1937"
    };

    console.log("Testing Add Book:");
    await addBook(book1);
    await addBook(book2);

    console.log("\nTesting Find by ISBN and Author:");
    await findByIsbnAndAuthor("978-0-7475-3269-9", "J.K. Rowling");

    console.log("\nTesting Find by Author:");
    await findByAuthor("J.K. Rowling");
})();