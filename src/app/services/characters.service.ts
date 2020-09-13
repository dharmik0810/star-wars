import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { get, isEqual } from 'lodash-es';
import { Character } from '../models/characters';
import { environment } from '../../environments/environment';
import { ApiError, ApiErrorCodes } from './api-error-codes';

interface CharacterDetails {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private _http: HttpClient) {}

  private characterListTransformation(response: any): Character[] {
    const characters: Character[] = [];
    const characterDetails: CharacterDetails[] = get(
      response,
      'characters',
      []
    );
    characterDetails.forEach((character: CharacterDetails) => {
      characters.push({
        name: character.name,
        detailsUrl: character.url,
        selected: false,
      });
    });
    return characters;
  }

  getAllCharacters(): Observable<Character[]> {
    const request = this._http.get(environment.charactersUrl);
    return request.pipe(
      map((response) => this.characterListTransformation(response)),
      catchError((error) =>
        throwError(
          new ApiError(
            error instanceof HttpErrorResponse && isEqual(error.status, 404)
              ? ApiErrorCodes.CharactersNotFound
              : ApiErrorCodes.FailedToGetCharacters
          )
        )
      )
    );
  }
}
