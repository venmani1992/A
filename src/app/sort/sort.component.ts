import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
  sortlist=[];
  constructor() { }

  ngOnInit() {
    fetch('https://my-json-server.typicode.com/venmani1992/cart/product')
    .then(response => response.json())
    .then(json => {this.sortlist=json
    console.log(this.sortlist)})
  }

}
