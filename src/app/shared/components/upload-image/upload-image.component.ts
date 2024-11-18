import {Component, EventEmitter, inject, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {ImageUploadService} from '../../services/image-upload.service';
import {ProductsService} from '../../../finapp/services/products.service';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent {
  selectedFile: File | null = null;
  uploadedImageUrl: string = '';
  private uploadService = inject(ImageUploadService)
  @Output() imageUrl = new EventEmitter<string>();

  constructor() {
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadImage(file);
    }
  }

  uploadImage(file: File): void {
    this.uploadService.uploadImage(file).subscribe({
      next: (url: string) => {
        this.uploadedImageUrl = url;
        this.imageUrl.emit(url);
      },
      error: (error) => {
        console.error('Error uploading image:', error);
      }
    });
  }
}
