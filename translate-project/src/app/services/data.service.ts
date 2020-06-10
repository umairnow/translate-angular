import { Injectable } from '@angular/core';
import { TranslateModel } from '../Interfaces/translate-modal';

@Injectable({
  providedIn: 'root'
})
export class DataService {

   EXAMPLE_DATA: TranslateModel[] = [
    {id: '1', key: 'FP_LOGIN',  enText: 'Log in', noText: 'Logg inn', svText: 'Logga in'},
    {id: '2', key: 'FP_ENPASS', enText: 'Enter Password', noText: 'Angi Passord', svText: 'Ange lösenord'},
    {id: '3', key: 'FP_ENUSER', enText: 'Enter Username', noText: 'Angi Brukernavn', svText: 'Ange anvendarnamn'},
    {id: '4', key: 'TR_LOGOUT', enText: 'Log Out', noText: 'Logg ut', svText: 'Logga ut'}
  ];

constructor() { }

getTranslationData(): TranslateModel[] {
  return this.EXAMPLE_DATA;
}

}
