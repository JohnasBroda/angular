import { UploadService } from './../../services/upload.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Upload } from '../../classes/upload';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css'],
})
export class UploadFormComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:no-output-rename
  @Output('uploadFiles') uploadEvent = new EventEmitter<Upload[]>();

  // tslint:disable-next-line:no-inferrable-types
  public dropZoneActive: boolean = false;
  public uploads: Upload[] = [];

  constructor() { }

  ngOnInit() {}

  ngOnDestroy() {
    this.uploads  = [];
  }

  public clearDropZone() {
    this.uploads = [];
  }

  public handleDrop(upload: Upload) {
      console.log(this.uploads);
      this.uploads = [...this.uploads, upload];
      this.uploadEvent.emit(this.uploads);
  }

  public dropZoneState($event: boolean) {
    this.dropZoneActive = $event;
  }

  public removeFile(file: File) {
    this.uploads = this.uploads.filter((upload: Upload) => {
      return upload.name !== file.name;
    });
    console.log(this.uploads);
  }

  public detectFiles(event) {
    const upload = new Upload(event.target.files[0]);
    upload.createdAt = event.target.files[0].lastModifiedDate;
    upload.name = event.target.files[0].name;
    upload.size = event.target.files[0].size;
    upload.type = event.target.files[0].type;
    console.log(upload);
    this.uploads = [...this.uploads, upload];
    console.log(this.uploads);
  }

}
