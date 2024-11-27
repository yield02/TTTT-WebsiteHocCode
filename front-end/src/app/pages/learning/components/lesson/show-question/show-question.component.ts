import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Question } from '../../../../../models/Question';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { ButtonModule } from 'primeng/button';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronLeft, heroChevronRight } from '@ng-icons/heroicons/outline';
import { DropdownModule } from 'primeng/dropdown';
import { StudyFileItemComponent } from './file-item/file-item.component';
import { ExecuteCodeService } from '../../../../../services/executeCode.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Exercise } from '../../../../../models/Exercise';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../../../../store/reducer';
import { Store } from '@ngrx/store';
import { createExercise, createOrUpdateExercise, updateExercise } from '../../../../../store/exercise/exercise.actions';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'study-show-question',
    standalone: true,
    imports: [
        CommonModule,
        EditorModule,
        ButtonModule,
        MonacoEditorModule,
        FormsModule,
        NgIconComponent,
        DropdownModule,
        ProgressSpinnerModule,

        StudyFileItemComponent,
    ],
    providers: [MonacoEditorModule, provideIcons({
        heroChevronLeft, heroChevronRight,
    })],
    templateUrl: `./show-question.component.html`,
    styleUrl: './show-question.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowQuestionComponent implements OnInit, OnDestroy {

    @Input() question!: Question;
    exercise: Exercise = {
        question_id: '',
        author_id: '',
        course_id: '',
        lesson_id: '',
        chapter_id: '',
        code: [],
        status: false,
        language: '',
    }

    isCheckAnswer: boolean = false;
    runningCode: boolean = false;
    answer?: (boolean | string)[] = [];

    editorOptions = { theme: 'vs-dark', language: 'nodejs' };
    codeList: string[] = [
        "typescript",
        "nodejs",
        "bootstrap",
        "cpp",
        "c",
        "csharp",
        "java",
        "javascript",
        "html",
        "jquery",
        "ada",
        "assembly",
        "backbonejs",
        "bash",
        "basic",
        "brainfk",
        "bulma",
        "clojure",
        "cobol",
        "coffeescript",
        "commonlisp",
        "d",
        "ejs",
        "elixir",
        "erlang",
        "fsharp",
        "fortran",
        "foundation",
        "go",
        "groovy",
        "haskell",
        "jshell",
        "kotlin",
        "lua",
        "mariadb",
        "materialize",
        "sqlserver",
        "milligram",
        "mongodb",
        "mysql",
        "objectivec",
        "ocaml",
        "octave",
        "oracle",
        "plsql",
        "paperCss",
        "pascal",
        "perl",
        "php",
        "postgresql",
        "prolog",
        "python",
        "python2",
        "r",
        "racket",
        "redis",
        "ruby",
        "rust",
        "scala",
        "semanticUI",
        "skeleton",
        "sqlite",
        "swift",
        "tcl",
        "text",
        "uikit",
        "vb",];
    currentFileIndex: number = 0;
    files: {
        filename: string;
        content: string;
        language: string;
    }[] = [{
        filename: 'main.js',
        content: `console.log('Hello World!');`,
        language: 'javascript',
    }];
    codeError: string = '';
    codeEditor: any;


    initEditor: EditorComponent['init'] = {
        menubar: false,
        statusbar: false,
        toolbar: false,
        editable_root: false,
        base_url: '/tinymce',
        suffix: '.min',
        resize: 'both',
        autoresize_on_init: true,
        plugins: [
            'image',
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'codesample',
            'autoresize'
        ],
    }

    subscriptions: Subscription[] = [];

    constructor(
        private _dynamicDialogRef: DynamicDialogRef,
        private _dynamicDialogConfig: DynamicDialogConfig,
        private _changeDetector: ChangeDetectorRef,
        private _executeCodeSerive: ExecuteCodeService,
        private _activateRoute: ActivatedRoute,
        private _store: Store<AppState>,
        private _messageService: MessageService,
    ) { }

    ngOnInit(): void {


        const cousre_id = this._activateRoute.snapshot.params['courseId'];
        const lesson_id = this._activateRoute.snapshot.queryParams['lesson_id'];
        const chapter_id = this._activateRoute.snapshot.queryParams['chapter_id'];

        this.question = { ...this._dynamicDialogConfig.data?.question };


        if (this._dynamicDialogConfig.data?.exercise) {
            this.exercise = { ...this._dynamicDialogConfig?.data?.exercise };
            this.files = [...this.exercise.code];
            this.answer = [...this.exercise.answer || []];
            if (this.exercise.status) {
                this.isCheckAnswer = true;
            }
        }
        else {
            this.exercise = {
                question_id: this.question._id,
                author_id: '',
                course_id: this.question.course_id!,
                lesson_id: this.question.lesson_id!,
                chapter_id: chapter_id,
                code: [],
                status: false,
                language: this.question?.language!
            }
        }

        console.log(this.exercise);


        this.editorOptions = {
            ...this.editorOptions,
            language: this.question?.language || 'nodejs',
        };
        this.files[0].language = this.question?.language || 'nodejs';
    }

    InitEditor(editor: any) {
        this.codeEditor = editor;
        console.log('init');
    }




    onAnswerChange(option: string, index: number): void {
        if (this.question.type === 'choice') {
            this.answer![0] = option;
        }
        else if (this.question.type === 'multichoice') {
            console.log(option);
            if (this.answer?.includes(option)) {
                this.answer = this.answer?.filter(item => item !== option);
            }
            else {
                this.answer?.push(option);
            }
        }
        console.log(this.answer);
        this._changeDetector.detectChanges();
    }



    onLanguageChange(value: string) {
        this.files[this.currentFileIndex].language = value;
        this.editorOptions = {
            ...this.editorOptions,
            language: value,
        };
        (<any>window).monaco.editor.setModelLanguage(this.codeEditor.getModel(), this.editorOptions.language);
        console.log(this.files);

    }

    addFile() {
        this.files.push({
            filename: 'main',
            content: '',
            language: this.files[0]?.language || 'nodejs',
        })
    }

    removeFile(index: number) {
        this.files.splice(index, 1);
        if (index) {
            this.currentFileIndex = index - 1;
        }
    }

    editFileValue(event: any) {
        let value = event.name;
        this.files[event.index].filename = value;

    }

    changeFileCurrent(index: number) {
        this.currentFileIndex = index;
        this.editorOptions = {
            ...this.editorOptions,
            language: this.files[index].language,
        };
        this.onLanguageChange(this.files[index].language);
        this._changeDetector.detectChanges();
    }

    submitCode() {
        this.answer = [];
        this.runningCode = true;
        this._changeDetector.detectChanges();

        const submitCode = this.files.map(file => {
            return {
                name: file.filename,
                content: file.content,
            }
        });

        const arraySubmit: Observable<any>[] = this.question.testKey?.map(item => {
            return this._executeCodeSerive.executeCode({
                language: this.files[this.currentFileIndex].language,
                stdin: item.input!,
                files: submitCode
            });
        }) as Observable<any>[];

        this.subscriptions.push(forkJoin(arraySubmit).subscribe(res => {
            res.forEach(item => {
                if (item?.stdout) {
                    this.answer?.push(item.stdout);
                }
            });

            this.codeError = res[0].stderr;


            const result = this.question.testKey?.every((item, index) => {
                return item.output === this.answer![index];
            }) || false;

            this.exercise = {
                ...this.exercise,
                status: result!
            };
            this.exercise.code = this.files;
            this.exercise.answer = this.answer;

            this.message(result);
            this._store.dispatch(createOrUpdateExercise({ exercise: this.exercise }));

        }, error => {
            console.log(error);
            this.message(false);

            this.runningCode = false;
            this._changeDetector.detectChanges();
        }, () => {
            this.runningCode = false;
            this._changeDetector.detectChanges();
        }))
    }

    checkAnswer() {
        this.exercise.answer = this.answer;

        let result = false;
        if (this.answer?.length === this.question.answer?.length) {
            result = !!this.question.answer?.every((item) => {
                return this.answer?.includes(item);
            });
        };

        this.exercise.status = result;

        this._store.dispatch(createOrUpdateExercise({ exercise: this.exercise }));
        this.isCheckAnswer = true;
        this._changeDetector.detectChanges();
    }

    message(status: boolean) {
        if (status) {
            this._messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Câu trả lời chính xác', key: "global" });
            return;
        }
        this._messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Câu trả lời không chính xác', key: "global" });


    }

    nextCloseDialog() {
        this._dynamicDialogRef.close('next');
    }
    backCloseDialog() {
        this._dynamicDialogRef.close('back');
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}