export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer"
    },
    {
      name: "Time Log",
      icon: "fa fa-history",
      children: [
        {
          name: "Time Log Entry", 
          url: "/timelog",
          //icon: "fa fa-line-chart"
        },
        {
          name: "Time Log Table",
          url: "/timelogTable",
          //icon: "fa fa-history"
        },
      ]
    },
    {
      name: "User Profile",
      url: "/users",
      icon: "fa fa-user-circle-o"
    },
    {
      name: "Departments",
      url: "/departments",
      icon: "fa fa-group"
    },
    {
      name: "Performance Matrix",
      icon: "fa fa-pie-chart",
      children: [
        {
          name: "Main Parameters",
          url: "/performance",
          //icon: "fa fa-line-chart"
        },
        {
          name: "Sub Performance",
          url: "/subPerformance",
          //icon: "fa fa-area-chart"
        },
        {
          name: "Evaluation",
          url: "/evaluation",
          //icon: "fa fa-calculator"
        }
      ]
    },
    {
      name: "Minutes Of Meeting",
      url: "/meeting",
      icon: "fa fa-check-square"
    },
    {
      name: "Sales Management",
      icon: "fa fa-briefcase",
      children: [
        {
          name: "Sales Dashboard",
          url: "/leadsboard",
          //icon: "fa-calendar"
        },
        {
          name: "Proposal Records",
          url: "/proposal",
          //icon: "fa fa-suitcase"
        },
        {
          name: "Revenue Report",
          url: "/revenue",
          //icon: "fa-calendar"
        },
        {
          name: "Sales Target",
          url: "/sales",
          //icon: "fa fa-briefcase"
        },
      ]
    },
    {
      name: "HR Management",
      icon: "fa fa-address-book",
      children: [
        {
          name: "Hr Dashboard",
          url: "/HRdashboard",
          //icon: "fa fa-check-square"
        },
        {
          name: "Job Vacancy",
          url: "/vacancy",
          //icon: "fa fa-area-chart"
        },
        {
          name: "Hr Candidacy",
          url: "/hrCandidacy",
          //icon: "fa fa-suitcase"
        },
        {
          name: "HRIS",
          url: "/hris",
          //icon: "fa fa-check-square"
        },
        {
          name: "Add Holiday",
          url: "/addHoliday",
          //icon: "fa fa-check-square"
        },
        // {
        //   name: "Hr Dashboard",
        //   url: "/hrdashboard",
        //   icon: "fa fa-check-square"
        // },
        {
          name: "Leave Management",
          url: "/Leavemanagement",
          //icon: "fa-calendar",
        },
      ]
    },
    {
      name: "Project Management",
      url: "/ProjectManagement",
      icon: "fa fa-tasks",
    }
  ]
};
