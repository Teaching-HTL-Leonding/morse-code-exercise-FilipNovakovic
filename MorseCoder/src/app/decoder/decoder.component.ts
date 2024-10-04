import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-decode',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './decoder.component.html',
  styleUrls: ['./decoder.component.css']
})
export class DecodeComponent {
  readonly morseCode = signal('');
  decodedText: string = '';
  errorMessage: string = '';

  private readonly morseToText: Record<string, string> = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
    '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
    '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
    '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
    '-.--': 'Y', '--..': 'Z'
  };

  decode(): void {
    const morsePattern = /^[.\s-]+$/;
    const input = this.morseCode().trim();

    if (!morsePattern.test(input)) {
      this.showError('Invalid Morse code. Only dots, dashes, and spaces are allowed.');
      return;
    }

    const decodedMessage = input.split(' ').map(morseChar => {
      return this.morseToText[morseChar] ?? this.showError(`Unknown Morse code: ${morseChar}`);
    }).join('');

    if (!this.errorMessage) {
      this.decodedText = decodedMessage;
    }
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.decodedText = '';
  }
}
