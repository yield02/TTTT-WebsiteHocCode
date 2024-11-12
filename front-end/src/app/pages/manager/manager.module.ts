import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EditorComponent } from "@tinymce/tinymce-angular";
import { ManagerRoutingModule } from "./manager-routing.module";




@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        ManagerRoutingModule,
    ],
    exports: [],
    providers: [EditorComponent],
    bootstrap: [],
})

export class ManagerModule { }