
import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ApiServiceService } from './api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
public  movies: any=[];
public filterData:any=[];
public descpDataa:any=[];
public MovieName:any="";
public selectedGenres: string[] = [];
 constructor(private apiService: ApiServiceService) {}
 fromDate:any="";
 toDate:any="";
 public descriptionShowDilog:any=false;
public currentDate = new Date();
 ngOnInit() {
   this.apiService.getMovies().subscribe(
     (result) => {
       this.movies = result.movies;
      //  this.filterData = this.movies;
       console.log('Movies Data:', this.movies);
     },
     (error) => {
       console.error('Error fetching movies data:', error);
     }
   );
 }
 checkboxItems = [
  { id: 1, label: 'Action', isChecked: false },
  { id: 2, label: 'Adventure', isChecked: false },
  { id: 3, label: "Comedy", isChecked: false },
  { id: 4, label: "Romance", isChecked: false },
  { id: 5, label:"Horror", isChecked: false },
  // Add more checkbox items as needed
];


//filter Data from to date when you select date picker from date and to date
 onSearch(){
   if (this.fromDate && this.toDate) {
     this.filterData = this.movies.filter((item:any) => {
       const itemDate = new Date(item.release_date);
       const fromDate = new Date(this.fromDate);
       const toDate = new Date(this.toDate);

       return itemDate >= fromDate && itemDate <= toDate;
     });
   } else {
     // If fromDate or toDate is not set, show all data
     this.filterData = this.movies;
   }
    if(this.MovieName != ""){
    this.filterData = this.filterData.filter((item:any) =>
       item.title.toLowerCase().includes(this.MovieName.toLowerCase())
     );
   }
 
     
     if(this.filterData .length == 0){
      alert("No movie found");
     }
   
 }
 onCheckboxChange(item: any) {
  console.log(`Checkbox state changed for ${item.label}: ${item.isChecked}`);
  let array:any=[]
  array = (this.movies.filter((movie:any) => {
  var bool = false;
    //  return movie.genres.forEach((element:any) => {
      // var bool = false;
      //   if((element.toLowerCase().includes(item.label .toLowerCase()))) {
      //     bool = true;
      //   }
      // return bool;
      // return (element.toLowerCase().includes(item.label .toLowerCase()));
    // return element=== item.label && item.isChecked;
  // });
  for (var i in movie.genres) {
    if (movie.genres[i].toLowerCase().includes(item.label .toLowerCase())) {
      bool = true;
      break;
    }
  }
  return bool;

    }));
    console.log("filteredMovies",array)
    this.filterData = array;
    // if (!item.isChecked) {
    //   this.filterData = this.filterData.concat(array);
    //   } else {
    //     this.filterData = this.filterData.filter((movie:any) => movie !== filteredMovies[0]);
    //     }
}
 //this function is used to when you select date picker data always start with from date .from date select again to date reset
 datePicker(){
   this.toDate=""
 }
 descrption(movieData:any){
  this.descpDataa=[];
  this.descriptionShowDilog=true;

this.descpDataa.push(movieData)
console.log("moviie Data",this.descpDataa)
 }
 back(){
  this.descriptionShowDilog=false;
 }

}

