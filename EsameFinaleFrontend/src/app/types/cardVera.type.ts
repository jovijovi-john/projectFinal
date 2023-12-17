import { Bottone } from "./bottone.type"

export type CardVera ={
    srcImmagine?:string,
    testo:string,
    titolo:string | null,
    bottone?:Bottone,
    bottone2?:Bottone
}