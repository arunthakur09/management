export default {
    items: [
      {
        name: "Dashboard",
        url: "/user/dashboard",
        icon: "icon-speedometer"
      },
      {
        name: "Sales Management",
        icon: "fa fa-briefcase",
        children: [
          {
            name: "Proposal Records",
            url: "/user/proposal",
            // icon: "fa fa-suitcase"
          },
          {
            name: "Sales Dashboard",
            url: "/leadsboard",
            // icon: "fa-calendar"
          },
          {
            name: "Revenue Report",
            url: "/revenue",
            // icon: "fa-calendar"
          },
        ]
      },
      {
        name: "Time Log",
        icon: "fa fa-history",
        children: [
          {
            name: "Time Log Entry", 
            url: "/timelog",
            // icon: "fa fa-line-chart"
          },
        ]
      },
      {
        name: "Minutes Of Meeting",
        url: "/meeting",
        icon: "fa fa-check-square"
      },
      {
        name: "HR Management",
        icon: "fa fa-pie-chart",
        children: [
          {
            name: "Hr Candidacy",
            url: "/hrCandidacy",
            // icon: "fa fa-suitcase"
          },
          {
            name: "Job Vacancy",
            url: "/vacancy",
            // icon: "fa fa-area-chart"
          },
          {
            name: "Hr Dashboard",
            url: "/HRdashboard",
            // icon: "fa fa-check-square"
          },
          // {
          //   name: "Hr Dashboard",
          //   url: "/hrdashboard",
          //   icon: "fa fa-check-square"
          // },
          {
            name: "Leave Management",
            url: "/Leavemanagement",
            // icon: "fa-calendar",
          },
          {
            name: "HRIS",
            url: "/hris",
            //icon: "fa fa-check-square"
          },
        {
          name: "Add Holiday",
          url: "/user/hr/addHoliday",
          //icon: "fa fa-check-square"
        },
        ]
      }
    ]
  };
  