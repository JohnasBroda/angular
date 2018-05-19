import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { UploadService } from '@services/upload.service';
import { Upload } from '@interfaces';
import { UploadFormComponent } from '@components';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dropzone]',
  providers: [UploadService],
})
export class DropzoneDirective implements OnInit {

  @Output() filesDropped = new EventEmitter<Upload[]>();
  @Output() filesHovered = new EventEmitter<boolean>();

  // tslint:disable-next-line:no-inferrable-types
  public autoUpload: boolean = true;
  private uploads: Upload[] = [];

  constructor(private uploadSvc: UploadService, private host: UploadFormComponent) { }

  ngOnInit() {
    this.uploadSvc.uploadComplete.subscribe(upload =>  {
      this.filesDropped.emit(upload);
      console.log(this.host.uploads);
    });
  }

  @HostListener('drop', ['$event'])
  private onDrop($event: DragEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    const files = $event.dataTransfer.files;
    this.generateUpload(files);
    this.uploads.forEach(upload => this.uploadSvc.pushUpload(upload));
    this.filesHovered.emit(false);
    this.uploads = [];
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    $event.preventDefault();
    this.filesHovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDrageLeave($event) {
    $event.preventDefault();
    this.filesHovered.emit(false);
  }

  private generateUpload(fileList: FileList) {
    for (let i = 0; i < fileList.length; i++) {
      const upload = new Upload(fileList[i]);
      upload.createdAt = fileList[i].lastModifiedDate;
      upload.name = fileList[i].name;
      upload.size = fileList[i].size;
      upload.type = fileList[i].type;
      this.uploads[i] = upload;
    }
  }
}
