import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { MoviesService } from 'src/app/services/movies.service';
import { SerieTvService } from 'src/app/services/serie-tv.service';
import { Auth } from 'src/app/types/auth.type';
import { Category } from 'src/app/types/category';
import { ModalType } from 'src/app/types/modal.type';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  providers: [MoviesService, SerieTvService, AuthService, CategoryService],
})
export class CategoryPageComponent implements OnInit {
  id?: number;
  auth!: Auth;
  category?: Category;

  loading: boolean = true;

  @Input() modal: boolean = false; // Start modal state
  dadosPai?: ModalType;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private movieService: MoviesService,
    private serieService: SerieTvService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.auth = this.authService.getAuth();

    if (this.auth.tk) {
      this.categoryService
        .fetchCategory(this.auth.tk, this.id!)
        .subscribe((res) => {
          this.category = res.data;
          this.loading = false;
          console.log(this.category);
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
}
