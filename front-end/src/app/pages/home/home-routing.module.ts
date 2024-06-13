import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { LearningPathComponent } from "./learningPath/learningPath.component";
import { BlogComponent } from "./blog/blog.component";
import { LayOutComponent } from "./layout.component";
import { CourseComponent } from "./course/course.component";


const routes: Routes = [
    {
        path: '',
        component: LayOutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'learning-path',
                component: LearningPathComponent
            },
            {
                path: 'blog',
                component: BlogComponent
            },
            {
                path: 'course',
                component: CourseComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class HomeRoutingModule {

}