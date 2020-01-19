import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  public listSlect: any = [
    { person: 'First Name', Manager: 'EMPFullName' },
    { person: 'Last Name', Manager: 'EmpLastName' },
    { person: 'Email', Manager: 'EmpEmail' }
  ];
  public selectIndex: Number = 1;
  public selectText: string = this.listSlect[0].person;
  public selectManger: string = this.listSlect[0].Manager;
  public isSelectList: boolean = false;
  public isDelect: boolean = false;
  public listDatabak:any;
  public listData: any = [
    { title: 'sholla Ameko' },
    { title: 'xuze ren' },
    { title: 'tengfenng hu' },
    { title: 'hongtu zhao' }
  ];
  public searchName: string = ''
  constructor(public navParams: NavParams) {
    this.listData = this.navParams.data.value
    this.listDatabak=   this.navParams.data.value
    console.log(this.listData)
  }

  ngOnInit() { }
  getSelectlist() {
    this.isSelectList = !this.isSelectList;
  }
  select(item, index) {
    this.selectText = item.person;
    this.selectIndex = index;
    this.selectManger=item.Manager
    this.isSelectList = false;
    
  }
  delectSelect() {
    this.searchName = '';
    this.isDelect = false;
  }
  getSearch() {
    this.isDelect = true;
    //发送请求
  }
  dismiss() {
    this.navParams.data.modal.dismiss({
      result: ''
    })
  }
  setManager(item) {
    this.navParams.data.modal.dismiss({
      result: item.EMPFullName
    })
  }
  clean() {
    this.navParams.data.modal.dismiss({
      result: ''
    })
  }

  getItems(ev: any) {

    console.log()
    this.listData= this.listDatabak
    let val = ev.target.value;
   console.log(val)
    if (val && val.trim() != '') {
      this.listData = this.listData.filter((item) => {
        return (item[this.selectManger].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  };
}
