import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageHelper } from 'src/app/helpers/local-storage.helper';
import { EndpointEnum } from 'src/models/EndpointEnum';
import { DataService } from 'src/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { HashtagComponent } from '../modals/hashtag/hashtag.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['cuenta', 'hashtag', 'fechaPublicacion', 'alcance1', 'alcance2', 'alcance3'];
  dataSource: MatTableDataSource<any>;
  data:any;
  isLoading = true;
  fileUrl:string;
  form!: FormGroup;
  account:string = "";
  email:string = "";
  constructor(private dialog:MatDialog, private fb: FormBuilder, private dataService: DataService, private StorageHelper: LocalStorageHelper) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.account = this.StorageHelper.getLoggedUserInfo().Id;
    this.email = this.StorageHelper.getLoggedUserInfo().Email;
    this.form = this.fb.group({
      hash: [null],
      dob:[null],
      alcance1: [null],
      alcance2: [null],
      alcance3: [null],
    });
    this.consulta();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  private consulta(): void {
    this.dataService.get(EndpointEnum.DataByAccount, this.StorageHelper.getLoggedUserInfo().Id).subscribe((data: any) => {
      this.isLoading = false;
      this.data = data;
      console.log(data);
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }, error => this.isLoading = false);
  }

  public save():void{
    let data = {
      hashtag: this.form.value.hash,
      cuenta: this.account,
      fechaPublicacion: this.form.value.dob,
      alcance1: this.form.value.alcance1,
      alcance2: this.form.value.alcance2,
      alcance3: this.form.value.alcance3,
    };
    this.dataService.post(EndpointEnum.Data, data).subscribe((data: any) => {
      console.log(data);
      this.consulta();
    }, error => this.isLoading = false);
  }

  public analiza():void{
    this.dataService.get(EndpointEnum.Analize, this.StorageHelper.getLoggedUserInfo().Id).subscribe((data: any) => {
      console.log(data);
      this.openDetail(data);
    }, error => this.isLoading = false);
  }

  openDetail(data:any){

    let dialogBoxSettings = {
      width: '500px',
      data: {...data},
      margin: '0 auto',
      backdropClass: 'custom-overlay',
      hasBackdrop: true,
      panelClass: 'custom-modalbox'
    };

    let dialog = this.dialog.open(HashtagComponent, dialogBoxSettings);
  }
}
