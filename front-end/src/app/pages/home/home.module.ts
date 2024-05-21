import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIconsModule } from '@ng-icons/core';
import { ionPersonCircleOutline, ionNewspaperOutline, ionSettingsOutline, ionLogOutOutline, ionNotificationsOutline } from '@ng-icons/ionicons';
import { heroAcademicCap } from '@ng-icons/heroicons/outline';
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
import { ionMenuSharp, ionSearchOutline } from "@ng-icons/ionicons";
import { SearchComponent } from "../../components/Search/Search.component";
import { AvatarMenuComponent } from "../../components/header/avatar-menu/avatar-menu.component";
import { AnnouncementComponent } from "../../components/header/announcement/announcement.component";


@NgModule({
    declarations: [
        LayOutComponent,
        HeaderComponent,
        SearchComponent,
        FooterComponent,
        SidebarComponent,
        HomeComponent,
        BlogComponent,
        LearningPathComponent,
        CourseComponent,

    ],
    imports: [
        AvatarMenuComponent,
        AnnouncementComponent,

        CommonModule,
        HomeRoutingModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        NgIconsModule.withIcons({ ionSearchOutline, ionMenuSharp, ionPersonCircleOutline, heroAcademicCap, ionNewspaperOutline, ionSettingsOutline, ionLogOutOutline, ionNotificationsOutline })
    ],
    exports: [],
    providers: [],
    bootstrap: [],
})

export class HomeModule { }