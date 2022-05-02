
import { Injectable } from '@angular/core';
import { User } from 'src/models/logged-user';
import { StorageService } from 'src/services/storage.service';

const LOGGED_USER = 'PEPSICO_LOGGED_USER';

@Injectable({
    providedIn: 'root'
  })
export class LocalStorageHelper {

    constructor(private storageService: StorageService) { }


     public setItemToLocalStorage(item: string, value: string) {
        this.storageService.secureStorage.setItem(item, value);
    }

    public getItemFromLocalStorage(item: string): string {
        return this.storageService.secureStorage.getItem(item);
    }

    public removeItemFromLocalStorage(item: string){
        sessionStorage.removeItem(item);
    }
    public clearStorage() {
        return this.storageService.secureStorage.clear();
    }

    public setLoggedUserInfo(loggedUser: User) {
        if (loggedUser === null) {
            sessionStorage.removeItem(LOGGED_USER);
        } else {
            const jsonData = JSON.stringify(loggedUser);
            this.storageService.secureStorage.setItem(LOGGED_USER, jsonData);
        }
    }

    public getLoggedUserInfo(): User {
        const userInfo = this.storageService.secureStorage.getItem(LOGGED_USER);
        if (userInfo === null) {
            return userInfo;
        }
        const loggedUser: User = JSON.parse(userInfo);
        return loggedUser;
    }


    public setData(key: string,data:any) {
        const jsonData = JSON.stringify(data);
        this.storageService.secureStorage.setItem(key, jsonData);
    }

    public getData(key:string): any {
        const data = this.storageService.secureStorage.getItem(key);
        if (data === null) return null;
        return JSON.parse(data);
    }

}
