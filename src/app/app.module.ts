import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; 

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { FirstComponent } from './components/component1/first.component';
import { SecondComponent } from './components/component2/second.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ToastComponent } from './components/toaster/toast/toast.component';
import { PreventAutoCloseDirective } from './directives/toaster.directive';
import { ToasterService } from './services/toaster.service';

const routes: Routes = [
	{ path: 'first', component: FirstComponent },
	{ path: 'second', component: SecondComponent }, 
	{ path: '', redirectTo: '/first', pathMatch: 'full' }
] 

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    MainComponent,
    FirstComponent,
    SecondComponent,
    ToasterComponent,
    ToastComponent,
    PreventAutoCloseDirective
  ],
  providers: [ ToasterService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
