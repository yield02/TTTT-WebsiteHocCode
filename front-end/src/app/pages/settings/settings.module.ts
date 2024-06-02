import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SettingsComponent } from "./settings.component";
import { SettingsRoutingModule } from "./settings.routing.module";




@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        SettingsComponent,

    ],
    exports: [],
    providers: [],
    bootstrap: [],
})

export class SettingsModule { }