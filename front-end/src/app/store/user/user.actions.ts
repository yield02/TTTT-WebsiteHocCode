import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../../models/User';

export const Update = createAction('[User Component] Update', props<{ updateValue: AuthUser }>());
export const Delete = createAction('[User Component] Delete');


export const getAnnouncements = createAction('[User Component] Get Announcement');
export const getAnnouncementsSuccess = createAction('[User Component] Get Announcement Success', props<{ announcement: any }>());

export const stateChangeAnnouncement = createAction('[User Component] State Change Announcement', props<{ announcement_ids: string[], state: 'read' | 'unread' }>());
export const stateChangeAnnouncementSuccess = createAction('[User Component] State Change Announcement Success', props<{ announcement_ids: string[], status: 'read' | 'unread' }>());

export const deleteAnnouncements = createAction('[User Component] Delete Announcement', props<{ announcement_ids: string[] }>());
export const deleteAnnouncementsSuccess = createAction('[User Component] Delete Announcement Success', props<{ announcement_ids: string[] }>());