export enum ApiErrorCodes {
  Unknown = 'UNKNOWN/UNMAPPED ERROR',
  CharactersNotFound = 'CHARACTERS NOT FOUND!',
  FailedToGetCharacters = 'FAILED TO GET CHARACTERS!',
  FilmsNotFound = 'FILMS NOT FOUND!',
  FailedToGetFilms = 'FAILED TO GET FILMS!',
  FilmNotFound = 'FILM NOT FOUND!',
}

export class ApiError {
  constructor(readonly errorCode: ApiErrorCodes, readonly message?: string) {}
}
