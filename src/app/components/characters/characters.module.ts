import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from './characters.component';

@NgModule({
  declarations: [CharactersComponent],
  exports: [CharactersComponent],
  imports: [CommonModule],
})
export class CharactersModule {}
