import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { toastController } from '@ionic/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  clave: string;
  apretado: boolean = false;

  constructor(private auth: AngularFireAuth, private router: Router, public toast: ToastController, public as : AuthService) { }

  ngOnInit() {
  }

  iniciarSesion(){
    this.as.login(this.email,this.clave);
  }

  inicioRapido(a){
    switch (a) {
      case 1:
        this.email = "usuarioTest@gmail.com";
        this.clave = "123456";
      break;

      case 2:
        this.email = "adminTest@gmail.com";
        this.clave = "123456";
      break;

      case 3:
        this.email = "invitadoTest@gmail.com";
        this.clave = "123456";
      break;
      case 4:
        this.email = "";
        this.clave = "";
      break;
    }
  }

}
