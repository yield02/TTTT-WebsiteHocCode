import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SettingsComponent } from "./settings.component";
import { AccInformationComponent } from "./components/acc-information/acc-information.component";



const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            {
                path: '',
                component: AccInformationComponent
            },
            {
                path: 'information',
                component: AccInformationComponent
            }
        ],
    },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class SettingsRoutingModule {

}