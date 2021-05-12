import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.page.html',
  styleUrls: ['./modal-form.page.scss'],
})
export class ModalFormPage implements OnInit {

 addBookForm: FormGroup;
 selectedFile: any;

  constructor(public modalController: ModalController, 
              public formBuilder: FormBuilder, 
              public bookService: BookService,
              public loadingController: LoadingController) {

    this.addBookForm = formBuilder.group({
      title: ['', Validators.compose([Validators.maxLength(150), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      image: [''],
      author: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      summary: ['']
    });
   }

  ngOnInit() {
  }

  cacheImage(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    }

  async createBook() {
    const loading = await this.loadingController.create();
    
    this.bookService.uploadFile(this.addBookForm.value.title, this.selectedFile)
    .then((downloadURL) => {
       const title =  this.addBookForm.value.title;
       const image = downloadURL;
       const author = this.addBookForm.value.author;
       const summary = this.addBookForm.value.summary;

      this.bookService.create(title, image, author, summary).then(() => {
        loading.dismiss();
        this.addBookForm.reset();
        this.dismiss();
      });
    }, error => {
      console.error(error);
      loading.dismiss();
    }
  );
  return await loading.present();
}

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }



}
