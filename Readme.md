<h2 align=center> Hi you!😄 </h2>
<h2 align=center> You can visit the api deployed on Heroku: </h2>

<h2 align=center> <a href="https://booksflix2.herokuapp.com/api/books"> www.ApiBooksFlix.com</a> </h2>

## Built with

- [Prisma](https://www.prisma.io/) - ORM
- [Typescript](https://www.typescriptlang.org/) - Strong typed JS
- [Express js](https://expressjs.com/) - Node js framework 
- [Node js](https://nodejs.org/en/) - JavaScript runtime built
- [PostgreSQL](https://www.postgresql.org/) - Relational Database

## Routes / Endpoints

- [All books 🡵](https://booksflix2.herokuapp.com/api/books) 
- [All authors 🡵](https://booksflix2.herokuapp.com/api/author) 
- [Especific book by id 🡵](https://booksflix2.herokuapp.com/api/books/2) 
- [Especific author name by query 🡵](http://localhost:3001/api/author/s/?name=Shelley%20Mary%20Wollstonecraft) 
- To be continue...
<br/> 

<h2>Setup api yourself </h2>

## 🔵 Preparing server
<br/> 

- <img src="https://miro.medium.com/max/1400/1*UBVscfss9H1c_hNCMZdZIg.png" height="20px"/>  Create a DATABASE in PostgreSQL called books</li>
- 📄 Add a new file named .env </li>
- Inside the file write: `DATABASE_URL="postgresql://postgres:{your password}@localhost:5432/books?schema=public"`
- Change where it says "your password" to your database password 
- Open a terminal and run the next command: ` npm i `
- After it finishes installing run the next command:  `npx prisma migrate reset`
- Then run:  `npx prisma db push --force-reset`
- Finally run:  `npm run dev`

<br/>

## 🟢 Enjoy! 💖