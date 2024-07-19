import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MyActivitiesRoutingModule } from "./myactivities-routing.module";
import { ForumComponent } from "./myactivities.layout";
import { HeaderComponent } from "../../components/header/header.component";
import { SearchComponent } from "../../components/Search/Search.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";



@NgModule({
    declarations: [
        ForumComponent,
    ],
    imports: [
        HeaderComponent,
        SidebarComponent,
        SearchComponent,


        CommonModule,
        MyActivitiesRoutingModule,
    ],
    exports: [],
    providers: [],
    bootstrap: [],
})

export class MyActivitiesModule { }