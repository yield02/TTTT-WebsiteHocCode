import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ManagerLayoutComponent } from "./manager.layout.component";
import { CourseManagerComponent } from "./components/course-manager/course-manager.component";
import { CommentManagerComponent } from "./components/comment-manager/comment-manager.component";
import { PostManagerComponent } from "./components/post-manager/post-manager.component";
import { ReportManagerComponent } from "./components/report-manager/report-manager.component";
import { OverviewManagerComponent } from "./components/overview-manager/overview-manager.component";
import { UserManagerComponent } from "./components/user-manager/user-manager.component";




const routes: Routes = [
    {
        path: '',
        component: ManagerLayoutComponent,
        children: [
            {
                path: 'overview',
                component: OverviewManagerComponent,
            },
            {
                path: 'courses',
                component: CourseManagerComponent,
            },
            {
                path: 'comments',
                component: CommentManagerComponent,
            },
            {
                path: 'posts',
                component: PostManagerComponent,
            },
            {
                path: 'reports',
                component: ReportManagerComponent,
            },
            {
                path: 'users',
                component: UserManagerComponent,
            },
            {
                path: '**',
                redirectTo: 'overview',
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ManagerRoutingModule {

}