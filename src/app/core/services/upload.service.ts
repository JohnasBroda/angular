import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { Injectable, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { Upload } from '@interfaces';

@Injectable()
export class UploadService {

  public uploadComplete = new EventEmitter<Upload>();

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  public pushUpload(upload: Upload) {
    const uploadTask: AngularFireUploadTask = this.storage.upload(`uploads/${upload.name}`, upload.file);

    uploadTask.snapshotChanges().subscribe((snapShot: firebase.storage.UploadTaskSnapshot) => {
      if (snapShot.bytesTransferred === snapShot.totalBytes) {
        upload.url = snapShot.downloadURL;
        this.uploadComplete.emit(upload);
      }
    });
  }

  public saveFileData(upload: Upload) {
    console.log(upload);
    this.db.database.ref(`uploads/`).push(upload);
  }

  public deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then(() => {
      this.deleteFileStorage(upload.name);
    }).catch(error => console.log(error));
  }

  private deleteFileData(key: string) {
    return this.db.list('uploads/').remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`uploads/${name}`).delete();
  }
}
