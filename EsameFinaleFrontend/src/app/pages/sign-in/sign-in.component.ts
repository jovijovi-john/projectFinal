import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from 'src/app/types/auth.type';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [AuthService],
})
export class SignInComponent implements OnInit {
  formLogin!: FormGroup;
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get email() {
    return this.formLogin.get('email')!;
  }

  get password() {
    return this.formLogin.get('password')!;
  }

  handleAuth(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: Observable<any>) =>
      res.subscribe((res2: { data: { tk: string } }) => {
        const token = res2.data.tk;

        // resVT = Response VerifyToken
        this.authService.verifyToken(token).subscribe((resVT: any) => {
          const auth: Auth = {
            nome: resVT.nome,
            tk: token,
            idGruppo: resVT.idGruppo,
          };

          this.authService.saveAuth(auth);

          this.router.navigateByUrl(`home`);
        });
      })
    );
  }

  handleLogin() {
    if (this.formLogin.valid) {
      const email = this.formLogin.get('email')?.value;
      const password = this.formLogin.get('password')?.value;
      this.loading = true;

      this.handleAuth(email, password);

      return;
    }
  }
}
