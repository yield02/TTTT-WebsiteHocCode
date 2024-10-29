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
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';


const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'app-name/assets', // configure base path for monaco editor. Starting with version 8.0.0 it defaults to './assets'. Previous releases default to '/assets'
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => { console.log((<any>window).monaco); }, // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
  requireConfig: { preferScriptTags: true }, // allows to oweride configuration passed to monacos loader
  monacoRequire: (<any>window).monacoRequire // pass here monacos require function if you loaded monacos loader (loader.js) yourself 
};

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
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    EffectsModule.forRoot(effects),
    MonacoEditorModule.forRoot(),
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