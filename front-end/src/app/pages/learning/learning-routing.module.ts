import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LearningComponent } from "./learning.component";



const routes: Routes = [
    {
        path: '',
        component: LearningComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class LearningRoutingModule {

}