import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { MoviesService } from 'src/app/services/movies.service';
import { SerieTvService } from 'src/app/services/serie-tv.service';
import { Auth } from 'src/app/types/auth.type';
import { Category } from 'src/app/types/category';
import { Film } from 'src/app/types/film.type';
import { SerieTv } from 'src/app/types/serieTv.type';

@Component({
  selector: 'app-serie-form',
  templateUrl: './serie-form.component.html',
  styleUrls: ['./serie-form.component.scss'],
  providers: [AuthService, SerieTvService, CategoryService],
})
export class SerieFormComponent {
  auth?: Auth;
  formSerie: FormGroup;
  categories?: Category[];

  loading: boolean = false;

  @Input() formType?: 'add' | 'edit' | 'delete';
  @Input() serie?: SerieTv;

  @Input() modal: boolean = true;
  @Output() modalChange = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private serieService: SerieTvService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.formSerie = this.fb.group({
      titolo: ['', [Validators.required, Validators.minLength(3)]],
      descrizione: ['', [Validators.required, Validators.minLength(3)]],
      totaleStagioni: ['', [Validators.required, Validators.minLength(1)]],
      numeroEpisodio: ['', [Validators.required, Validators.minLength(1)]],
      regista: ['', [Validators.required, Validators.minLength(3)]],
      attori: ['', [Validators.required, Validators.minLength(3)]],
      annoInizio: ['', [Validators.required, Validators.minLength(3)]],
      idCategoria: ['', [Validators.required]],
      annoFine: ['', []],
      srcImmagine: ['', [Validators.required, Validators.minLength(3)]],
      srcFilmato: ['', [Validators.required, Validators.minLength(3)]],
      srcBanner: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.auth = this.authService.getAuth();

    if (this.auth.tk !== null) {
      this.categoryService
        .fetchCategories(this.auth.tk)
        .subscribe((response) => {
          this.categories = response.data;
          console.log(this.categories);
        });
    }

    if (this.formType === 'edit') {
      this.formSerie.get('titolo')?.setValue(this.serie?.titolo);
      this.formSerie.get('descrizione')?.setValue(this.serie?.descrizione);
      this.formSerie
        .get('totaleStagioni')
        ?.setValue(this.serie?.totaleStagioni);
      this.formSerie
        .get('numeroEpisodio')
        ?.setValue(this.serie?.numeroEpisodio);
      this.formSerie.get('regista')?.setValue(this.serie?.regista);
      this.formSerie.get('attori')?.setValue(this.serie?.attori);
      this.formSerie.get('annoInizio')?.setValue(this.serie?.annoInizio);
      this.formSerie.get('annoFine')?.setValue(this.serie?.annoFine);
      this.formSerie.get('srcImmagine')?.setValue(this.serie?.srcImmagine);
      this.formSerie.get('srcFilmato')?.setValue(this.serie?.srcFilmato);
      this.formSerie.get('srcBanner')?.setValue(this.serie?.srcBanner);
    }
  }

  toggleModal() {
    this.modal = !this.modal;
    this.modalChange.emit(this.modal);
  }

  onSubmit() {
    this.auth = this.authService.getAuth();

    if (this.auth.tk !== null) {
      if (this.formSerie.valid) {
        this.loading = true;
        let serieAux: SerieTv = this.formSerie.value;

        console.log(serieAux);

        if (this.formType === 'add') {
          this.serieService
            .createSerie(this.auth.tk, serieAux)
            .subscribe((res) => {
              console.log(res);

              this.loading = false;
              this.router.navigateByUrl('series');
            });
        } else if (this.formType === 'edit') {
          this.serieService
            .updateSerie(this.auth.tk, serieAux, this.serie?.idSerie!)
            .subscribe((res) => {
              console.log(res);
              this.loading = false;
              this.router.navigateByUrl('series');
            });
        }
      }
    }
  }

  deleteSerie() {
    if (this.auth?.tk) {
      this.loading = true;

      this.serieService
        .deleteSerie(this.auth.tk, this.serie?.idSerie!)
        .subscribe((res) => {
          console.log(res);
          this.loading = false;
          this.router.navigateByUrl('series');
        });
    }
  }
}
