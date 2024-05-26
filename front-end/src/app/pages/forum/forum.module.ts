import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ForumRoutingModule } from "./forum-routing.module";
import { ForumComponent } from "./forum.layout";
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { SearchComponent } from "../../components/Search/Search.component";



@NgModule({
    declarations: [
        ForumComponent
    ],
    imports: [
        HeaderComponent,
        SidebarComponent,
        SearchComponent,


        CommonModule,
        ForumRoutingModule,
    ],
    exports: [],
    providers: [],
    bootstrap: [],
})

export class ForumModule { }