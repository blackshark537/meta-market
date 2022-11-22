import { Component, Input, OnInit } from '@angular/core';
import { iCategory } from 'src/app/core/Domain/Interfaces';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Input('attributes') attr: iCategory | any;
  constructor() { }

  ngOnInit() {}

}

