import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MovieComponent } from './pages/movie/movie.component';
import { SeriesTvComponent } from './pages/serieTv/series.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SeriesComponent } from './pages/series/series.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: CatalogComponent,
  },
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'series',
    component: SeriesComponent,
  },
  {
    path: 'serie/:id',
    component: SeriesTvComponent,
  },
  {
    path: 'movies',
    component: MoviesComponent,
  },
  {
    path: 'movie/:id',
    component: MovieComponent,
  },
  {
    path: 'category/:id',
    component: CategoryPageComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
