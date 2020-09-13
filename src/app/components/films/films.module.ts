import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsComponent } from './films.component';
import { MatTableModule } from '@angular/material';

@NgModule({
  declarations: [FilmsComponent],
  exports: [FilmsComponent],
  imports: [CommonModule, MatTableModule],
})
export class FilmsModule {}
