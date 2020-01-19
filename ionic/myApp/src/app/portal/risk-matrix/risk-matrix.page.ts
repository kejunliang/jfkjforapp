import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RiskMatrixPageModule } from "./risk-matrix.module";

import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from "../../common/popover/popover.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-risk-matrix',
  templateUrl: './risk-matrix.page.html',
  styleUrls: ['./risk-matrix.page.scss'],
})
export class RiskMatrixPage implements OnInit {
  public consequenceOptions = [];
  public likelihoodOptions = [];
  public riskMatrix: RiskMatrixPageModule;
  public seletedScore;
  public riskLevel;
  public levelColor;
  public levelDes;
  public Consequence;
  public Likelihood;
  public cellId;
  //public RankLegend;
  //rowOne=[];
  public YAxisOptions = [];
  public XAxisOptions = [];
  public riskMatrixSaveData;
  public rmTable;
  public rmtableTdWidth;
  public riskMatrixObj = {};
  public btnBox: any = {
    "result": [
      { "btnType": "btnOK", "btnLabel": "OK" },
      { "btnType": "btnClose", "btnLabel": "Close" }
    ]
  };
  constructor(
    public activeRoute: ActivatedRoute,
    public popoverController: PopoverController,
    public router: Router,
  ) {

    this.activeRoute.queryParams.subscribe(res => {
      if(res){
        console.log('res:',res);
        console.log('riskMatrixFrameData:',JSON.parse(res.riskMatrixFrameData));
        //this.riskMatrix = res.riskMatrixFrameData;
        this.riskMatrix = JSON.parse(res.riskMatrixFrameData);
        this.riskMatrixSaveData = res.riskMatrixSaveData;
        if(this.riskMatrix){
          this.rmTable = this.riskMatrix.RMTable;
          this.YAxisOptions = this.riskMatrix.YAxisOptions;
          this.XAxisOptions = this.riskMatrix.XAxisOptions;
          this.rmtableTdWidth = 100 / this.riskMatrix.matrix_X + '%';
        }
      
      }
     
    })


  }

  ngOnInit() {
  }
  ionViewDidLoad() {

   
    
  };
  detectTdCellBg(){

  }
  getRows(index){
    let rowsData=[];
    let key='r'+(index+1);
    if (this.rmTable.hasOwnProperty(key)) rowsData= this.rmTable[key]; 
    for(let h=0;h<rowsData.length;h++)
         {
           rowsData[h].likelihood=this.YAxisOptions[index];
           rowsData[h].consequence=this.XAxisOptions[h];
          
         }
   //this.rmTable[key]=rowsData;
    return rowsData;
  };
  initCellDisplay(){
    let el= this.rmTable;
    let hideDisplay=[];
    if(!el) return;
    for (var key in el){
     if (el.hasOwnProperty(key)) 
     {
       hideDisplay.push(el[key])
     }
    }
     for(let j=0;j<hideDisplay.length;j++)
     {
       for(let h=0;h<hideDisplay[j].length;h++)
       {
         hideDisplay[j][h].display=false;
       }
      
     }
   };
   selectedTableCell(option){
     this.initCellDisplay();
     option.display=true;
  
     this.seletedScore = option.Score;
     this.riskLevel = option.Rank;
     this.levelColor = option.Color;
     this.Consequence = option.consequence.value;
     this.Likelihood = option.likelihood.value;
     this.levelDes=option.Des;
     
     this.riskMatrixObj={
                        ResultCell:option.CellID,
                        Consequence:option.consequence.value,
                        Likelihood:option.likelihood.value,
                        TheScore:option.Score,
                        RiskRank_2D:option.Rank,
                        RankingResultDes_2D:option.Des,
                        ResultColor:option.Color
                      };
     
   };
   showCellDisplay(){
   
    let el= this.rmTable;
    let showDisplay=[];
    if(!el) return;
    for (var key in el){
     if (el.hasOwnProperty(key)) 
     {
       showDisplay.push(el[key])
     }
    }
    //alert(JSON.stringify(showDisplay));
     for(let j=0;j<showDisplay.length;j++)
     {
       for(let h=0;h<showDisplay[j].length;h++)
       {
         
         if((showDisplay[j][h].likelihood.value==this.Likelihood)&&(showDisplay[j][h].consequence.value==this.Consequence))
          {
          showDisplay[j][h].display=true;
          this.seletedScore = showDisplay[j][h].Score;
          this.riskLevel = showDisplay[j][h].Rank;
          this.levelColor = showDisplay[j][h].Color;
          this.levelDes= showDisplay[j][h].RankingResultDes_2D;
          this.cellId=showDisplay[j][h].CellID;
          break;
          }
          
       }
      
     }
     //Reset riskMatrixObj
     this.riskMatrixObj={
          ResultCell:this.cellId,
          Consequence:this.Consequence,
          Likelihood:this.Likelihood,
          TheScore:this.seletedScore,
          RiskRank_2D:this.riskLevel ,
          RankingResultDes_2D:this.levelDes,
          ResultColor:this.levelColor
      };
   };
  
   calculate(){
     let xWeighting=0;
     let yWeighting=0;
     this.initCellDisplay();
     for(let y=0;y<this.YAxisOptions.length;y++)
     {
       if(this.YAxisOptions[y].value==this.Likelihood)
        yWeighting=this.YAxisOptions[y].Weighting;
     }
     for(let x=0;x<this.XAxisOptions.length;x++)
     {
       if(this.XAxisOptions[x].value==this.Consequence)
        xWeighting=this.XAxisOptions[x].Weighting;
     }
     if(this.riskMatrix.CalculationMethod=="*") this.seletedScore = xWeighting * yWeighting;
     
     if(this.riskMatrix.CalculationMethod=="+") this.seletedScore = xWeighting + yWeighting;
     
  this.showCellDisplay();
  
   };
   async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      componentProps: { type: "action", data: this.btnBox, formdata: '', unid: '', tempid: '' },
      translucent: true,
      cssClass: "custom-popover",
      mode: "md"
    });
    popover.present();
    const { data } = await popover.onDidDismiss();
    console.log(data)
    this.getBtnLink(data)
  }

  getBtnLink(btn) {

    let actiontype = ""
    switch (btn) {
      case "btnEdit":
        actiontype = "edit"
        this.router.navigate(["/new-form"], { queryParams: { type: actiontype, refresh: new Date().getTime() } });
        break;
      case "btnSave":
        break;
    }
  }
  btnok(){
    console.log('don t work!')
  }
}
