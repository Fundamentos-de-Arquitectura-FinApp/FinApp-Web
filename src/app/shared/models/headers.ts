import {HttpHeaders} from '@angular/common/http';

export function returnHeaders() {
  const token = localStorage.getItem('token');
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}
