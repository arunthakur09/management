import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const DashboardEditLeave = React.lazy(() => import("./views/Dashboard/DashboardEditLeave"));
const DashboardUser = React.lazy(() => import("./views/Dashboard/DashboardUser"));
const DashboardEditHolidays = React.lazy(() => import("./views/Dashboard/DashboardEditHolidays"));
const DashboardEditProposal = React.lazy(() => import("./views/Dashboard/DashboardEditProposal"));

const UserTable = React.lazy(() => import("./views/UserProfile/UserTables"));
const AddUsers = React.lazy(() => import("./views/UserProfile/AddUser"));
const EditUsers = React.lazy(() => import("./views/UserProfile/EditUser"));
const ArchivedUsers = React.lazy(() => import("./views/UserProfile/Archiveduser"));

const Departments = React.lazy(() => import("./views/Departments/DepartmentTables"));
const AddDepartment = React.lazy(() => import("./views/Departments/AddDepartment"));
const EditDepartment = React.lazy(() => import("./views/Departments/EditDepartment"));

const Performance = React.lazy(() => import("./views/Performance/PerformanceTable"));
const AddPerformance = React.lazy(() => import("./views/Performance/AddPerformance"));
const EditPerformance = React.lazy(() => import("./views/Performance/EditPerformance"));

const SubPerformance = React.lazy(() => import("./views/SubPerformance/SubPerformanceTable"));
const AddSubPerformance = React.lazy(() => import("./views/SubPerformance/AddSubPerformance"));
const EditSubPerformance = React.lazy(() => import("./views/SubPerformance/EditSubPerformance"));

const Evaluation = React.lazy(() => import("./views/Evaluation/EvaluationTable"));
const ShowEvaluation = React.lazy(() => import("./views/Evaluation/ShowCalculations"));

const TimeLog = React.lazy(() => import("./views/TimeLog/TimeLog"));
const TimelogTable = React.lazy(() => import("./views/TimeLog/TimelogTable"));

const MOMList = React.lazy(() => import("./views/Mom/MomList"));
const MOMSteps = React.lazy(() => import("./views/Mom/MomForm"));
const MOMEdit = React.lazy(() => import("./views/Mom/EditMom"));

const Sales = React.lazy(() => import("./views/Sales/ProposalTable"));
const Discuss = React.lazy(() => import("./views/Sales/FollowUp"));
const FollowUp = React.lazy(() => import("./views/Sales/Follow_up"));
const Closed = React.lazy(() => import("./views/Sales/Closed"));
const Rejected = React.lazy(() => import("./views/Sales/Reject")); 
const AddProposal = React.lazy(() => import("./views/Sales/AddProposal"));
const EditProposal = React.lazy(() => import("./views/Sales/EditProposal"));
const SalesTarget = React.lazy(() => import("./views/Sales/SalesTarget"));
const Graph = React.lazy(() => import("./views/Sales/GraphView"));

const leadsboard = React.lazy(() => import("./views/Sales/Sales_Dashboard/Leadsboard"));
const dealsboard = React.lazy(() => import("./views/Sales/Sales_Dashboard/Dealsboard"));
const rejectboard = React.lazy(() => import("./views/Sales/Sales_Dashboard/Rejectboard"));

const Revenue = React.lazy(() => import("./views/Sales/revenue"));
const addRevenue = React.lazy(() => import("./views/Sales/addrevenue"));
const EditRevenue = React.lazy(() => import("./views/Sales/editrevenue"));
const Fixedrevenue = React.lazy(() => import("./views/Sales/Fixedrevenue"));
const RevenueGraph = React.lazy(() => import("./views/Sales/Revenuegraph"));

const Target = React.lazy(() => import("./views/Sales/Sales_Target/targetlist"));
const addTarget = React.lazy(() => import("./views/Sales/Sales_Target/addtarget"));
const EditTarget = React.lazy(() => import("./views/Sales/Sales_Target/edittarget"));
const TargetGraph = React.lazy(() => import("./views/Sales/Sales_Target/GraphView"));

const HrCandidacy = React.lazy(() => import("./views/HrCandidacy/HrCandidacyList"));
const PendingHrCandidacy = React.lazy(() => import("./views/HrCandidacy/CandidatePending"));
const SelectedHrCandidacy = React.lazy(() => import("./views/HrCandidacy/SelectedCandidate"));
const ArchivedHrCandidacy = React.lazy(() => import("./views/HrCandidacy/Archived"));
const AddHrCandidacy = React.lazy(() => import("./views/HrCandidacy/AddCandidate"));
const EditHrCandidacy = React.lazy(() => import("./views/HrCandidacy/EditCandidate"));

const Holiday = React.lazy(() => import("./views/HrCandidacy/addHoliday"));

const HRIS = React.lazy(() => import("./views/HrCandidacy/HRIS/hris"));
const AddHRIS = React.lazy(() => import("./views/HrCandidacy/HRIS/addhris"));
const EditHRIS = React.lazy(() => import("./views/HrCandidacy/HRIS/edithris"));

const Vacancy = React.lazy(() => import("./views/HrCandidacy/vacancy/Vacancy"));
const AddVacancy = React.lazy(() => import("./views/HrCandidacy/vacancy/addVacancy"));
const EditVacancy = React.lazy(() => import("./views/HrCandidacy/vacancy/editVacancy"));
const vacancyTarget = React.lazy(() => import("./views/HrCandidacy/vacancy/vacancyTarget"));
const vacancyGraph = React.lazy(() => import("./views/HrCandidacy/vacancy/vacancyGraph"));

const Pendingboard = React.lazy(() => import("./views/HrCandidacy/vacancy/pendingBoard"));
const selectedboard = React.lazy(() => import("./views/HrCandidacy/vacancy/selectedboard"));
const rejectedboard = React.lazy(() => import("./views/HrCandidacy/vacancy/rejectedboard"));
const oriboard = React.lazy(() => import("./views/HrCandidacy/vacancy/OriginalDashboard"));

const Leavemanagement = React.lazy(() =>import("./views/HrCandidacy/Leavemanagement"));
const PendingLeave = React.lazy(() => import("./views/HrCandidacy/PendingLeave"));
const SelectedLeave = React.lazy(() => import("./views/HrCandidacy/SelectedLeave"));
const Requestleave = React.lazy(() =>import("./views/HrCandidacy/Requestleave"));
const Assignleave = React.lazy(() =>import("./views/HrCandidacy/Assignleave"));
const Editleave = React.lazy(() =>import("./views/HrCandidacy/EditLeave"));
const LeaveDashboard = React.lazy(() => import("./views/HrCandidacy/LeaveDashboard"));
const Leaveboard = React.lazy(() => import("./views/HrCandidacy/LeaveGraph"));

const ProjectManagement = React.lazy(() => import("./views/ProjectManagement/projectManagement"));
const EditProject = React.lazy(() =>import("./views/ProjectManagement/EditProject"));
const MonthlyView = React.lazy(() =>import("./views/ProjectManagement/MonthlyView"));
const AddTask = React.lazy(() =>import("./views/ProjectManagement/AddTask"));

const routes = [
  { path: "/", name: "Home", component: DefaultLayout, exact: true, isPrivate: true },
  { path: "/dashboard", name: "Dashboard", component: Dashboard, exact: true },
  { path: "/dashboard/edit/:id", name: "Edit Leave", component: DashboardEditLeave, exact: true ,isPrivate: true},
  { path: "/dashboard/editUser/:id", name: "Edit User", component: DashboardUser, exact: true ,isPrivate: true},
  { path: "/dashboard/editHoliday/:id", name: "Edit Holiday", component: DashboardEditHolidays, exact: true ,isPrivate: true},
  { path: "/dashboard/editProposal/:id", name: "Edit Proposal", component: DashboardEditProposal, exact: true ,isPrivate: true},

  { path: "/users", name: "Users", component: UserTable, exact: true, isPrivate: true },
  { path: "/users/add", name: "Add User", component: AddUsers, exact: true, isPrivate: true },
  { path: "/users/edit/:id", name: "Edit User", component: EditUsers, exact: true, isPrivate: true },
  { path: "/users/archived", name: "Archived User", component: ArchivedUsers, exact: true, isPrivate: true },

  { path: "/departments", name: "Departments", component: Departments, exact: true, isPrivate: true },
  { path: "/departments/add", name: "Add-Department", component: AddDepartment, exact: true, isPrivate: true },
  { path: "/departments/edit/:id", name: "Edit-Department", component: EditDepartment, exact: true, isPrivate: true },
 
  { path: "/performance", name: "Performance", component: Performance, exact: true, isPrivate: true },
  { path: "/performance/add", name: "Add-Performance", component: AddPerformance, exact: true, isPrivate: true },
  { path: "/performance/edit/:id", name: "Edit-performance", component: EditPerformance, exact: true, isPrivate: true },
  
  { path: "/subPerformance", name: "Sub-Performance", component: SubPerformance, exact: true, isPrivate: true },
  { path: "/subPerformance/add", name: "Add-Sub-Performance", component: AddSubPerformance, exact: true, isPrivate: true },
  { path: "/subPerformance/edit/:id", name: "Edit-Sub-Performance", component: EditSubPerformance, exact: true, isPrivate: true },
  
  { path: "/evaluation", name: "Evaluation", component: Evaluation, exact: true, isPrivate: true },
  { path: "/evaluation/show", name: "Show-Evaluation", component: ShowEvaluation, exact: true, isPrivate: true },

  { path: "/timelog", name: "Time Log", component: TimeLog, exact: true, isPrivate: true },
  { path: "/timelogTable", name: "Time Log Table", component: TimelogTable, exact: true, isPrivate: true },

  { path: "/meeting", name: "Minute Of Meetings", component: MOMList, exact: true, isPrivate: true },
  { path: "/meeting/add", name: "Add Minute Of Meetings", component: MOMSteps, exact: true, isPrivate: true },
  { path: "/meeting/edit/:id", name: "Edit Minute Of Meetings", component: MOMEdit, exact: true, isPrivate: true },

  { path: "/proposal", name: "Sales", component: Sales, exact: true, isPrivate: true },
  { path: "/proposal/discussion", name: "Discussion", component: Discuss, exact: true, isPrivate: true },
  { path: "/proposal/follow", name: "Follow Up", component: FollowUp, exact: true, isPrivate: true },
  { path: "/proposal/close", name: "Closed", component: Closed, exact: true, isPrivate: true },
  { path: "/proposal/reject", name: "Rejected", component: Rejected, exact: true, isPrivate: true },
  { path: "/proposal/add", name: "Add Proposal", component: AddProposal, exact: true, isPrivate: true },
  { path: "/proposal/edit/:id", name: "Edit Proposal", component: EditProposal, exact: true, isPrivate: true },
  { path: "/proposal/target", name: "Target", component: SalesTarget, exact: true, isPrivate: true },
  { path: "/proposal/target/:id", name: "Graph", component: Graph, exact: true, isPrivate: true },

  { path: "/leadsboard", name: "Sales Dashboard", component: leadsboard, exact: true, isPrivate: true },
  { path: "/dealsboard", name: "Sales Dashboard", component: dealsboard, exact: true, isPrivate: true },
  { path: "/rejectboard", name: "Sales Dashboard", component: rejectboard, exact: true, isPrivate: true },

  { path: "/revenue", name: "Revenue Report", component: Revenue, exact: true, isPrivate: true },
  { path: "/revenue/add", name: "Add Revenue Report", component: addRevenue, exact: true, isPrivate: true },
  { path: "/revenue/edit/:id", name: "Edit Revenue Report", component: EditRevenue, exact: true, isPrivate: true },
  { path: "/revenue/Fixed", name: "Fixed Revenue Report", component: Fixedrevenue, exact: true, isPrivate: true },
  { path: "/revenue/graph", name: "Revenue Report Graph", component: RevenueGraph, exact: true, isPrivate: true },

  { path: "/sales", name: "Sales Target", component: Target, exact: true, isPrivate: true },
  { path: "/sales/add", name: "Add Sales Target", component: addTarget, exact: true, isPrivate: true },
  { path: "/sales/edit/:id", name: "Edit Target", component: EditTarget, exact: true, isPrivate: true },
  { path: "/sales/target/:id", name: "Graph", component: TargetGraph, exact: true, isPrivate: true },

  { path: "/hrCandidacy", name: "HR Candidacy", component: HrCandidacy, exact: true, isPrivate: true },
  { path: "/hrCandidacy/pending", name: "Pending Candidate", component: PendingHrCandidacy, exact: true, isPrivate: true },
  { path: "/hrCandidacy/selected", name: "Selected Candidate", component: SelectedHrCandidacy, exact: true, isPrivate: true },
  { path: "/hrCandidacy/archived", name: "Archived Candidate", component: ArchivedHrCandidacy, exact: true, isPrivate: true },
  { path: "/hrCandidacy/add", name: "Add HR Candidacy", component: AddHrCandidacy, exact: true, isPrivate: true },
  { path: "/hrCandidacy/edit/:id", name: "Edit HR Candidacy", component: EditHrCandidacy, exact: true, isPrivate: true },
  
  

  { path: "/addHoliday", name: "AddHoliday", component: Holiday, exact: true, isPrivate: true },

  { path: "/hris", name: "HRIS", component: HRIS, exact: true, isPrivate: true },
  { path: "/hris/add", name: "Add To HRIS", component: AddHRIS, exact: true, isPrivate: true },
  { path: "/hris/edit/:id", name: "Edit HRIS", component: EditHRIS, exact: true, isPrivate: true },

  { path: "/vacancy", name: "Job Vacancy", component: Vacancy, exact: true, isPrivate: true },
  { path: "/vacancy/add", name: "Add Job Vacancy", component: AddVacancy, exact: true, isPrivate: true },
  { path: "/vacancy/edit/:id", name: "Edit Job Vacancy", component: EditVacancy, exact: true, isPrivate: true },
  { path: "/vacancy/target", name: "Target", component: vacancyTarget, exact: true, isPrivate: true },
  { path: "/vacancy/target/:id", name: "Graph", component: vacancyGraph, exact: true, isPrivate: true },

  { path: "/dashboardhr", name: "HR Dashboard", component: Pendingboard, exact: true, isPrivate: true },
  { path: "/selectedboard", name: "HR Dashboard", component: selectedboard, exact: true, isPrivate: true },
  { path: "/rejectedboard", name: "HR Dashboard", component: rejectedboard, exact: true, isPrivate: true },
  { path: "/HRdashboard", name: "HR Dashboard", component: oriboard, exact: true, isPrivate: true },

  { path: "/Leavemanagement", name: "Leave Management", component: Leavemanagement, exact: true, isPrivate: true },
  { path: "/Leavemanagement/pending", name: "Pending Candidate", component: PendingLeave, exact: true, isPrivate: true },
  { path: "/Leavemanagement/selected", name: "Selected Candidate", component: SelectedLeave, exact: true, isPrivate: true },
  { path: "/Leavemanagement/request", name: "Request Leave", component: Requestleave, exact: true, isPrivate: true },
  { path: "/Leavemanagement/assign", name: "Request Leave", component: Assignleave, exact: true, isPrivate: true },
  { path: "/Leavemanagement/edit/:id", name: "Edit Leave", component: Editleave, exact: true, isPrivate: true },
  { path: "/Leavemanagement/dashboard", name: "Leave Dashboard", component: Leaveboard, exact: true, isPrivate: true },
  { path: "/Leavemanagement/dashboard/:id", name: "Graph", component: LeaveDashboard, exact: true, isPrivate: true },

  { path: "/ProjectManagement", name: "ProjectManagement", component: ProjectManagement, exact: true },
  { path: "/ProjectManagement/editProject/:id", name: "Edit Project", component: EditProject, exact: true, isPrivate: true },
  { path: "/ProjectManagement/MonthlyView", name: "Monthly View", component: MonthlyView, exact: true, isPrivate: true },
  { path: "/ProjectManagement/AddTask/:id", name: "Add Task", component: AddTask, exact: true, isPrivate: true },

];

export default routes;
