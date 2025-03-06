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





// start of the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});


