import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //Create random backgrounds with random classes
    $(document).ready(function(){
      var classCycle=['imageCycle1','imageCycle2','imageCycle3','imageCycle4'];
  
      var randomNumber = Math.floor(Math.random() * classCycle.length);
      var classToAdd = classCycle[randomNumber];
  
      $('#background').addClass(classToAdd);
  });
  }
}
