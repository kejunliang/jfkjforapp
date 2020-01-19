import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { GetallformsService } from "../../services/getallforms.service";
import { Storage } from '@ionic/storage';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  public actions: any = []
  public formid:string;
  public fields:Array<object> =[]
  public para:any;
  public tempid:string;
  constructor(public params: NavParams,
    public Popover: PopoverController,
    public router: Router,
    public getforms: GetallformsService,
    private storage: Storage,

  ) {
    console.log("打开操作")
    console.log(this.params.get("type"))
    console.log(this.params.get("data"))
    this.actions = this.params.get("data").result
    this.fields =this.params.get("formdata")
    this.formid =this.params.get("unid")
    this.tempid =this.params.get("tempid")
  }

  ngOnInit() { }
  
  dismiss(btn){
    this.Popover.dismiss(btn)
  }



}
