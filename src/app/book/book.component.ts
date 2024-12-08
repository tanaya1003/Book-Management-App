import { Component } from '@angular/core';
import { BookModel } from '../models/book.model';
import { OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
   newBookTitle : string = "";
   newBookAuthor: string = "";

   BookModels:BookModel[] = []
i: number | undefined;

   constructor(@Inject(PLATFORM_ID) private platformId : any){}

   ngOnInit():void{
    if(isPlatformBrowser(this.platformId)){
    let savedBookModels = localStorage.getItem("bookModels")
    this.BookModels = savedBookModels ? JSON.parse(savedBookModels) : []  
   }
  }

   addBook(){
    if(this.newBookTitle.trim().length && this.newBookAuthor){
      let newBookModel : BookModel = {
        title : this.newBookTitle,
        author : this.newBookAuthor
      }
      this.BookModels.push(newBookModel);
 
      //Reset form feild to empty
      this.newBookTitle = "";
      this.newBookAuthor = "";
      
      //save the updated booklist to local storage if in browser
      if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("bookModels",JSON.stringify(this.BookModels))
    }
  }
}
   deleteBookModel(index:number){
    //remove book from array based on index
    this.BookModels.splice(index,1)

    //if we are running in browser(not serevr side) , update local storage
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem("bookModels",JSON.stringify(this.BookModels))
   }
  }
}
