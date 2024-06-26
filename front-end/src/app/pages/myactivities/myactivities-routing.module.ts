import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ForumComponent } from "./myactivities.layout";
import { CoursesComponent } from "./components/courses/courses.component";
import { MycoursesComponent } from "./components/mycourses/mycourses.component";
import { MypostComponent } from "./components/mypost/mypost.component";
import { CourseManagerComponent } from "./components/mycourses/courseManager/courseManager.component";
import { CourseEditComponent } from "./components/mycourses/courseEdit/courseEdit.component";



const routes: Routes = [
    {
        path: '',
        component: ForumComponent,
        children: [
            {
                path: 'courses',
                component: CoursesComponent
            },
            {
                path: 'mycourses',
                children: [
                    {
                        path: 'manager/:courseid',
                        component: CourseManagerComponent
                    },
                    {
                        path: 'edit/:courseid',
                        component: CourseEditComponent
                    },
                    {
                        path: '',
                        component: MycoursesComponent,

                    }]
            },
            {
                path: 'mypost',
                component: MypostComponent
            },
            {
                path: '',
                redirectTo: '/myactivities/courses',
                pathMatch: 'full'
            }

        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class MyActivitiesRoutingModule {

}