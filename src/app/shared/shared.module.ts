import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FilterTextboxModule } from './filter-textbox/filter-textbox.module';

import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TrimPipe } from './pipes/trim.pipe';

@NgModule({
  imports: [CommonModule, FilterTextboxModule ],
  exports: [ CommonModule, FormsModule, CapitalizePipe, TrimPipe, FilterTextboxModule],
  declarations: [ CapitalizePipe, TrimPipe ]
})
export class SharedModule { }
