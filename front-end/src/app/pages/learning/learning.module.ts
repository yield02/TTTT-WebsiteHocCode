import { CommonModule } from "@angular/common";
import { Directive, NgModule } from "@angular/core";
import { LearningRoutingModule } from "./learning-routing.module";
import { EditorComponent } from "@tinymce/tinymce-angular";



@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        LearningRoutingModule,
    ],
    exports: [],
    providers: [EditorComponent],
    bootstrap: [],
})

export class LearningModule { }