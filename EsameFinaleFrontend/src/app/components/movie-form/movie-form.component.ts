import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { MoviesService } from 'src/app/services/movies.service';
import { Auth } from 'src/app/types/auth.type';
import { Category } from 'src/app/types/category';
import { Film } from 'src/app/types/film.type';
import { ModalType } from 'src/app/types/modal.type';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss'],
  providers: [AuthService, MoviesService, CategoryService],
})
export class MovieFormComponent implements OnInit {
  auth?: Auth;
  categories?: Category[];
  formFilm: FormGroup;

  loading: boolean = false;

  @Input() movie?: Film;
  @Input() formType?: 'add' | 'edit' | 'delete';

  @Input() modal: boolean = true;
  @Output() modalChange = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private movieService: MoviesService,
    private categoryservice: CategoryService,
    private router: Router
  ) {
    this.formFilm = this.fb.group({
      titolo: ['', [Validators.required, Validators.minLength(3)]],
      descrizione: ['', [Validators.required, Validators.minLength(3)]],
      durata: ['', [Validators.required, Validators.minLength(2)]],
      regista: ['', [Validators.required, Validators.minLength(3)]],
      attori: ['', [Validators.required, Validators.minLength(3)]],
      anno: ['', [Validators.required, Validators.minLength(3)]],
      idCategoria: ['', [Validators.required]],
      srcImmagine: ['', [Validators.required, Validators.minLength(3)]],
      srcFilmato: ['', [Validators.required, Validators.minLength(3)]],
      srcBanner: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.auth = this.authService.getAuth();

    if (this.auth.tk !== null) {
      this.categoryservice
        .fetchCategories(this.auth.tk)
        .subscribe((response) => {
          this.categories = response.data;
          console.log(this.categories);
        });

      if (this.formType === 'edit') {
        this.formFilm.get('titolo')?.setValue(this.movie?.titolo);
        this.formFilm.get('descrizione')?.setValue(this.movie?.descrizione);
        this.formFilm.get('durata')?.setValue(this.movie?.durata);
        this.formFilm.get('regista')?.setValue(this.movie?.regista);
        this.formFilm.get('attori')?.setValue(this.movie?.attori);
        this.formFilm.get('anno')?.setValue(this.movie?.anno);
        this.formFilm.get('idCategoria')?.setValue(this.movie?.idCategoria);
        this.formFilm.get('srcImmagine')?.setValue(this.movie?.srcImmagine);
        this.formFilm.get('srcFilmato')?.setValue(this.movie?.srcFilmato);
        this.formFilm.get('srcBanner')?.setValue(this.movie?.srcBanner);
      }
    }
  }

  toggleModal() {
    this.modal = !this.modal;
    this.modalChange.emit(this.modal);
  }

  onSubmit() {
    this.auth = this.authService.getAuth();

    if (this.auth.tk !== null) {
      if (this.formFilm.valid) {
        this.loading = true;

        let movieAux: Film = this.formFilm.value;

        console.log(movieAux);

        if (this.formType === 'add') {
          this.movieService
            .createMovie(this.auth.tk, movieAux)
            .subscribe((res) => {
              this.loading = false;
              this.router.navigateByUrl('movies');
            });
        } else if (this.formType === 'edit') {
          this.movieService
            .updateMovie(this.auth.tk, movieAux, this.movie?.idFilm!)
            .subscribe((res) => {
              this.loading = false;
              this.router.navigateByUrl('movies');
            });
        }
      }
    }
  }

  deleteMovie() {
    if (this.auth?.tk) {
      this.loading = true;
      this.movieService
        .deleteMovie(this.auth.tk, this.movie?.idFilm!)
        .subscribe((res) => {
          this.loading = false;
          this.router.navigateByUrl('movies');
        });
    }
  }
}
