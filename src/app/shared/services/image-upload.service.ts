import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {v4 as uuidv4} from 'uuid';
import {getDownloadURL} from '@angular/fire/storage';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  uploadedFileURL: string = "";
  basePath = "images/";

  constructor(private storage: AngularFireStorage) {
  }

  uploadImage(file: File): Observable<string> {
    const filePath = this.basePath + uuidv4() + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    return from(this.uploadFileAndGetUrl(task));
  }

  private async uploadFileAndGetUrl(task: any): Promise<string> {
    try {
      await task;
      return await getDownloadURL(task.task.snapshot.ref);
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      throw error;
    }
  }
}
