import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Auth } from 'src/app/types/auth.type';
import { Router } from '@angular/router';

type Nation = {
  idNazione: number;
  iso3: string;
  nome: string;
};
type Region = {
  idProvincia: number;
  nome: string;
};
type City = {
  idComuneItaliano: number;
  nome: string;
};

type User = {
  nome: string;
  cognome: string;
  sesso: string;
  dataNascita: string;
  cittadinanza: string;
  codiceFiscale: string;
  indirizzo: string;
  localita: string;
  idNazione: string;
  provinciaNascita: string;
  idComuneItaliano: string;
  cap: string;
  civico: string;
  recapito: string;
  psw: string;
  email: string;
  idStato: number;
  cittaNascita: string;
  idTipologiaIndirizzo: number;
  idTipoRecapito: number;
  preferito: number;
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [AuthService, ApiService],
})
export class SignUpComponent implements OnInit {
  loading: boolean = false;
  formSignUp: FormGroup;
  nations: Nation[] = [];
  cities: City[] = [];
  regions: Region[] = [];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.formSignUp = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cognome: ['', [Validators.required, Validators.minLength(3)]],
      sesso: ['', [Validators.required]],
      dataNascita: ['', [Validators.required]],
      cittadinanza: ['', [Validators.required, Validators.minLength(5)]],
      codiceFiscale: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      indirizzo: ['', [Validators.required, Validators.minLength(5)]],
      localita: ['', [Validators.required, Validators.minLength(5)]],
      idNazione: ['', [Validators.required]],
      provinciaNascita: ['', [Validators.required]],
      idComuneItaliano: ['', [Validators.required]],
      cap: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      civico: ['', [Validators.required]],
      recapito: ['', [Validators.required, Validators.minLength(8)]],
      psw: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.apiService.fetchNazioni().subscribe((res) => {
      this.nations = res.data;
    });

    this.apiService.fetchProvincia().subscribe((res) => {
      this.regions = res.data;
    });

    this.apiService.fetchComuniItaliani().subscribe((res) => {
      this.cities = res.data;
    });
  }

  onSubmit() {
    if (this.formSignUp.valid) {
      this.loading = true;
      let user: User = this.formSignUp.value;

      user.idStato = 1;
      user.cittaNascita = this.formSignUp.value.idComuneItaliano;
      user.idTipologiaIndirizzo = 2;
      user.idTipoRecapito = 2;
      user.preferito = 0;

      // registrazione
      this.apiService.registrateUser(user).subscribe((res) =>
        this.authService
          .login(user.email, user.psw)
          .subscribe((res: Observable<any>) =>
            res.subscribe((res2: { data: { tk: string } }) => {
              const token = res2.data.tk;

              // resVT = Response VerifyToken
              this.authService.verifyToken(token).subscribe((resVT: any) => {
                const auth: Auth = {
                  nome: resVT.nome,
                  tk: token,
                  idGruppo: resVT.idGruppo,
                };

                console.log(
                  `antes de salvar: ${JSON.stringify(
                    this.authService.getAuth()
                  )}`
                );

                this.authService.saveAuth(auth);

                console.log(
                  `depois de salvar: ${JSON.stringify(
                    this.authService.getAuth()
                  )}`
                );
                this.loading = false;
                this.router.navigateByUrl(`home`);
              });
            })
          )
      );
    }
  }
}
