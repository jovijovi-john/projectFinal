export type Film = {
  idFilm: number;
  titolo: string;
  descrizione: string;
  durata: number;
  regista: string;
  attori: string;
  anno: number;
  srcImmagine: string;
  srcFilmato: string;
  srcBanner: string;
  idCategoria?: number;
};
