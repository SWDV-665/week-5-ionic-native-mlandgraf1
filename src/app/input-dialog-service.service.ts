import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public alertController: AlertController, public dataService: GroceriesServiceService) { }

  async showPrompt(item?, index?) {
    const alert = await this.alertController.create({
      header: item ? 'Edit Item' : 'Add Item',
      message: item ? "Please edit item...": "Please enter item",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item ? item.quantity : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item);
            if (index !== undefined) {
              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(item);
            }
          }
        }
      ]
    });
    await alert.present();
  }
  
}
