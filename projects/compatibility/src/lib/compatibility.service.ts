import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompatibilityService {

  constructor() { }

  // Función para almacenar un elemento temporalmente en localStorage
  putTemporalItem(key: string, value: any, expirationTime: any) {
    const item = {
      value: value,
      expiry: expirationTime ? new Date().getTime() + expirationTime : null
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  // Función para almacenar un elemento permanentemente en localStorage
  putItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Función para obtener un elemento temporalmente almacenado en localStorage
  getTemporalItem(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    if (item.expiry && new Date().getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  // Función para obtener un elemento permanentemente almacenado en localStorage
  getItem(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    return JSON.parse(itemStr);
  };

  // Función para eliminar un elemento de localStorage
  delItem(key: string) {
    localStorage.removeItem(key);
  };

  // Función para almacenar un elemento permanentemente en localStorage y devolver su URL
  putReturnUrl(key: string, value: any) {
    const url = URL.createObjectURL(new Blob([JSON.stringify(value)], { type: "application/json" }));
    localStorage.setItem(key, url);
    return url;
  };
};
