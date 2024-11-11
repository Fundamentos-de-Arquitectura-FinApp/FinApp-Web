import {Component} from '@angular/core';
import {ToastModule} from 'primeng/toast';
import {FileUploadEvent, FileUploadModule} from 'primeng/fileupload';
import {MessageService} from 'primeng/api';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [
    ToastModule,
    CommonModule,
    FileUploadModule
  ],
  providers: [MessageService],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent {
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {}

  onUpload(event: FileUploadEvent) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
}
