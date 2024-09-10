import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ForumComponent } from "./forum.layout";
import { ForumHomePageComponent } from "./pages/forum-home-page/forum-home-page.component";
import { ForumTopicPageComponent } from "./pages/forum-topic-page/forum-topic-page.component";
import { ForumPostPageComponent } from "./pages/forum-post-page/forum-post-page.component";



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
                component: ForumTopicPageComponent,
            },
            {
                path: 'post/:postId',
                component: ForumPostPageComponent,
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