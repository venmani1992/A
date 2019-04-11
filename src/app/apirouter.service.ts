import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApirouterService {
  user_id =0;
  userdetails:any={};
  cartlength=0;
  constructor() { }
}
