import { createAction, props } from '@ngrx/store';
import { Report } from '../../../models/Report';


export const manager_loadReports = createAction('[Report Manager Component] Load Reports');
export const manager_updateStatusReports = createAction('[Report Manager Component] Update Status', props<{ report_ids: string[], state: "processed" | "unprocessed", reason?: string }>());
export const manager_deleteReports = createAction('[Report Manager Component] Delete Reports', props<{ ids: string[] }>());


export const manager_loadReportsSuccess = createAction('[Report Manager Component] Load Reports Success', props<{ reports: Report[] }>());
export const updateStatusReportSuccess = createAction('[Report Manager Component] Update Status Success', props<{ report_ids: string[], status: "processed" | "unprocessed", reason?: string }>());
export const deleteReportSucess = createAction('[Report Manager Component] Delete Success', props<{ ids: string[] }>());

