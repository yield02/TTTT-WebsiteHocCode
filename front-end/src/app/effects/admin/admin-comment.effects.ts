import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { PostService } from "../../services/forum/post.service";
import { Router } from "@angular/router";
import { AdminPostService } from "../../services/admin/admin-post.service";
import { addPosts, manager_loadPosts } from "../../store/admin/post/post.actions";

@Injectable({ providedIn: 'root' })

export class AdminCommentEffects {

    constructor(private actions$: Actions, private _adminPostService: AdminPostService) { }




}