import { OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

export class commonCtrl implements OnInit {
  public loading: any
  constructor(
    public loadingController: LoadingController,
  ) {
    
    
   


  }

  async  show() {
    this.loading = await this.loadingController.create({
      message: 'loading....',
      duration: 1000
    });
    await this.loading.present();
  }
  async hide() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  ngOnInit() {
  }

}
