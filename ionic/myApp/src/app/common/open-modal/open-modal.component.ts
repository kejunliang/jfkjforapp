import { Component, OnInit } from '@angular/core';
import { NavParams,AlertController } from '@ionic/angular';
@Component({
  selector: 'app-open-modal',
  templateUrl: './open-modal.component.html',
  styleUrls: ['./open-modal.component.scss'],
})
export class OpenModalComponent implements OnInit {
  public reason: string;
  public title :string ;
  constructor(
    public navParams: NavParams,
    public alertController: AlertController
  ) { 
   this.title="Please enter comments"

  }

  ngOnInit() {}

  dismiss() {
    if(!this.reason || this.reason.trim()==''){
      this.presentAlert(this.title, "", "OK")
      return false;
    }
    this.navParams.data.modal.dismiss({
      result: this.reason
    })
  }
  async presentAlert(msg: string, header: string, btn: string) {

    const alert = await this.alertController.create({
      header: header,
      subHeader: '',
      message: msg,
      buttons: [btn]
    });

    await alert.present();
  }

}
