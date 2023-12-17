import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';
import { Auth } from 'src/app/types/auth.type';
import { Film } from 'src/app/types/film.type';
import { ModalType } from 'src/app/types/modal.type';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  providers: [AuthService],
})
export class MovieComponent implements OnInit {
  auth?: Auth;
  movieId?: number;

  @Input() movie?: Film;

  @Input() modal: boolean = false; // Start modal state
  dadosPai?: ModalType;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private movieService: MoviesService
  ) {}

  ngOnInit(): void {
    this.auth = this.authService.getAuth();
    this.movieId = Number(this.route.snapshot.params['id']);

    if (this.auth.tk !== null) {
      this.movieService
        .fetchFilm(this.auth.tk, this.movieId)
        .subscribe((res) => {
          this.movie = res.data;
        });
    }
  }

  toggleModal() {
    this.modal = !this.modal;
  }

  // recebe os dados do componente filho
  handleDadosChange(data: ModalType) {
    this.dadosPai = data;
    console.log('Dados atualizados no componente pai:', data);
  }

  handleModal(formType: 'edit' | 'delete' | 'add') {
    this.modal = true;

    this.handleDadosChange({ resourceType: 'movie', formType: formType });
  }
}
