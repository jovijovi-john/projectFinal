import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from 'src/app/types/auth.type';
import { Category } from 'src/app/types/category';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService],
})
export class NavbarComponent implements OnInit {
  auth: Auth | null = null;

  @Input() categories?: Category[];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth = this.authService.getAuth();
  }

  logout() {
    this.authService.removeAuth();
    this.router.navigateByUrl('/', { skipLocationChange: true });
  }

  redirectToMediaPage(id: number) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(`category/${id}`, {
        skipLocationChange: false,
      });
    });
  }
}
