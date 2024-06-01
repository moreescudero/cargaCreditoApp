import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ScannerService } from 'src/app/services/scanner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  apretado: boolean = false;
  credito : number ;
  usuario : any;

  lectira : any;

  public scannerEnabled: boolean = false;
  public information: string = "No se  detectado información de ningún código. Acerque un código QR para escanear.";

  qr10 : string = '8c95def646b6127282ed50454b73240300dccabc';
  qr50 : string = 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172';
  qr100 : string = '2786f4877b9091dcad7f35751bfcf5d5ea712b2f';
  
  constructor(private auth: AngularFireAuth, private router: Router, public scanner : ScannerService,
  public fs : FirestoreService, private toastController : ToastController, public as : AuthService) {}
    
  ngOnInit(): void {
 /*    this.usuario = this.fs.qrUserCurrent;
    this.credito = this.usuario.credito; */
    this.fs.traerUsuarios().subscribe(value => {
      let array  : any = value;
      for (const iterator of array) {
        console.log(iterator);
        if(iterator.email == this.as.logeado.email){
          this.usuario = iterator;
          this.credito = this.usuario.credito;
          break;
        }
      }
    });
  }
  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = "Espera recuperando información... ";

    this.information = $event;
    console.log(this.information);
    this.verificarSaldo(this.information);
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "No se  detectado información de ningún código. Acerque un código QR para escanear.";
  }

  escanear(){
    /* this.scanner.test().then((a)=>{
      this.scanner.stopScan();
      let modificar = this.verificarSaldo(a);
      if(modificar){
        this.apretado = true;
        setTimeout(() => {
          this.fs.modificarUsuario(this.usuario,this.usuario.id);
          this.apretado = false;
        }, 3000);
      }
      else{
        this.apretado = true;
        setTimeout(() => {
          this.MostrarToastError('Error al cargar credito.').then((toast : any )=>{
            toast.present();
          })
          this.apretado = false;
        }, 3000);
      }
    }); */
    this.scanner.test().then((a)=>{
      this.scanner.stopScan();
      this.lectira = a;
    })
  }

  verificarSaldo(a : string){
    if(this.usuario.perfil == 'admin'){
      if(a == this.qr10 && this.usuario.qr10 < 2){
        this.usuario.credito += 10;
        this.usuario.qr10++;
        return true;
      }
      else if(a == this.qr50 && this.usuario.qr50 < 2){
        this.usuario.credito += 50;
        this.usuario.qr50++;
        return true;
      }
      else if(a == this.qr100 && this.usuario.qr100 < 2){
        this.usuario.credito += 100;
        this.usuario.qr100++;
        return true;
      }
    }else{
      if(a == this.qr10 && this.usuario.qr10 < 1){
        this.usuario.credito += 10;
        this.usuario.qr10++;
        return true;
      }
      else if(a == this.qr50 && this.usuario.qr50 < 1){
        this.usuario.credito += 50;
        this.usuario.qr50++;
        return true;
      }
      else if(a == this.qr100 && this.usuario.qr100 < 1){
        this.usuario.credito += 100;
        this.usuario.qr100++;
        return true;
      }
    }
    return false;
  }

  reiniciarSaldo(){
    this.apretado = true;
    setTimeout(() => {
      this.usuario.credito = 0;
      this.usuario.qr10 = 0;
      this.usuario.qr50 = 0;
      this.usuario.qr100 = 0;

      this.fs.modificarUsuario(this.usuario,this.usuario.id).then(()=>{
        this.MostrarToast('Credito reiniciado correctamente.').then((toast : any )=>{
          toast.present();
        });
      });
      this.apretado = false;
    }, 3000);
  }

  logOut(){
    this.auth.signOut().then(()=>{

      this.apretado = true;

      setTimeout(()=>{
        
        this.router.navigate(["/login"]);

        this.apretado = false;
        
      },2000);
    });
  }

  MostrarToast(message : string)
  {
    return this.toastController.create({
            header: 'Exito',
            message: message,
            buttons: ['Ok'],
            position: 'top',
            color: 'success'
    });
  }

  MostrarToastError(message : string)
  {
    return this.toastController.create({
            header: 'Error',
            message: message,
            buttons: ['Ok'],
            position: 'top',
            color: 'danger'
    });
  }

}