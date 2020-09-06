import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

const Dashboard = React.lazy(() => import("./UserRoles/Dashboard/Dashboard"));
const DashboardEditHolidays = React.lazy(() => import("./UserRoles/Dashboard/DashboardEditHolidays"));

const Proposal = React.lazy(() => import("./UserRoles/Sales/ProposalTable"));
const Discuss = React.lazy(() => import("./UserRoles/Sales/FollowUp"));
const FollowUp = React.lazy(() => import("./UserRoles/Sales/Follow_up"));
const UserClosed = React.lazy(() => import("./UserRoles/Sales/Closed"));
const Rejected = React.lazy(() => import("./UserRoles/Sales/Reject")); 
const UserAddProposal = React.lazy(() => import("./UserRoles/Sales/AddProposal"));
const UserEditProposal = React.lazy(() => import("./UserRoles/Sales/EditProposal"));
const UserTarget = React.lazy(() => import("./UserRoles/Sales/GraphView"));

const TimeLog = React.lazy(() => import("./views/TimeLog/TimeLog"));
const TimelogTable = React.lazy(() => import("./views/TimeLog/TimelogTable"));

const leadsboard = React.lazy(() => import("./views/Sales/Sales_Dashboard/Leadsboard"));
const dealsboard = React.lazy(() => import("./views/Sales/Sales_Dashboard/Dealsboard"));
const rejectboard = React.lazy(() => import("./views/Sales/Sales_Dashboard/Rejectboard"));

const Revenue = React.lazy(() => import("./views/Sales/revenue"));
const addRevenue = React.lazy(() => import("./views/Sales/addrevenue"));
const EditRevenue = React.lazy(() => import("./views/Sales/editrevenue"));
const Fixedrevenue = React.lazy(() => import("./views/Sales/Fixedrevenue"));

const MOMList = React.lazy(() => import("./views/Mom/MomList"));
const MOMSteps = React.lazy(() => import("./views/Mom/MomForm"));
const MOMEdit = React.lazy(() => import("./views/Mom/EditMom"));

const Holiday = React.lazy(() => import("./UserRoles/HR/addHoliday"));

const HRIS = React.lazy(() => import("./views/HrCandidacy/HRIS/hris"));
const AddHRIS = React.lazy(() => import("./views/HrCandidacy/HRIS/addhris"));
const EditHRIS = React.lazy(() => import("./views/HrCandidacy/HRIS/edithris"));

const HrCandidacy = React.lazy(() => import("./views/HrCandidacy/HrCandidacyList"));
const PendingHrCandidacy = React.lazy(() => import("./views/HrCandidacy/CandidatePending"));
const SelectedHrCandidacy = React.lazy(() => import("./views/HrCandidacy/SelectedCandidate"));
const ArchivedHrCandidacy = React.lazy(() => import("./views/HrCandidacy/Archived"));
const AddHrCandidacy = React.lazy(() => import("./views/HrCandidacy/AddCandidate"));
const EditHrCandidacy = React.lazy(() => import("./views/HrCandidacy/EditCandidate"));
const oriboard = React.lazy(() => import("./views/HrCandidacy/vacancy/OriginalDashboard"));

const Leavemanagement = React.lazy(() =>import("./views/HrCandidacy/Leavemanagement"));
const PendingLeave = React.lazy(() => import("./views/HrCandidacy/PendingLeave"));
const SelectedLeave = React.lazy(() => import("./views/HrCandidacy/SelectedLeave"));
const Requestleave = React.lazy(() =>import("./views/HrCandidacy/Requestleave"));
const Assignleave = React.lazy(() =>import("./views/HrCandidacy/Assignleave"));
const Editleave = React.lazy(() =>import("./views/HrCandidacy/EditLeave"));
const LeaveDashboard = React.lazy(() => import("./views/HrCandidacy/LeaveDashboard"));
const Leaveboard = React.lazy(() => import("./views/HrCandidacy/LeaveGraph"));


const Vacancy = React.lazy(() => import("./views/HrCandidacy/vacancy/Vacancy"));
const AddVacancy = React.lazy(() => import("./views/HrCandidacy/vacancy/addVacancy"));
const EditVacancy = React.lazy(() => import("./views/HrCandidacy/vacancy/editVacancy"));
const vacancyTarget = React.lazy(() => import("./views/HrCandidacy/vacancy/vacancyTarget"));
const vacancyGraph = React.lazy(() => import("./views/HrCandidacy/vacancy/vacancyGraph"));

const userRoutes = [
  { path: "/", name: "Home", component: DefaultLayout, exact: true, isPrivate: true },
  { path: "/user/dashboard", name: "Dashboard", component: Dashboard, exact: true },
  { path: "/user/dashboard/editHoliday/:id", name: "Edit Holiday", component: DashboardEditHolidays, exact: true ,isPrivate: true},
  { path: "/user/proposal", name: "Proposal", component: Proposal, exact: true, isPrivate: true },
  
  { path: "/user/proposal/discussion", name: "Discussion", component: Discuss, exact: true, isPrivate: true },
  { path: "/user/proposal/follow", name: "Follow Up", component: FollowUp, exact: true, isPrivate: true },
  { path: "/user/proposal/close", name: "Closed", component: UserClosed, exact: true, isPrivate: true },
  { path: "/user/proposal/reject", name: "Rejected", component: Rejected, exact: true, isPrivate: true },
  { path: "/user/proposal/add", name: "Add Proposal", component: UserAddProposal, exact: true, isPrivate: true },
  { path: "/user/proposal/edit/:id", name: "Edit Proposal", component: UserEditProposal, exact: true, isPrivate: true },
  { path: "/user/proposal/target", name: "Target", component: UserTarget, exact: true, isPrivate: true },

  { path: "/leadsboard", name: "Sales Dashboard", component: leadsboard, exact: true, isPrivate: true },
  { path: "/dealsboard", name: "Sales Dashboard", component: dealsboard, exact: true, isPrivate: true },
  { path: "/rejectboard", name: "Sales Dashboard", component: rejectboard, exact: true, isPrivate: true },

  { path: "/revenue", name: "Revenue Report", component: Revenue, exact: true, isPrivate: true },
  { path: "/revenue/add", name: "Add Revenue Report", component: addRevenue, exact: true, isPrivate: true },
  { path: "/revenue/edit/:id", name: "Edit Revenue Report", component: EditRevenue, exact: true, isPrivate: true },
  { path: "/revenue/Fixed", name: "Fixed Revenue Report", component: Fixedrevenue, exact: true, isPrivate: true },
  { path: "/meeting", name: "Minute Of Meetings", component: MOMList, exact: true, isPrivate: true },
  { path: "/meeting/add", name: "Add Minute Of Meetings", component: MOMSteps, exact: true, isPrivate: true },
  { path: "/meeting/edit/:id", name: "Edit Minute Of Meetings", component: MOMEdit, exact: true, isPrivate: true },

  { path: "/user/hr/addHoliday", name: "AddHoliday", component: Holiday, exact: true, isPrivate: true },

  { path: "/hris", name: "HRIS", component: HRIS, exact: true, isPrivate: true },
  { path: "/hris/add", name: "Add To HRIS", component: AddHRIS, exact: true, isPrivate: true },
  { path: "/hris/edit/:id", name: "Edit HRIS", component: EditHRIS, exact: true, isPrivate: true },

  { path: "/hrCandidacy", name: "HR Candidacy", component: HrCandidacy, exact: true, isPrivate: true },
  { path: "/hrCandidacy/pending", name: "Pending Candidate", component: PendingHrCandidacy, exact: true, isPrivate: true },
  { path: "/hrCandidacy/selected", name: "Selected Candidate", component: SelectedHrCandidacy, exact: true, isPrivate: true },
  { path: "/hrCandidacy/archived", name: "Archived Candidate", component: ArchivedHrCandidacy, exact: true, isPrivate: true },
  { path: "/hrCandidacy/add", name: "Add HR Candidacy", component: AddHrCandidacy, exact: true, isPrivate: true },
  { path: "/hrCandidacy/edit/:id", name: "Edit HR Candidacy", component: EditHrCandidacy, exact: true, isPrivate: true },
  { path: "/HRdashboard", name: "HR Dashboard", component: oriboard, exact: true, isPrivate: true },

  { path: "/timelog", name: "Time Log", component: TimeLog, exact: true, isPrivate: true },
  { path: "/timelog/userlist", name: "Time Log Table", component: TimelogTable, exact: true, isPrivate: true },

  { path: "/vacancy", name: "Job Vacancy", component: Vacancy, exact: true, isPrivate: true },
  { path: "/vacancy/add", name: "Add Job Vacancy", component: AddVacancy, exact: true, isPrivate: true },
  { path: "/vacancy/edit/:id", name: "Edit Job Vacancy", component: EditVacancy, exact: true, isPrivate: true },
  { path: "/vacancy/target", name: "Target", component: vacancyTarget, exact: true, isPrivate: true },
  { path: "/vacancy/target/:id", name: "Graph", component: vacancyGraph, exact: true, isPrivate: true },

  { path: "/Leavemanagement", name: "Leave Management", component: Leavemanagement, exact: true, isPrivate: true },
  { path: "/Leavemanagement/pending", name: "Pending Candidate", component: PendingLeave, exact: true, isPrivate: true },
  { path: "/Leavemanagement/selected", name: "Selected Candidate", component: SelectedLeave, exact: true, isPrivate: true },
  { path: "/Leavemanagement/request", name: "Request Leave", component: Requestleave, exact: true, isPrivate: true },
  { path: "/Leavemanagement/assign", name: "Request Leave", component: Assignleave, exact: true, isPrivate: true },
  { path: "/Leavemanagement/edit/:id", name: "Edit Leave", component: Editleave, exact: true, isPrivate: true },
  { path: "/Leavemanagement/dashboard", name: "Leave Dashboard", component: Leaveboard, exact: true, isPrivate: true },
  { path: "/Leavemanagement/dashboard/:id", name: "Graph", component: LeaveDashboard, exact: true, isPrivate: true },
];

export default userRoutes;
