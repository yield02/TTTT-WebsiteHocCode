import { createReducer, on } from '@ngrx/store';
import { Report } from '../../../models/Report';
import { deleteReportSucess, manager_loadReportsSuccess, updateStatusReportSuccess } from './report.actions';

export const initialState: Report[] = [];

export const admin_ReportReducer = createReducer(
    initialState,
    on(manager_loadReportsSuccess, (state, { reports }) => {
        return reports;
    }),
    on(updateStatusReportSuccess, (state, { report_ids, status }) => {
        return state.map(report => {
            if (report_ids.includes(report._id!)) {
                return { ...report, state: status };
            } else {
                return report;
            }
        });
    }),
    on(deleteReportSucess, (state, { ids }) => {
        return state.filter(report => !ids.includes(report._id!));
    })
);