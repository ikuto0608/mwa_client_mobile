import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptHttpModule } from 'nativescript-angular/http';

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from './app.routing';

import { ExamService } from './shared/services/exam.service';

import { TimesPipe } from './shared/pipes/times.pipe';
import { FormatMMSSSSPipe } from './shared/pipes/formatMMSSSS.pipe';

import { GradientDirective } from './shared/directives/gradient.directive';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
    TimesPipe,
    FormatMMSSSSPipe,
    GradientDirective,
    ...navigatableComponents,
  ],
  providers: [ExamService],
  bootstrap: [AppComponent],
})
export class AppModule { }
