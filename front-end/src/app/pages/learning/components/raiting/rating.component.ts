import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { AppState } from '../../../../store/reducer';
import { CreateRating } from '../../../../store/rating/rating.action';

@Component({
    selector: 'app-rating',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        RatingModule,
        InputTextareaModule,
        ReactiveFormsModule,
    ],
    templateUrl: './rating.component.html',
    styleUrl: './rating.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {

    form: FormGroup;
    message: string = '';

    constructor(private _fb: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig, private _store: Store<AppState>) {
        this.form = this._fb.group({
            rating: [0, Validators.min(1)],
            description: [''],
        })
    }


    onSubmit() {

        if (!this.form.valid) {
            this.message = 'Số sao tối thiểu là 1';
            return;
        }


        this._store.dispatch(CreateRating({
            rating: {
                course_id: this.config.data.course_id,
                star: this.form.get('rating')?.value,
                description: this.form.get('description')?.value,
            }
        }));

        this.ref.close();
    }

    onClose() {
        this.ref.close(null);
    }

}
