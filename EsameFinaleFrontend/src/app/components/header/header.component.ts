import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { Auth } from 'src/app/types/auth.type';
import { Category } from 'src/app/types/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService, CategoryService],
})
export class HeaderComponent {
  auth!: Auth;
  authenticated: boolean = false;
  categories: Category[] = [];

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.auth = this.authService.getAuth();

    if (this.auth.tk !== null) {
      this.authenticated = true;

      this.categoryService
        .fetchCategories(this.auth.tk)
        .subscribe((res) => (this.categories = res.data));
    } else {
      this.authenticated = false;
    }
  }
}
