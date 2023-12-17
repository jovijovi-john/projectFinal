import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { Auth } from 'src/app/types/auth.type';
import { Category } from 'src/app/types/category';
import { ModalType } from 'src/app/types/modal.type';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
  providers: [CategoryService, AuthService],
})
export class SeriesComponent implements OnInit {
  auth?: Auth;
  categories?: Category[];

  loading: boolean = true;

  @Input() modal: boolean = false; // Start modal state
  dadosPai?: ModalType;

  constructor(
    private categoryservice: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.auth = this.authService.getAuth();

    if (this.auth.tk !== null) {
      this.categoryservice
        .fetchCategories(this.auth.tk)
        .subscribe((response) => {
          this.categories = response.data;
          this.loading = false;
          console.log(this.categories);
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
