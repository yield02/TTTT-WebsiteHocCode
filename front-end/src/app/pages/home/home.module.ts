import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from "@angular/forms";



import { HomeRoutingModule } from "./home-routing.module";
import { LayOutComponent } from "./layout.component";
import { HomeComponent } from "./home/home.component";
import { BlogComponent } from "./blog/blog.component";
import { LearningPathComponent } from "./learningPath/learningPath.component";
import { CourseComponent } from "./course/course.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { SearchComponent } from "../../components/Search/Search.component";
import { LoginComponent } from "../../components/login/login.component";


@NgModule({
    declarations: [
        BlogComponent,
        LearningPathComponent,

    ],
    imports: [
        HeaderComponent,
        SidebarComponent,
        SearchComponent,
        HomeComponent,
        CourseComponent,



        CommonModule,
        HomeRoutingModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,

    ],
    exports: [],
    providers: [LoginComponent],
    bootstrap: [],
})

export class HomeModule { }