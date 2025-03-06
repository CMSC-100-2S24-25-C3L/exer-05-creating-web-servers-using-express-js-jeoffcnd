import needle from 'needle';

const BASE_URL = 'http://localhost:3000';


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