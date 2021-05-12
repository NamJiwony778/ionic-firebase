import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFormPage } from '../modal-form/modal-form.page';
import { UpdateFormPage } from '../update-form/update-form.page';
import { BookService } from '../services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../classes/book';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public bookList: Observable<Book[]>;

  constructor(public modalController: ModalController, public bookService: BookService, public alertController: AlertController) {}
  
  ngOnInit() {
    this.bookList = this.bookService.getBooks();
  }

  async showModal() {
    const modal = await this.modalController.create({
      component: ModalFormPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async updateModal(book) {
    let bookUpdateModal = await this.modalController.create({
      component: UpdateFormPage,
      cssClass: 'my-custom-class',
      componentProps: {book}
    });
    return await bookUpdateModal.present();
  }


  async removeBook(bookId): Promise<any> {
    const alert = await this.alertController.create({
      message: `Are you sure you want to delete this book?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: cnl => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this.bookService.delete(bookId);
          },
        },
      ],
    });
  
    await alert.present();
  }

}
