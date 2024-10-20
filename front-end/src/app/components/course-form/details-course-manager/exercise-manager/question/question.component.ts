import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Question } from '../../../../../models/Question';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { EditorComponent, EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Editor } from 'tinymce';
import { CheckboxModule } from 'primeng/checkbox';





@Component({
    selector: 'study-question',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        FormsModule,
        EditorModule,
        RadioButtonModule,
        CheckboxModule
    ],
    providers: [
        { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
    ],
    templateUrl: `./question.component.html`,
    styleUrls: ['./question.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnInit {
    _question!: Question;

    @Input() set question(value: Question) {
        this._question = {
            ...value,
            testKey: value.testKey ? value.testKey.map(key => ({ ...key })) : [],
            answer: value.answer ? value.answer.map(answer => answer) : [],
            options: value.options ? value.options.map(option => option) : [],
        }; // Create a mutable copy of the question object and its testKey array
    }

    get question(): Question {
        return this._question;
    }

    @Input() index!: number;

    @Output() removeQuestionEvent: EventEmitter<number> = new EventEmitter();
    @Output() updateQuestionEvent: EventEmitter<{ question: Question, index: number }> = new EventEmitter();

    @ViewChild('questionElement') questionRef!: ElementRef;

    focusing: boolean = true;


    questionType: { name: string, code: 'code' | 'choice' | 'multichoice' }[] = [{
        name: 'Code',
        code: 'code',
    }, {
        name: 'Trắc nghiệm',
        code: 'choice',
    }, {
        name: 'Nhiều lựa chọn',
        code: 'multichoice',
    }]


    content: EditorComponent['init'] = {
        menubar: false,
        statusbar: false,
        resize: true,
        placeholder: 'Nội dung câu hỏi',
        autoresize_on_init: true,
        plugins: [
            'image',
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'code',
            'insertdatetime',
            'table',
            'code',
            'help',
            'codesample',
            'autoresize'
        ],
        toolbar:
            'codesample | undo redo | fontsizeinput | fontfamily |' +
            'bold italic forecolor backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' + '| image |' +
            'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        font_size_input_default_unit: 'px',
        init_instance_callback: (editor) => {
            editor.container.querySelector('.tox-editor-header')?.classList.add('!hidden');
            editor.on('focus', () => {
                editor.container.querySelector('.tox-editor-header')?.classList.remove('!hidden');
                this.focusQuestion();
                this._changeDetector.detectChanges()
            });
            editor.on('blur', () => {
                editor.container.querySelector('.tox-editor-header')?.classList.add('!hidden');
            });
        }
    }

    explain: EditorComponent['init'] = {
        menubar: false,
        statusbar: false,
        resize: true,
        placeholder: 'Giải thích câu trả lời',
        autoresize_on_init: true,
        plugins: [
            'image',
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'code',
            'insertdatetime',
            'table',
            'code',
            'help',
            'codesample',
            'autoresize'
        ],
        toolbar:
            'codesample | undo redo | fontsizeinput | fontfamily |' +
            'bold italic forecolor backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' + '| image |' +
            'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        font_size_input_default_unit: 'px',
        init_instance_callback: (editor) => {
            editor.container.querySelector('.tox-editor-header')?.classList.add('!hidden');
            editor.on('focus', () => {
                editor.container.querySelector('.tox-editor-header')?.classList.remove('!hidden');
                this.focusQuestion();
                this._changeDetector.detectChanges()
            });
            editor.on('blur', () => {
                editor.container.querySelector('.tox-editor-header')?.classList.add('!hidden');
            });
        }
    }





    @HostListener('document:click', ['$event'])
    onGlabalClick(event: MouseEvent) {
        if (!this.questionRef.nativeElement.contains(event.target as Node)) {
            if (this.focusing) {
                this.updateQuestion();
            }
            this.blurQuestion();
        }
        else {
            this.focusQuestion();
        }
    }


    constructor(private _changeDetector: ChangeDetectorRef) { }

    ngOnInit(): void {
    }

    removeQuestion() {
        this.removeQuestionEvent.emit(this.index);
    }


    updateQuestion() {
        if (this._question.type === 'code') {
            this._question.answer = [];
            this._question.options = [];
        }
        else if (this._question.type === 'choice') {
            this._question.testKey = [];
            this._question.answer = [this._question.answer![0] as string];
        }
        else {
            this._question.testKey = [];
        }
        this.updateQuestionEvent.emit({ question: this._question, index: this.index });
    }

    focusQuestion() {
        this.focusing = true;
    }
    blurQuestion() {
        this.focusing = false;
    }

    addTestKey() {
        this._question.testKey?.push({ input: '', output: '' });
    }
    deleteTestKey(index: number) {
        this._question.testKey?.splice(index, 1);
    }

    addChoice() {
        this._question.options?.push('');
        this._question.answer?.push(false);
    }
    deleteChoice(index: number) {
        this._question.options?.splice(index, 1);
        this._question.answer?.splice(index, 1);
    }

    updateChoiceValue(event: any, index: number) {
        let value = event.target.value;
        this._question.options![index] = value;
    }
}
