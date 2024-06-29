import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './square.component.html',
  styleUrl: './square.component.css'
})
export class SquareComponent {

  @Input() id: number;
  numberValue: number;

  constructor(){
    this.id = NaN;
    this.numberValue = NaN;
  }

  onInputChange(event: Event){
    this.numberValue = Number((event.target as HTMLInputElement).value);
    //console.log(this.numberValue);
  }
}
