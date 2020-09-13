import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isEqual } from 'lodash-es';
import { Character } from '../../models/characters';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent {
  @Input() label =
    'Please select your star wars character to get more details:';

  @Input() characters: Character[];

  @Output() selectedCharacter = new EventEmitter<Character>();

  constructor() {}

  onChange(character: Character) {
    character.selected = !character.selected;
    this.characters.forEach(
      (item: Character) => (item.selected = isEqual(item.name, character.name))
    );
    this.selectedCharacter.emit(character);
  }
}
