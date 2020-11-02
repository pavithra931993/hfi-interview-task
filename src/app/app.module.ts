import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; 

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { FirstComponent } from './components/component1/first.component';
import { SecondComponent } from './components/component2/second.component';
import { ToastComponent } from './components/toaster/toaster.component';
import { ToasterService } from './services/toaster.service';

const routes: Routes = [
	{ path: 'first', component: FirstComponent },
	{ path: 'second', component: SecondComponent }, 
	{ path: '', redirectTo: '/first', pathMatch: 'full' }
] 

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    MainComponent,
    FirstComponent,
    SecondComponent,
    ToastComponent
  ],
  providers: [ ToasterService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
