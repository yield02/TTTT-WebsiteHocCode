import { ChangeDetectionStrategy, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import reducers from './store/reducer';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EffectsModule } from '@ngrx/effects';
import effects from './effects';
import { EditorComponent, EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ToastModule
  ],
  providers: [MessageService, EditorComponent, { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
  bootstrap: [AppComponent],
})
export class AppModule {

}