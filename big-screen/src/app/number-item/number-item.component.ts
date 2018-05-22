import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../number-list/number-list.component';

@Component({
  selector: 'app-number-item',
  templateUrl: './number-item.component.html',
  styleUrls: ['./number-item.component.css']
})
export class NumberItemComponent implements OnInit {
  @Input() data: Item;
  constructor() {}

  ngOnInit() {
    console.log(this.data);
  }
}
