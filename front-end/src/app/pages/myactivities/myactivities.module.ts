import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MyActivitiesRoutingModule } from "./myactivities-routing.module";
import { ActivitiesComponent } from "./myactivities.layout";
import { HeaderComponent } from "../../components/header/header.component";
import { SearchComponent } from "../../components/Search/Search.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TooltipModule } from "primeng/tooltip";
import { EditorComponent } from "@tinymce/tinymce-angular";



@NgModule({
    declarations: [
        ActivitiesComponent,
    ],
    imports: [
        HeaderComponent,
        SidebarComponent,
        SearchComponent,




        CommonModule,
        MyActivitiesRoutingModule,
    ],
    exports: [],
    providers: [EditorComponent],
    bootstrap: [],
})

export class MyActivitiesModule { }