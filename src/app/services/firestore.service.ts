import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  qrCreditoCollectionsreference: any;
  qrUsuarios: Observable<any>;

  qrUserCurrent : any;

  constructor(private angularF : AngularFirestore, private AngularFS : AngularFireStorage, public as : AuthService) 
  {
    this.qrCreditoCollectionsreference = this.angularF.collection<any>('qrCredito');
    this.qrUsuarios = this.qrCreditoCollectionsreference.valueChanges({idField: 'id'});
  }

  modificarUsuario(usuario : any, id: any){
    return this.angularF.collection('qrCredito').doc(id).update(usuario);
  }

  traerUsuarios()
  {
    return this.qrUsuarios;
  }

}