import { Component, OnInit, Output, EventEmitter,ViewEncapsulation } from '@angular/core';
import { DataService } from 'src/services/data.service';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  constructor(private dataService: DataService ) { }

  ngOnInit(): void {
  }

  public onSidenavClose = () => {
    this.dataService.close();
  }

}
