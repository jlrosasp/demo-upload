// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// DropZone Modules
import { NgxDropzoneModule } from 'ngx-dropzone';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Components
import { AppComponent } from './app.component';
import { HtmlPipe } from './pipes/html.pipe';
import { LoadingComponent } from './components/navigation/loading/loading.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HtmlPipe,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxDropzoneModule,
    NgbModule,
    NgbAlertModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
