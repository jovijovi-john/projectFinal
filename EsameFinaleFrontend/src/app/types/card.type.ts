import { Bottone } from "./bottone.type"
import { Immagine } from "./immagine.type"

export type Card ={
    immagine?:Immagine,
    testo:string,
    titolo:string | null,
    bottone?:Bottone
}