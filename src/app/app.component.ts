import { Component, OnInit } from '@angular/core';
import { CharactersService } from './services/characters.service';
import { FilmsService } from './services/films.service';
import { Film } from './models/film';
import { Character } from './models/characters';
import { ApiError } from './services/api-error-codes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  characters: Character[];

  films: Film[];

  error: string;

  constructor(
    private _charactersService: CharactersService,
    private _filmsService: FilmsService
  ) {}

  ngOnInit(): void {
    this._charactersService.getAllCharacters().subscribe(
      (characters: Character[]) => (this.characters = characters),
      (error: ApiError) => {
        this.error = error.errorCode;
      }
    );
  }

  selectedCharacter(character: Character) {
    this.films = [];
    this.error = null;
    this._filmsService.getAllFilms(character.detailsUrl).subscribe(
      (films: Film[]) => {
        this.films = films;
      },
      (error: ApiError) => {
        this.error = error.errorCode;
      }
    );
  }
}
