import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';

LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res));

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ZXingScannerModule,
    NgxScannerQrcodeModule
  ],
  declarations: [HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
