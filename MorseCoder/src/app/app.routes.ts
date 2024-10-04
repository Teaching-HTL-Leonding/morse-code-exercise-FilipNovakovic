import { Routes } from '@angular/router';
import { EncoderComponent } from './encoder/encoder.component';
import { DecodeComponent } from './decoder/decoder.component';

export const routes: Routes = [
  {path: 'encode', component: EncoderComponent},
  {path: 'decode', component: DecodeComponent}
];
