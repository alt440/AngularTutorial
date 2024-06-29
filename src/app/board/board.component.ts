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

  //because of interpolation, whenever statusMessage updates, so does the UI!
  statusMessage: string = "";

  /*
  because of the objects in the list squares, I can relate the ids to the objects
  here, and loop over them. The ! in front of the : allows me to not define the list
  immediately
  */
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
      this.validateMagicSquare();
    }

    if(this.statusMessage.length === 0){
      this.statusMessage = "Hurray! The magic square appears valid."
    }
  }

  validateMagicSquare(){
    //validate rows
    let sumEach4 = this.getMagicSquareSum();
    
    let isValid = this.validateRows(sumEach4);
    isValid = this.validateColumns(sumEach4, isValid);
    isValid = this.validateDiagonals(sumEach4, isValid);

    //the status message has been set (interpolation: check html). It should reflect the validate status
  }

  getMagicSquareSum(): number{
    let sumEach4 = 0;
    let index = 0;
    for(const square of this.squareComponents){
      if(index < 4){
        sumEach4 += square.numberValue;
      }
      index++;
    }
    return sumEach4;
  }

  validateDiagonals(sumEach4: number, isValid: boolean): boolean{
    if(!isValid){
      return false;
    }

    let isMagicSquareValid = true;
    let sumDiagonals = [0,0];

    let index = 0;
    for(const square of this.squareComponents){
      if(index%5 === 0){ //left diagonal index
        sumDiagonals[0]+=square.numberValue;
      }

      if(index !== 0 && index !== 15 && index%3 === 0){ //right diagonal index
        sumDiagonals[1]+=square.numberValue;
      }

      index++;
    }

    for(const sumDiagonal of sumDiagonals){
      if(sumDiagonal !== sumEach4){
        this.statusMessage = "The sum of a diagonal is not equal to the expected sum (sum of the first row): "+sumEach4+"! But was: "+sumDiagonal+".";
        isMagicSquareValid = false;
      }
    }

    return isMagicSquareValid;
  }

  validateColumns(sumEach4: number, isValid: boolean): boolean{
    if(!isValid){
      return false;
    }

    let isMagicSquareValid = true;
    let sumsColumns = [0,0,0,0];

    let index = 0;
    for(const square of this.squareComponents){
      sumsColumns[index%4] += square.numberValue;
      index++;
    }

    console.log("Sum of columns: "+sumsColumns);

    for(const sumColumn of sumsColumns){
      if(sumColumn !== sumEach4){
        this.statusMessage = "The sum of a column is not equal to the expected sum (sum of first row): "+sumEach4+"! But was: "+sumColumn+".";
        isMagicSquareValid = false;
        break;
      }
    }

    return isMagicSquareValid;
  }

  validateRows(sumEach4: number): boolean{
    let currentSum = 0;

    let isMagicSquareValid = true;
    let index = 0;
    for(const square of this.squareComponents){
      currentSum += square.numberValue;
      
      if((index+1) % 4 === 0){
        if(sumEach4 !== currentSum){
          this.statusMessage = "The sum of a row is not equal to the expected sum (sum of first row): "+sumEach4+"! But was: "+currentSum+".";
          isMagicSquareValid = false;
          break;
        }
        currentSum = 0;
      }

      index++;
    }

    return isMagicSquareValid;
  }
}
