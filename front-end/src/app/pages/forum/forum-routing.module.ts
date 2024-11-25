import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ForumComponent } from "./forum.layout";
import { ForumHomePageComponent } from "./pages/forum-home-page/forum-home-page.component";
import { ForumTopicPageComponent } from "./pages/forum-topic-page/forum-topic-page.component";
import { ForumPostPageComponent } from "./pages/forum-post-page/forum-post-page.component";
import { ForumCreateTopicPageComponent } from "./pages/forum-create-topic-page/forum-create-topic-page.component";
import { ForumEditPostPageComponent } from "./pages/forum-edit-post-page/forum-edit-post-page.component";
import { loginGuardGuard } from "../../guard/LoginGuard.guard";



const routes: Routes = [
    {
        path: '',
        component: ForumComponent,
        children: [
            {
                path: '',
                component: ForumHomePageComponent,
            },
            {
                path: 'topic/:topicId',
                children: [
                    {
                        path: 'create',
                        component: ForumCreateTopicPageComponent,
                        canActivate: [loginGuardGuard]
                    },
                    {
                        path: '',
                        component: ForumTopicPageComponent,
                    }
                ]
            },
            {
                path: 'post/:postId',
                children: [
                    {
                        path: 'edit',
                        component: ForumEditPostPageComponent,
                    },
                    {
                        path: '',
                        component: ForumPostPageComponent,
                    }
                ]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ForumRoutingModule {

}