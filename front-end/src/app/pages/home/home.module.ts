import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";
import { LayOutComponent } from "./layout.component";
import { HomeComponent } from "./home/home.component";
import { MatButtonModule } from '@angular/material/button';
import { BlogComponent } from "./blog/blog.component";
import { LearningPathComponent } from "./learningPath/learningPath.component";
import { CourseComponent } from "./course/course.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@NgModule({
    declarations: [
        LayOutComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        HomeComponent,
        BlogComponent,
        LearningPathComponent,
        CourseComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MatButtonModule
    ],
    exports: [],
    providers: [],
    bootstrap: [],
})

export class HomeModule { }