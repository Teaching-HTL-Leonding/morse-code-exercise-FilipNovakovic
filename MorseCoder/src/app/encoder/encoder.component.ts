import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encode',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './encoder.component.html',
  styleUrls: ['./encoder.component.css']
})
export class EncoderComponent {
  readonly userText = signal('');

  private readonly morseCode = [
    '.-', '-...', '-.-.', '-..', '.', '..-.', '--.', '....', '..', '.---',
    '-.-', '.-..', '--', '-.', '---', '.--.', '--.-', '.-.', '...', '-',
    '..-', '...-', '.--', '-..-', '-.--', '--..'
  ];

  encode(): void {
    const resultHTML = document.getElementById('encode-result') as HTMLInputElement;

    const text = this.userText().trim();
    if (!text || !/^[A-Za-z]+$/.test(text)) {
      resultHTML.value = '';
      return;
    }

    resultHTML.value = text
      .toUpperCase()
      .split('')
      .map(char => this.morseCode[char.charCodeAt(0) - 65])
      .join(' ');
  }
}
