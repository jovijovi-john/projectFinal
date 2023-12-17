import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  slides = [
    { img: '/assets/banner_home/photo1.jpeg' },
    { img: '/assets/banner_home/photo2.jpeg' },
    { img: '/assets/banner_home/photo3.jpg' },
    { img: '/assets/banner_home/photo4.jpeg' },
    { img: '/assets/banner_home/photo5.jpeg' },
    { img: '/assets/banner_home/photo6.webp' },
    { img: '/assets/banner_home/photo7.webp' },
    { img: '/assets/banner_home/photo9.jpeg' },
    { img: '/assets/banner_home/photo10.jpeg' },
    { img: '/assets/banner_home/photo11.jpeg' },
    { img: '/assets/banner_home/photo12.jpeg' },
    { img: '/assets/banner_home/photo13.jpeg' },
    { img: '/assets/banner_home/photo14.png' },
    { img: '/assets/banner_home/photo15.jpeg' },
    { img: '/assets/banner_home/photo16.png' },
    { img: '/assets/banner_home/photo17.jpeg' },
    { img: '/assets/banner_home/photo18.jpeg' },
    { img: '/assets/banner_home/photo19.png' },
    { img: '/assets/banner_home/photo20.jpg' },
  ];

  slideConfig = {
    arrows: true,
    swipe: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
    infinite: true,
  };
}
