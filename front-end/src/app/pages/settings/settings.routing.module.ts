import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SettingsComponent } from "./settings.component";
import { AccInformationComponent } from "./components/acc-information/acc-information.component";
import { SecureComponent } from "./components/secure/secure.component";



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
            },
            {
                path: 'security',
                component: SecureComponent
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