import { Injectable } from '@angular/core';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { get, isEqual } from 'lodash-es';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Film } from '../models/film';
import { ApiError, ApiErrorCodes } from './api-error-codes';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  constructor(private _http: HttpClient) {}

  private getFilm(url: string): Observable<Film> {
    const request = this._http.get(url);
    return request.pipe(
      map(
        (response) =>
          <Film>{
            title: get(response, 'title'),
            releaseDate: get(response, 'release_date'),
            director: get(response, 'director'),
            producer: get(response, 'producer'),
          }
      ),
      catchError((error) =>
        throwError(new ApiError(ApiErrorCodes.FilmNotFound))
      )
    );
  }

  getAllFilms(url: string): Observable<Film[]> {
    const request = this._http.get(url);
    return request.pipe(
      map((response) => <string[]>get(response, 'films', [])),
      mergeMap((filmUrls: string[]) => {
        return forkJoin(
          filmUrls.map((filmUrl: string) => this.getFilm(filmUrl))
        );
      }),
      catchError((error) =>
        throwError(
          new ApiError(
            error instanceof HttpErrorResponse && isEqual(error.status, 404)
              ? ApiErrorCodes.FilmsNotFound
              : ApiErrorCodes.FailedToGetFilms,
            error instanceof HttpErrorResponse
              ? `${error.status}:${error.statusText}`
              : JSON.stringify(error)
          )
        )
      )
    );
  }
}
