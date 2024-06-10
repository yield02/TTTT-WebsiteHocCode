import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SettingsComponent } from "./settings.component";
import { SettingsRoutingModule } from "./settings.routing.module";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";




@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        HeaderComponent,
        SidebarComponent,
    ],
    exports: [],
    providers: [],
    bootstrap: [],
})

export class SettingsModule {

}