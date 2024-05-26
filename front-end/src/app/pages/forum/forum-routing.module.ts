import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ForumComponent } from "./forum.layout";



const routes: Routes = [
    {
        path: '',
        component: ForumComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ForumRoutingModule {

}