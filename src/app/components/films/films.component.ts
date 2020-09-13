import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../../models/film';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
})
export class FilmsComponent implements OnInit {
  @Input() label = 'Film details for the above selected character.';

  @Input() films: Film[];

  displayedColumns: string[] = ['title', 'releaseDate', 'director', 'producer'];

  constructor() {}

  ngOnInit(): void {}
}
