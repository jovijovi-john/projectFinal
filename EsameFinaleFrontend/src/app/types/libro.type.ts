import { Immagine } from "./immagine.type"

export type Libro = {
    id:number,
    idCat:number,
    titolo:string,
    autore:string,
    img?:Immagine
}