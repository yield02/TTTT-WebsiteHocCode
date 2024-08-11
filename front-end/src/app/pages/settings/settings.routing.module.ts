import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SettingsComponent } from "./settings.component";
import { AccInformationComponent } from "./components/acc-information/acc-information.component";
import { SecureComponent } from "./components/secure/secure.component";
import { RequiredInformationComponent } from "./components/required-information/required-information.component";
import { AddRequiredInformation } from "../../guard/AddRequiredInformation.guard";



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
            },
            {
                path: 'required-information',
                component: RequiredInformationComponent,
                canMatch: [AddRequiredInformation],
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