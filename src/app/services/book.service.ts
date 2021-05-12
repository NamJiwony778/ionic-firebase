import { Injectable } from '@angular/core';
import { Book } from '../classes/book';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  uploadTask: AngularFireUploadTask;
 
  constructor(private ngFirestore: AngularFirestore, private ngFireStorage: AngularFireStorage) { }

  create(title: string, image: string, author: string, summary: string): Promise<void> {
    const id = this.ngFirestore.createId();

    return  this.ngFirestore.doc(`books/${id}`).set(
           {
             id,
             title,
             image,
             author,
             summary
            })
  }

  uploadFile(title, file: File) {
    const metaData = {
      contentType: 'image/*',
    };
    return new Promise<any>((resolve, reject) => {
      // Upload the file and metadata
      const path =  `freakyStorage/${new Date().getTime()}_${title}`;
      const storageRef = this.ngFireStorage.ref(path);
      storageRef.put(file, metaData).then((snapshot) => {
        console.log('Uploaded a blob or file!' + snapshot);
        //TODO add error handling
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          resolve(downloadURL)
        })
      });
    });
  }

  getBooks(): Observable<Book[]> {
    return this.ngFirestore.collection<Book>(`books`).valueChanges();
  }

  update(id, book) {
    this.ngFirestore.collection('books').doc(id).update(book)
  }

  delete(bookId) {
     this.ngFirestore.doc(`books/${bookId}`).delete();
  }
}
