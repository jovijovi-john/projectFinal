import { Component, Input } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ModalType } from 'src/app/types/modal.type';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  @Input() modal: boolean = false; // Start modal state
  dadosPai?: ModalType;

  toggleModal() {
    this.modal = !this.modal;
  }

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

  // recebe os dados do componente filho
  handleDadosChange(data: ModalType) {
    this.dadosPai = data;
    console.log('Dados atualizados no componente pai:', data);
  }
}
