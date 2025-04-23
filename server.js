import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const BOOKS_FILE = "books.txt";


if (!fs.existsSync(BOOKS_FILE)) {
    fs.writeFileSync(BOOKS_FILE, `Harry Potter and the Philosopher’s Stone,978-0-7475-3269-9,J.K Rowling,1997\nHarry Potter and the Chamber of Secrets,0-7475-3849-2,J.K Rowling,1998\nThe Little Prince,978-0156012195,Antoine Saint-Exupery,1943\n`);
}

else {
    console.log("File exists");
}




if (!fs.existsSync(BOOKS_FILE)) {
    fs.writeFileSync(BOOKS_FILE, `Harry Potter and the Philosopher’s Stone,978-0-7475-3269-9,J.K Rowling,1997\nHarry Potter and the Chamber of Secrets,0-7475-3849-2,J.K Rowling,1998\nThe Little Prince,978-0156012195,Antoine Saint-Exupery,1943\n`);
}

else {
    console.log("File exists");
}


function readBooks() {
    try { 
        const data = fs.readFileSync(BOOKS_FILE, "utf8");
        // if present pass this, if wala edi pass none
        return data
            ? data.split("\n").filter(line => line).map(line => {
                const [book_name, ISBN, author, year_published] = line.split(",");
                return { book_name, ISBN, author, year_published };
            })
            : [];
    } catch (err) {
        console.error("Error reading file:", err);
        return [];
    }
}



function saveBook(book) {
    //  // https://www.geeksforgeeks.org/node-js-fs-appendfilesync-function/
    try {
        // lagay sa books.txt
        fs.appendFileSync(BOOKS_FILE, `${book.book_name},${book.ISBN},${book.author},${book.year_published}\n`);
        return true;
    } catch (err) { // if none
        console.error("Error saving the file:", err);
        return false;
    }
}

function isUniqueISBN(book, isbn) {
    // https://www.geeksforgeeks.org/javascript-program-to-find-duplicate-elements-in-an-array/
    // lalagay sa isang array lahat ng kasame ng hinahanap mong isbn, so if meron atleast 1, ibig sabihin duplicated na siya
    return books.filter(book => book.ISBN === isbn).length === 0;
}



app.post('/add-book', (req, res) => {
    // get the details

    const { book_name, ISBN, author, year_published } = req.body;

    // if none, error
    if (!book_name || !ISBN || !author || !year_published) {
        console.log('false');
        return res.json({ success: false, message: "Error. Some or all fields are missing" });
    }
    
    // read
    const books = readBooks();
    // if meron na existing (avoid for dupes)
    if (!isUniqueISBN(books, ISBN)) {
        console.log('false');
        return res.json({ success: false, message: "ISBN already exists" });
    }


    // save success
    const success = saveBook({ book_name, ISBN, author, year_published });
    console.log(success ? 'true' : 'false'); // input true if meron, false if none (checker)
    res.json({ success });
});



// for isbn and author 
app.get('/find-by-isbn-author', (req, res) => {
    
    // get the isbn and author
    const { isbn, author } = req.query;
    
    // if error for isbn and author
    if (!isbn || !author) {
        console.log('false');
        return res.json({ success: false, message: "Both ISBN and author must be provided" });
    }
    
    // if meron
    const books = readBooks();
    const result = books.find(book => book.ISBN === isbn && book.author === author);
    console.log(result ? 'true' : 'false'); // for checker 
    res.json(result ? { success: true, book: result } : { success: false, message: "Book not found" });
});




// same but author naman
app.get('/find-by-author', (req, res) => {

    // get the author 
    const { author } = req.query;

    // if no author
    if (!author) {
        console.log('false'); // checker
        return res.json({ success: false, message: "Author is required" });
    }
    
    // if meron naman, do process
    const books = readBooks();
    const result = books.filter(book => book.author === author); // checks if same
    console.log(result.length ? 'true' : 'false'); // printing checker
    res.json(result.length ? { success: true, books: result } : { success: false, message: "No books found" });
});


// start of the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});


