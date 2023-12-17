import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SerieTvService } from 'src/app/services/serie-tv.service';
import { Auth } from 'src/app/types/auth.type';
import { Film } from 'src/app/types/film.type';
import { ModalType } from 'src/app/types/modal.type';
import { SerieTv } from 'src/app/types/serieTv.type';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
})
export class SeriesTvComponent implements OnInit {
  auth?: Auth;
  serieId?: number;
  serie?: SerieTv;

  @Input() modal: boolean = false; // Start modal state
  dadosPai?: ModalType;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private serieService: SerieTvService
  ) {}

  ngOnInit(): void {
    this.auth = this.authService.getAuth();
    this.serieId = Number(this.route.snapshot.params['id']);

    this.serieService
      .fetchSerieTv(this.auth.tk!, this.serieId)
      .subscribe((res) => {
        this.serie = res.data;
      });
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

    this.handleDadosChange({ resourceType: 'serie', formType: formType });
  }
}
