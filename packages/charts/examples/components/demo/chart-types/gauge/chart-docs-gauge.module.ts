import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { DEMO_PATH_TOKEN, NuiCommonModule, NuiDocsModule, NuiIconModule, NuiMessageModule } from "@nova-ui/bits";
import { NuiChartsModule } from "@nova-ui/charts";

import { DemoCommonModule } from "../../common/demo-common.module";

import { ChartDocsGaugeComponent } from "./chart-docs-gauge.component";
import { GaugeVisualTestComponent } from "./visual-test/gauge-visual-test.component";
import { HorizontalGaugeTesterComponent } from "./visual-test/horizontal/horizontal-gauge-tester.component";
import { RadialGaugeTesterComponent } from "./visual-test/radial/radial-gauge-tester.component";
import { VerticalGaugeTesterComponent } from "./visual-test/vertical/vertical-gauge-tester.component";

const exampleRoutes: Routes = [
    {
        path: "",
        component: ChartDocsGaugeComponent,
        data: {
            showThemeSwitcher: true,
        },
    },
    {
        path: "visual-test",
        component: GaugeVisualTestComponent,
        data: {
            "srlc": {
                "hideIndicator": true,
            },
        },
    },
];

@NgModule({
    declarations: [
        ChartDocsGaugeComponent,
        GaugeVisualTestComponent,
        HorizontalGaugeTesterComponent,
        RadialGaugeTesterComponent,
        VerticalGaugeTesterComponent,
    ],
    imports: [
        DemoCommonModule,
        FormsModule,
        NuiChartsModule,
        NuiCommonModule,
        NuiIconModule,
        NuiDocsModule,
        NuiMessageModule,
        RouterModule.forChild(exampleRoutes),
    ],
    providers: [
        { provide: DEMO_PATH_TOKEN, useFactory: () => (<any>require).context(`!!raw-loader!./`, true, /.*\.(ts|html|less)$/) },
    ],
})
export class ChartDocsGaugeModule {
}
