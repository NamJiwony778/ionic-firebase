import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.page.html',
  styleUrls: ['./update-form.page.scss'],
})
export class UpdateFormPage implements OnInit {

  @Input() book: any;

  updateBookForm: FormGroup;
  selectedFile: any;

  constructor(public modalController: ModalController, public formBuilder: FormBuilder, public bookService: BookService) {
    this.updateBookForm = formBuilder.group({
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

  updateSelectedBook(selectedBookId) {
    this.bookService.uploadFile(this.updateBookForm.value.title, this.selectedFile)
    .then((downloadURL) => {
      const updatedBook = {
         title: this.updateBookForm.value.title,
         image: downloadURL,
         author: this.updateBookForm.value.author,
         summary: this.updateBookForm.value.summary
      }
    this.bookService.update(selectedBookId, updatedBook);
    this.dismiss();
    });
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
