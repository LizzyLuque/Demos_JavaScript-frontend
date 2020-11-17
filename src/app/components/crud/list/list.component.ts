import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() articles:Article[];
  @Input() url:string;
  @Input() message:string;
  constructor() { }

  ngOnInit(): void {}

}
