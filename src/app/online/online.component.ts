import { Component, OnInit } from '@angular/core';
//import { Component,TemplateRef,OnInit,Inject  } from '@angular/core';
//import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
//import { DOCUMENT } from '@angular/common';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import  { ApirouterService } from '../apirouter.service';
@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnlineComponent implements OnInit {

  title = 'myapp';
  //singleModel={};
  model: any = {};
  value:number=0;
  modalReference = null;
  modalReferencecart=null;
  KEY='user_id';
  login_page = true;
  logout_page=false;
  productlist:any=[];
  res:any=[];
  cartlist:any=[];
  cartlist1:any=[];
  logmsg="";
 // modalRef: BsModalRef | null;
  //modalRef2: BsModalRef;
  constructor(private modalService: NgbModal,public session: SessionStorageService,public apiRouter:ApirouterService) {
   // console.log(document.getElementById('content'));
  } 
  popup(content)
  {
  this.modalReference = this.modalService.open(content, {size: 'lg', centered: true });
  }
 
  popupout()
  {
    this.session.remove(this.KEY);
    this.login_page = true;
    this.logout_page=false;
    this.value=0;
    console.log(this.value);
  }
  popupcart(cart)
  { 
  this.modalReferencecart = this.modalService.open(cart, {size: 'lg', centered: true });
  }
  popupcartclose()
  {
    this.modalReferencecart.close();
  }
  grand()
  {
    console.log(this.apiRouter.userdetails.cartlist);
    var total=0;
    total=this.apiRouter.userdetails.cartlist.reduce( function(cnt,o){
      console.log(cnt,o)
       return cnt + (o.price*o.qty); 
      }, 0)
      return total;
 }
  reset(con:NgForm)
  {
   
    con.resetForm();
  }
  onSubmit(form) {
    console.log(this.model);
    var url="https://my-json-server.typicode.com/venmani1992/cart/user?username="+this.model.username+"&&email="+this.model.email;
    fetch(url)
    .then(response => response.json())
     .then(json => {
       this.res=json;
        
        if(this.res!=''&&this.res.length>0){

          this.logmsg="";
          form.resetForm();
          this.modalReference.close();
          this.value=this.res[0].id;
          this.apiRouter.userdetails = this.res[0];
          //this.value=this.res[0].id;
          this.session.set(this.KEY,this.value);
          this.login_page = false;
          this.logout_page=true;
          //console.log(this.res);
         // console.log(this.apiRouter);
         // console.log(this.apiRouter.user_id);
        }
        else{
          
          this.logmsg="Invalid Login Credentials"
          setTimeout(()=>this.logmsg='',3000);
          form.resetForm();
        }
      }
     );
   // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }
  addcart(val,cont)
  {
    console.log(this.value);
     console.log(val);
     console.log(cont)
     if(this.value==0 || this.value==null){
      // console.log(content:TemplateRef<any>);
      //popup(content);
      this.modalReference = this.modalService.open(cont, {size: 'lg', centered: true });
      }
      else{
         this.cartlist.push(val)
        var count = 0;
        this.cartlist.forEach((v) => (v === val && count++));
        console.log(count);
        val.qty=count;
        this.cartlist1.push(val);
        console.log(this.cartlist1)
        var unique = this.cartlist1
         .map((e, i, final) => final.indexOf(e) === i && i)
          .filter(obj=> this.cartlist1[obj])//display unique index
           .map(e => this.cartlist1[e]);
           console.log(unique);
       var urlupdate="https://my-json-server.typicode.com/venmani1992/cart/user/"+this.value;
       fetch(urlupdate, {
        method: 'PUT',
        body: JSON.stringify({
          username: this.apiRouter.userdetails.username,
          id: this.apiRouter.userdetails.id,
          email: this.apiRouter.userdetails.email,
          cartlist: unique
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log(json.cartlist.length)
        this.apiRouter.cartlength=json.cartlist.length;
        this.apiRouter.userdetails=json;
        console.log(this.apiRouter.userdetails);
         }
      )
        
      
        
      }
  }
  
  ngOnInit() {  
    fetch('https://my-json-server.typicode.com/venmani1992/cart/product')
  .then(response => response.json())
  .then(json => {this.productlist=json
  console.log(this.productlist)})
  this.value = this.session.get(this.KEY);
      console.log(this.value);
  if(this.value>0){
    var iniurl="https://my-json-server.typicode.com/venmani1992/cart/user/"+this.value;
    fetch(iniurl)
  .then(response => response.json())
  .then(json => {console.log(json)
    this.apiRouter.userdetails=json;
  })
    console.log(this.value)
    this.login_page = false;
    this.logout_page=true;
  }
  }

}
