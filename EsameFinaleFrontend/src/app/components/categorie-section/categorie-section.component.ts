import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlusSolid } from '@ng-icons/heroicons/solid';
import { CarouselComponent } from '../carousel/carousel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SerieTvService } from 'src/app/services/serie-tv.service';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from 'src/app/types/auth.type';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { CategoryService } from 'src/app/services/category.service';
import { ModalType } from 'src/app/types/modal.type';
import { SpinnerComponent } from '../spinner/spinner.component';

type Movie = {
  idFilm: number;
  titolo: string;
  descrizione: string;
  durata: number;
  regista: string;
  attori: string;
  anno: number;
  srcImmagine: string;
  srcFilmato: string;
};

type Serie = {
  idSerie: number;
  titolo: string;
  descrizione: string;
  totaleStagioni: number;
  numeroEpisodio: number;
  regista: string;
  attori: string;
  annoInizio: number;
  annoFine: number;
  srcImmagine: string;
  srcFilmato: string;
};

type Resource = {
  id: number;
  titolo: string;
  descrizione: string;
  srcImmagine: string;
  srcFilmato: string;
};

@Component({
  standalone: true,
  imports: [
    SpinnerComponent,
    NgIconComponent,
    CommonModule,
    CarouselComponent,
    SlickCarouselModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [MoviesService, SerieTvService, CategoryService],
  viewProviders: [provideIcons({ heroPlusSolid })],
  selector: 'app-categorie-section',
  templateUrl: './categorie-section.component.html',
  styleUrls: ['./categorie-section.component.scss'],
})
export class CategorieSectionComponent implements OnInit {
  movies: Movie[] = [];
  series: Serie[] = [];

  loading: boolean = true;

  modalShow: boolean = true;
  authenticated: boolean = false;

  resources: Movie[] | Serie[] = [];
  auth: Auth | null = null;

  @Input() modal: boolean = true;
  @Output() modalChange = new EventEmitter<boolean>();

  @Output() dadosChange = new EventEmitter<any>();

  @Input() categoryName?: string;
  @Input() idCategory?: number;
  @Input() type?: 'movie' | 'serie';

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplaySpeed: 3000,
    // autoplay: true,
    pauseOnHover: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          arrows: true,
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          arrows: true,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          arrows: true,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },

      {
        breakpoint: 768,
        settings: {
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  constructor(
    private movieService: MoviesService,
    private serieTvService: SerieTvService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resources;
    this.auth = this.authService.getAuth();

    if (this.auth.tk !== null) {
      if (this.type === 'serie') {
        this.serieTvService
          .fetchSeriesCategory(this.auth.tk, this.idCategory!)
          .subscribe((response: { data: Serie[] }) => {
            this.series = response.data;
            this.loading = false;
          });
      } else {
        this.movieService
          .fetchFilmsCategory(this.auth.tk, this.idCategory!)
          .subscribe((response: { data: Movie[] }) => {
            this.movies = response.data;
            this.loading = false;
          });
      }
    }
  }

  redirectToMediaPage(id: number) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(`${this.type}/${id}`, {
        skipLocationChange: false,
      });
    });
  }

  toggleModal() {
    this.modal = !this.modal;

    const objeto: ModalType = {
      formType: 'add',
      resourceType: this.type!,
    };

    this.dadosChange.emit(objeto);
    this.modalChange.emit(this.modal);
  }
}
