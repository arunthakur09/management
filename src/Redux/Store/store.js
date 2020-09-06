import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import UserProfileReducer from "../Reducers/UserProfileReducer";
import DepartmentsReducer from "../Reducers/DepartmentsReducer";
import PerformanceReducer from "../Reducers/PerformanceReducer";
import SubPerformance from "../Reducers/SubPerformanceReducer";
import CalReducer from "../Reducers/CalculationReducer";
import TimeLogReducer from "../Reducers/TimeLogReducer";
import MomReducer from "../Reducers/MomReducer";
import SalesReducer from "../Reducers/SalesReducer";
import LoginReducer from "../Reducers/LoginReducer";
import HrCandidacyReducer from "../Reducers/HrCandidacyReducer";
import LeavemanagementReducer from "../Reducers/LeavemanagementReducer";
import RevenueReducer from "../Reducers/RevenueReducer";
import SalestargetReducer from "../Reducers/SalestargetReducer"
import VacancyReducer from "../Reducers/VacancyReducer";
import HRISReducer from "../Reducers/HRISReducer";
import DashboardReducer from "../Reducers/DasboardReducer"
import ProjectManagementReducer from "../Reducers/ProjectManagementReducer"

const reducer = combineReducers({
  CtrUser: UserProfileReducer,
  CtrDepartment: DepartmentsReducer,
  CtrPerformance: PerformanceReducer,
  CtrSubPerformance: SubPerformance,
  CtrCalReducer: CalReducer,
  CtrMom: MomReducer,
  ctrTimeLog: TimeLogReducer,
  CtrSales: SalesReducer,
  CtrlLogin: LoginReducer,
  CtrlHrCandidacy: HrCandidacyReducer,
  CtrlHRIS: HRISReducer,
  CtrlLeave: LeavemanagementReducer,
  CtrVacancy: VacancyReducer,
  CtrRevenue: RevenueReducer,
  CtrSalesTarget: SalestargetReducer,
  CtrDashboard: DashboardReducer,
  CtrProjectManagement:ProjectManagementReducer
});

const logger = store => {
  return next => {
    return action => {
      if (action==='LOGOUT_AUTHENTICATION_INIT'){
        
      }
      console.log("[Middleware] dispatching", action);
      const result = next(action);
      // console.log("[Middleware] next state", store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk)));

export default store;
