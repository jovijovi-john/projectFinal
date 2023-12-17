import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { ButtonComponent } from './components/button/button.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroPlusSolid } from '@ng-icons/heroicons/solid';
import { heroArchiveBoxXMark } from '@ng-icons/heroicons/outline';
import { heroPlay } from '@ng-icons/heroicons/outline';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { heroPencilSquareSolid } from '@ng-icons/heroicons/solid';
import { heroUserCircleSolid } from '@ng-icons/heroicons/solid';
import { CategorieSectionComponent } from './components/categorie-section/categorie-section.component';
import { MovieComponent } from './pages/movie/movie.component';
import { SeriesTvComponent } from './pages/serieTv/series.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent } from './pages/movies/movies.component';
import { SeriesComponent } from './pages/series/series.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { SerieFormComponent } from './components/serie-form/serie-form.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LogoutComponent } from './pages/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    ButtonComponent,
    HomeComponent,
    SignInComponent,
    NavbarComponent,
    ProfileComponent,
    MovieComponent,
    SeriesTvComponent,
    SignUpComponent,
    MoviesComponent,
    SeriesComponent,
    CategoryPageComponent,
    MovieFormComponent,
    SerieFormComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselComponent,
    SpinnerComponent,
    NgIconsModule.withIcons({
      heroPlusSolid,
      heroPencilSquareSolid,
      heroArchiveBoxXMark,
      heroPlay,
      heroXMark,
      heroUserCircleSolid,
    }),
    MatProgressSpinnerModule,
    CategorieSectionComponent,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
