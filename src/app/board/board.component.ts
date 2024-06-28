import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, SquareComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements AfterViewInit{
  squares: any[] = [
    {id:1},{id:2},{id:3},{id:4},
    {id:5},{id:6},{id:7},{id:8},
    {id:9},{id:10},{id:11},{id:12},
    {id:13},{id:14},{id:15},{id:16},
  ];
  statusMessage: string = "";

  @ViewChildren(SquareComponent) squareComponents!: QueryList<SquareComponent>;

  constructor(){
  }

  ngAfterViewInit(): void {
      
  }

  checkSquareStatus() {
    this.statusMessage = "";
    this.squareComponents.forEach(square => {
      console.log(`Square ${square.id} - Status: ${square.numberValue}`);
      // Perform other operations with square variables as needed
    });

    //first verify if each value is filled
    for(const square of this.squareComponents){
      if(Number.isNaN(square.numberValue)){
        this.statusMessage = "Some values of the magic square haven't been filled. The validation has failed.";
        break;
      }
    }

    if(this.statusMessage.length === 0){
      this.statusMessage = "Hurray! The magic square appears complete."
    }
  }
}
