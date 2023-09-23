import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  addItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key)
  }

  deleteItem(key: string): void {
    localStorage.removeItem(key)
  }

  clear(): void {
    localStorage.clear();
  }
}
