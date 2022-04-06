import axios from "axios"
import { Language, Topic, Book, Author} from "@prisma/client"

const getInfo = async(prop:string, prop2:string="")=>{
    const {data} = await axios.get("https://gutendex.com/books/")
    let result:string[] = []
    prop2 === ""?(
    data.results.forEach((elemento:any)=>{
        prop === "authors"? (elemento.authors.map((elemento:{name:string})=>{
             result.push(elemento.name)
             result = [...new Set(result)]
         })):
        elemento[prop].map((elemento:string)=>{
             result.push(elemento)
             result = [...new Set(result)]
         })
    })
    ):(result = data.results.map((elemento:any)=>({title:elemento[prop], cover:elemento[prop2]["image/jpeg"]})))
    return result
}

export const init = async () =>{
const [
    books,
    topics, 
    author,
    languages
] = await Promise.all([
    getInfo("title", "formats"),
    getInfo("bookshelves"),
    getInfo("authors"),
    getInfo("languages")
])
console.log(books, topics,author,languages)
}