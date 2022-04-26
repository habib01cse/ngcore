//formName[api#gridId]



/*====================############=======================
            #region  Accounts Module Column Def
=====================#############=======================*/

export const acStoreNameColumnDefs = [
    { headerName: 'bUName', field: 'BU_NAME' }
];
//

// AC_1045[AC1045AccountCodeGridId#FG_AC_COMM_CHART_OF_ACCOUNTS]
// AC_1057[AC1057AccountCodeGridId#FG_AC_COMM_CHART_OF_ACCOUNTS]
export const accCodeColumnsDefs = [
    { headerName: 'accountName', field: 'ACC_NAME' },
    { headerName: 'accCode', field: 'ACC_CODE' },
]
// AC_1052[accountListGrid#FG_AC_COMM_CHART_OF_ACCOUNTS]
export const acAccountListColumnDefs = [
    { headerName: 'accountName', field: 'ACC_NAME_TR' },
    { headerName: 'accNo', field: 'ACC_NO' }
];

// AC_1053[transDeptListGrid#FG_AC_COMM_BUDGET_INFO]
export const acTransDeptListColumnDefs = [
    { headerName: 'departmentName', field: 'BU_NAME_TR' },
    { headerName: 'budgetNo', field: 'BUDGET_NO' }
];



// AC_1130[particularListGrid#FG_AC_COMM_PARTICULAR]
export const particulartListColumnDefs = [
    { headerName: 'Particular', field: 'PARTICULAR' },
    { headerName: 'Condition', field: 'SUPPLIER' },
    { headerName: 'Supplier', field: 'SUPPLIER' },
];

// AC_1053[budgeTransferListGrid#FG_AC_COMM_BUDGET_INFO]
export const budgeTransferListColumnDefs = [
    { headerName: 'year', field: 'YEAR', sortable: true, resizable: true, hide: false },
    { headerName: 'fromAccount', field: 'FROM_ACC_NAME', sortable: true, resizable: true, hide: false },
    { headerName: 'fromDepartment', field: 'FROM_BU_NAME', sortable: true, resizable: true, hide: false },
    {
        headerName: 'transferDate',
        field: 'TRANSFER_DATE',
        sortable: true,
        resizable: true,
        hide: false,
        cellRenderer: 'datePipeRenderer',
        cellEditor: 'dateCellEditor',
        cellEditorParams: { psMaxDate: 'TRANSFER_DATE' }
    },
];

// AC_1011[budgeTransferListGrid#FG_AC_COMM_ACCOUNT_CATEGORIES]
export const accountCatListColumnDef = [
    { headerName: 'name', field: 'NATURE_NAME' },
    //{ headerName: 'code', field: 'NATURE_CODE' }
];

export const accountPrivColumnDef = [
    { headerName: 'PRIV NAME', field: 'PRIV_NAME' },
    //{ headerName: 'code', field: 'NATURE_CODE' }
];


// ac1130[#FG_SA_COMM_EMPLOYEES#MoneyRequisition] |
export const preparedByByColumnDefs = [
    { headerName: 'Phone_mobile', field: 'PHONE_MOBILE' },
    { headerName: 'Phone_office', field: 'PHONE_OFFICE' },
    { headerName: 'Emp_name', field: 'EMP_NAME' },
    { headerName: 'Designation', field: 'DESIGNATION' },
    { headerName: 'Department', field: 'DEPARTMENT' },
];

//FG_AC1290_USER_LIST
export const empThreelistColumnDefAc1290 = [
    { headerName: 'Emp Name', field: 'INT_EMP_NAME' },
    { headerName: 'jobTitle', field: 'JOBTITLE' },
    { headerName: 'BU Name', field: 'BU_NAME' },
];

// AC_1282[budgeTransferListGrid#FG_AC1282_PAY_LIST]
export const accountmoneyPayDef = [
    { headerName: 'Money Pay Id', field: 'TRN_LIST' },
    // { headerName: 'Money Pay Id', field: 'TRN_LIST' },
    //{ headerName: 'code', field: 'NATURE_CODE' }
];
// AC_1011[InventoryListGrid#FG_SA_COMM_STORE_TYPE_LIST]
export const inventoryListColumnDef = [
    { headerName: 'storeType', field: 'STRTYPE_NAME' },
];

// AC_1288[MoneyvoucherAdjustmentListGrid#FG_AC_COMM_SCHEDULE_LIST]
export const scheduleListColumnDef = [
    { headerName: 'Moneyreq Id', field: 'MONEYREQ_ID' },
    { headerName: 'Moneyschedule Id', field: 'MONEYSCHEDULE_ID' },
    { headerName: 'Pay_Amt', field: 'PAY_AMT' },
    { headerName: 'Pre_adjust_amt', field: 'PRE_ADJUST_AMT' },
    { headerName: 'Balance', field: 'BALANCE' },
];


// AC_1045[AC1045BudgetListGrid#FG_AC_COMM_CHART_OF_ACCOUNTS]
// AC_1046[AC1046BudgetListGrid#FG_AC_COMM_CHART_OF_ACCOUNTS]
// AC_1049[AC1049BudgetListGrid#FG_AC1049_VIEW_LIST]
// AC_1050[AC1050BudgetListGrid#FG_AC1049_VIEW_LIST]
// AC_1057[AC1057BudgetListGrid#FG_AC_COMM_BUDGET_INFO]
//
export const acBudgetGridListColumnDefs = [
    { headerName: 'bUName', field: 'BU_NAME' },
    { headerName: 'budgetNo', field: 'BUDGET_ID' },
    { headerName: 'stat', field: 'STAT' },
];


// AC_1130[AC1130#FG_SA_COMM_BU]
export const requisitionFromColumnDefs = [
    { headerName: 'Requisition From', field: 'BU_NAME' },
];






/*====================############=======================
            #region  Purchase Module Column Def
=====================#############=======================*/

export const invoiceDtl = [
    { headerName: 'itemName', field: 'ITEM_NAME' },
    { headerName: 'uom', field: 'UOM_NAME' },
    { headerName: 'quantity', field: 'QTY' },
    { headerName: 'price', field: 'PRICE', cellRenderer: 'numberPipeRenderer' },
    { headerName: 'value', field: 'AMOUNT', cellRenderer: 'numberPipeRenderer' },
    { headerName: 'valueInTakaBracTkBrac', field: 'AMOUNT_IN_TAKA', cellRenderer: 'numberPipeRenderer' },
];


// 

// HR_1045[Hr1045SettlementTypeGrid#FG_HR_COMM_LEAVE_ENCASHMENT]
export const shiftListColumnDefs = [
    { headerName: 'elementName', field: 'ELEMENT_NAME' },
];
// HR_1119[Hr1119JObTitleGrid#FG_HR_COMM_JOBTITLE ]
// HR_1140[Hr1140JobtitleGrid#FG_HR_COMM_JOBTITLE ]
// HR_1142[Hr1142JobtitleGrid#FG_HR_COMM_JOBTITLE ]
export const hrJobTitleColumnDefs = [
    { headerName: 'jobTitle', field: 'JOBTITLE' },

];

// HR_1119[Hr1119LineListGrid#FG_HR_COMM_LINE_INFO ]
export const hrLineListColumnDefs = [
    { headerName: 'lineName', field: 'LINE_NAME' },
];
// HR_1119[Hr1119ProductTypeGrid#FG_SA_COMM_CONFIGARATION ]
export const hrProductTypeListColumnDefs = [
    { headerName: 'productType', field: 'DTL_NAME' },

];
// HR_1017[FsListGrid#FG_HR_COMM_FSTYPE ]
export const fsTypeColumnDef = [
    { headerName: 'settlementName', field: 'FS_NAME' },

];
// HR_1119[Hr1119ProcessNameGrid#FG_HR1002_OPERATION_LIST ]
export const hrProcessTypeListColumnDefs = [
    { headerName: 'processName', field: 'OPERATION_NAME' },
    { headerName: 'processId', field: 'OPERATION_ID' },

];

// HR_1134[Hr1134EmpIdGrid#FG_HR1134_EMP_LIST ]
export const AttendanceBonusAdjtEmpIdColumnDefs = [
    { headerName: 'empNameId', field: 'EMP_NAME_ID' },
    { headerName: 'empId', field: 'EMP_ID' },
    { headerName: 'buName', field: 'BU_NAME' },
    { headerName: 'jobTitle', field: 'JOBTITLE' },
];
//HR_1140[Hr1140ElementNameGrid#FG_SA_COMM_ELEMENT_LIST]
//HR_1142[Hr1142ElementNameGrid#FG_SA_COMM_ELEMENT_LIST]
//HR_1003[ElementGridID#FG_HR_COMM_ELEMENT]
//HR_1016[Hr1016ElementNameGrid#FG_HR_COMM_ELEMENT]

export const elementListColumnsDefs = [
    { headerName: 'elementName', field: 'ELEMENT_NAME' }
]

export const pieceRateConfigColumnsDefs = [
    { headerName: 'element', field: 'ELEMENT_NAME' },
    { headerName: 'useForNetpayCheck', field: 'USE_FOR_NETPAY_CHK' },
    { headerName: 'yes', field: 'ELIGABLE_FOR_COMP' },
    { headerName: 'no', field: 'NOT_ELIGABLE_FOR_COMP' },
    { headerName: 'description', field: 'DESCR' },
    { headerName: 'active', field: 'ACTIVE' },
]

// HR_1134[Hr1079EmpNameIdGrid#FG_HR1079_EMP_LIST ]
// HR_1079[Hr1079EmpNameIdGrid#FG_HR1079_EMP_LIST ]
export const otherAllowanceDeductionColumnDefs = [
    { headerName: 'empNameId', field: 'EMP_NAME_ID' },
    { headerName: 'buName', field: 'BU_NAME' },
    { headerName: 'jobTitle', field: 'JOBTITLE' },
    { headerName: 'joinDate', field: 'JOIN_DATE', cellRenderer: 'datePipeRenderer', },
];

// HR_1079[Hr1079ElementGridId#FG_HR1079_ELEMENT_LIST ]
export const Hr1079elementListColumnDefs = [
    { headerName: 'element', field: 'ELEMENT_NAME' },
    { headerName: 'amt', field: 'ALLDED_AMT' },
    { headerName: 'maxAmt', field: 'MAX_AMT' },
    { headerName: 'effectiveDate', field: 'EFFECTIVE_DATE', cellRenderer: 'datePipeRenderer', },
]
// HR_1134[Hr1134ApprovedByGridId#FG_HR_COMM_EMP3 ]
// HR_1100[EmployeeGrid_HR_1100#FG_HR_COMM_EMPLOYEE_LIST ]
//HR_1079 [Hr1079ApprovedGridId#FG_HR_COMM_EMPLOYEE_LIST]
//HR_1140 [Hr1140EmpNameIdGrid#FG_HR_COMM_EMPLOYEE_LIST]
//HR_1142 [Hr1142EmpNameIdGrid#FG_HR_COMM_EMPLOYEE_LIST]
export const hrApprovedByColumnDefs = [
    { headerName: 'empNameId', field: 'EMP_NAME_ID' }
]

// HR_1130[Hr1130PaymentDistributionPolicyListGrid#FG_HR_COMM_HR_SHIFT]
export const businessUnitNameColumnDefs = [
    { headerName: 'businessUnitName', field: 'BU_NAME_ORG' },
];
// HR_1130[Hr1130PaymentDistributionPolicyListGrid#FG_HR_COMM_HR_SHIFT]
export const jobTitleColumnDefs = [
    { headerName: 'jobTitle', field: 'JOBTITLE' },
];
// HR_1130[Hr1130PaymentDistributionPolicyListGrid#FG_HR_COMM_HR_SHIFT]
export const employeeNameColumnDefs = [
    { headerName: 'nameColonId', field: 'EMP_NAME_ID' },
];

// HR_1094[Hr1094LineInformationListGrid#FG_HR_COMM_LINE_TYPE]
export const lineInformationColumnDefs = [
    { headerName: 'dtlName', field: 'DTL_NAME' },
];
// HR_1094[Hr1094LineInformationListGrid#FG_HR_COMM_LINE_TYPE]
export const companyColumnDefs = [
    { headerName: 'companyName', field: 'COMPANY_NAME' },
    { headerName: 'shortName', field: 'COMPANY_ALIAS' },
];

// HR_1149[Hr1149ShiftListGrid#FG_HR_COMM_HR_SHIFT]
export const settleMentTypeColumnDefs = [
    { headerName: 'shiftName', field: 'SHIFT_ID' },
];

// HR_1147[Hr1147CompanyNameListGrid#FG_SA_COMM_EMP_COMPANY]
export const companyNameColumnDefs = [
    { headerName: 'companyName', field: 'COMPANY_NAME' },
];
// HR_1147[Hr1147DepartmentListGrid#FG_SA_COMM_EMP_COMPANY]
// HR_1137[BusinessUnitGrid_HR1137#FG_HR1137_BU_LIST]
export const departmentColumnDefs = [
    { headerName: 'businessUnitName', field: 'BU_NAME' },
];
// HR_1147[Hr1147EmployeeListGrid#FG_SA_COMM_EMP_COMPANY]
// HR_1137[EmployeeListGridHR_1137#FG_HR_COMM_EMP_LIST]
export const empColumnDefs = [
    { headerName: 'employeeID', field: 'EMP_ID' },
    { headerName: 'employeeName', field: 'EMP_NAME' },
];
// HR_1147[Hr1147FormNameListGrid#FG_SA_COMM_EMP_COMPANY]
export const formNameColumnDefs = [
    { headerName: 'formName', field: 'SUBMENU_NAME_USER' },
    { headerName: 'submenuId', field: 'SUBMENU_ID' },
];
// HR_1147[Hr1147ServiceUserListGrid#FG_SA_COMM_EMP_COMPANY]
export const serviceUserColumnDefs = [
    { headerName: 'employeeName', field: 'EMP_NAME' },
    { headerName: 'jobTitle', field: 'JOBTITLE' },
    { headerName: 'businessUnitName', field: 'BU_NAME' },
];
// HR_1016[Hr1016BasicOpenModalGrid#FG_HR1016_PAYSTEP_LIST]
export const stepListColumnDefs = [
    { headerName: 'stepId', field: 'STEP_ID' },
    { headerName: 'basic', field: 'BASIC' },
    { headerName: 'grade', field: 'GRADE' },
]

// HR_1149[Hr1149LineListGrid#FG_HR_COMM_LINE_LIST]
// HR_5060[Hr5060LineListGrid#FG_HR_COMM_LINE_LIST]
// HR_9090[Hr9090LineListGrid#FG_HR_COMM_LINE_LIST]
// HR_7010[Hr7010LineListGrid#FG_HR_COMM_LINE_LIST]
// HR_1149[FG_HR_COMM_LINE_LIST#HrLineListOneId]
// HR_3080[FG_HR_COMM_LINE_LIST#Hr3080LineListGrid]
// HR_3080[FG_HR_COMM_LINE_LIST#Hr5010LineListOneId]
// HR_2050[FG_HR_COMM_LINE_LIST#Hr2050LineListId]
// HR_4010[FG_HR_COMM_LINE_LIST#Hr4010LineListOneId] |
// HR_2080[FG_HR_COMM_LINE_LIST#Hr2080LineListOneId] |
// HR_3090[FG_HR_COMM_LINE_LIST#Hr3090LineListOneId] |
// HR_3010[FG_HR_COMM_LINE_LIST#Hr3010LineListOneId] |
// HR_5030[FG_HR_COMM_LINE_LIST#Hr5030LineListOneId] |
export const lineListColumnDefs = [
    { headerName: 'lineName', field: 'LINE_NAME' },
    { headerName: 'remarks', field: 'REMARKS' },
];

export const lineListColumnDefs01 = [
    { headerName: 'lineName', field: 'LINE_NAME' },
    { headerName: 'lineNo', field: 'LINE_NO' },
    { headerName: 'remarks', field: 'REMARKS' },
];

export const employeeLoanAvdColumnDefs = [
    { headerName: 'employee', field: 'EMP_NAME_ID' },
    { headerName: 'jobtitle', field: 'JOBTITLE' },
]
export const loanListOrAdvCategoryColumnDefs = [
    { headerName: 'element', field: 'ELEMENT_NAME' },
    { headerName: 'maxAmt', field: 'MAX_AMT' },
    { headerName: 'ruleDate', field: 'RULE_DATE', cellRenderer: 'datePipeRenderer', },
    { headerName: 'maxInstallment', field: 'MAX_PER' },
]

// HR_1149[Hr1149FloorListGrid#FG_HR_COMM_FLOOR_LIST]
// HR_4010[Hr4010HrFloorListId#FG_HR_COMM_FLOOR_LIST]
export const floorListColumnDefs = [
    { headerName: 'floorName', field: 'FLOOR_NAME' },
    { headerName: 'floorNo', field: 'FLOOR_NO' },
];

// HR_1013[HrListOfLeaveTimeReferredToEmployee#FG_HR1013_EMP_LIST]
export const reliverListColumnDefs = [
    { headerName: 'empNameId', field: 'EMP_NAME_ID' },
    { headerName: 'leaveName', field: 'LEAVE_NAME' },
    { headerName: 'leaveStartDate', field: 'LEAVE_STDATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'leaveEndDate', field: 'LEAVE_ENDDATE', cellRenderer: 'datePipeRenderer' },

];

// HR_1013[HrListOfLeaveTimeReferredToEmployee#FG_HR1013_EMP_LIST]
export const periodListColumnDefs = [
    { headerName: 'from', field: 'START_PERIOD_DATE', cellRenderer: 'datePipeRenderer', },
    { headerName: 'to', field: 'END_PERIOD_DATE', cellRenderer: 'datePipeRenderer', },

];


// hr_3120[HrLineListOneComponent#HrLineListOneId]
// export const lineListColumnDefs = [
//     { headerName: 'lineName', field: 'LINE_NAME' },
//     { headerName: 'floorNo', field: 'FLOOR_NO' },
//     { headerName: 'remarks', field: 'REMARKS' }
// ];

// hr_2210[HrBankNameListComponent#HrBankNameListGrid]
// hr_2080[FG_SA_COMM_COMPANY_BANKS#Hr2080BankNameListGrid]
export const bankNameListColumnDefs = [
    { headerName: 'branchName', field: 'BRANCH_NAME' },
    { headerName: 'bankDtlNo', field: 'BANKDTL_NO' }
];
// hr_2210[FG_SA_COMM_COMPANY_BANK_ACC_NO#HrCompanyAcNameGrid]
// hr_1137[FG_HR_COMM_BANK#BranchNameListGridHR_1137]
export const companyAcNameListDefs = [
    { headerName: 'bankAccNo', field: 'BANK_ACC_NO' },
    { headerName: 'branchName', field: 'BRANCH_NAME' },
    { headerName: 'bankDtlNo', field: 'BANKDTL_NO' }
];
//hr_2210[FG_SA_COMM_REPORT_LIST#HrReportNameListOneGrid]
//hr_2137[FG_HR1137_SUBMENU#ReportNameList_HR1137]
//hr_3120[FG_SA_COMM_REPORT_SUBMENU#Hr3120_ReportList_Grid]
export const reportListDefs = [
    { headerName: 'reportName', field: 'SUBMENU_NAME_USER' },
    { headerName: 'description', field: 'DESCR' },
    { headerName: 'submenuId', field: 'SUBMENU_ID' }
];
//Hr_2210 [FG_HR_COMM_SALARY_PROC_RANGE#HrDateListId]
//Hr_1134 [FG_HR1134_SALARY_DATE_PERIOD#Hr1134DateRangeGrid] |
//Hr_2050 [FG_HR_COMM_SALARY_PROC_RANGE#Hr_2050HrDateListId] |
export const dateListColumnDef = [
    { headerName: 'salaryDateRange', field: 'RANGE' }
];

//Hr_1118 [FG_SA_COMM_CONFIGARATION#Hr1118ProductTypeGrid]
export const productTypeListColumnDef = [
    { headerName: 'detailName', field: 'DTL_NAME' }
];

//Hr_1118 [FG_HR1002_OPERATION_LIST#Hr1118ProcessNameGrid]
export const processNameListColumnDef = [
    { headerName: 'processName', field: 'OPERATION_NAME' }
];
//Hr_2320 [FG_HR_COMM_OPERATION#Hr_2320ProcessNameGrid]
//Hr_2050 [FG_HR_COMM_OPERATION#Hr_2050ProcessNameGrid]
export const processNameListOneColumnDefs = [
    { headerName: 'processName', field: 'OPERATION_NAME' },
    { headerName: 'processId', field: 'OPERATION_NO' },
    { headerName: 'buName', field: 'BU_NAME' },
]

// hr5040[FG_SA_COMM_EMPLOYEES#RequsitionNoListGrid ] | 
export const requisitionNoListColumnDefs = [
    { headerName: 'requisitionId', field: 'REQ_ID' },
    { headerName: 'requisitionPerson', field: 'REQ_PERSON' },
];
// hr5040[FG_SA_COMM_EMPLOYEES#EmployeeListGrid ] | 
export const employeeListColumnDefs = [
    { headerName: 'employeeName', field: 'EMP_NAME' },
    { headerName: 'businessUnit', field: 'BU_NAME' },
    { headerName: 'jobTitle', field: 'JOBTITLE' },
    { headerName: 'employeeID', field: 'EMP_ID' },
];

// hr5040[FG_SA_COMM_EMPLOYEES#EmployeeListGrid ] | 
export const employeeListColumnDefsJobGroup = [
    { headerName: 'employeeName', field: 'EMP_NAME' },
    { headerName: 'employeeId', field: 'EMP_ID' },
    //   { headerName: 'EMP_NO', field: 'EMP_NO' },
    { headerName: 'businessUnit', field: 'BU_NAME' },
    { headerName: 'jobTitle', field: 'JOBTITLE' },
    { headerName: 'Join Date', field: 'JOIN_DATE' },
    { headerName: 'DEFAULT SHIFT', field: 'DEFAULT_SHIFT' }
];
export const processListOneColumnDefs = [
    { headerName: 'processName', field: 'OPERATION_NAME' },
    { headerName: 'processId', field: 'OPERATION_ID' }
];
// hr9100[FG_HR_COMM_OPERATION_LIST#ProcessListTwoId ] | 
// hr3010[FG_HR_COMM_OPERATION_LIST#HR_3010_ProcessListOneId ] | 
// hr3010[FG_HR_COMM_OPERATION_LIST#HR_4010_ProcessListOneId ] | 
export const processListTwoColumnDefs = [
    ...processListOneColumnDefs,
    { headerName: 'buName', field: 'BU_NAME' }
];

// hr3000[FG_HR_COMM_LEAVE_LIST#LeaveListGrid ] | 
// hr1010[FG_HR_COMM_LEAVE#LeaveListGrid ] | 
export const leaveListColumnDefs = [
    { headerName: 'prifixName', field: 'PRIFIX_NAME' },
    { headerName: 'leaveName', field: 'LEAVE_NAME' },
];
// hr7010[FG_HR_COMM_TRAINING#Hr7010TrainingListGrid ] | 
export const trainingListColumnDefs = [
    { headerName: 'trainingId', field: 'TRAINING_ID' },
    { headerName: 'title', field: 'TITLE' },
    { headerName: 'trainingName', field: 'TRAINING_NAME' },
];
// hr1010[FG_HR_COMM_ELEMENT_LIST#ElementListGrid ] | 
// hr1003[FG_HR_COMM_ELEMENT_LIST#ElementListGrid ] | 
export const elementListColumnDefs = [
    { headerName: 'elementName', field: 'ELEMENT_NAME' },
    { headerName: 'elementID', field: 'ELEMENT_ID' },
];

// hr1054[FG_HR1054_REQ_ID_LIST#ElementListGrid ] | 
export const requisitionNumberColumnDefs = [
    { headerName: 'requisitionNumber', field: 'REQ_ID' },
    { headerName: 'date', field: 'REQ_DATE', cellRenderer: 'datePipeRenderer' },
];
// hr1054[FG_HR_COMM_BU_NAME#BusinessUnitsListGrid ] | 
// hr1140[FG_HR_COMM_BU_NAME#Hr1140BusinessUnitGrid ] | 
// hr1142[FG_HR_COMM_BU_NAME#Hr1142BusinessUnitGrid ] | 
export const businessUnitsColumnDefs = [
    { headerName: 'businessUnit', field: 'BU_NAME' },
    { headerName: 'location', field: 'LOC' },
];

// hr1161[FG_HR_COMM_BU_NAME_ALL#Hr1142BusinessUnitGrid ] | 
export const businessUnitColumnDefs = [
    { headerName: 'businessUnit', field: 'BU_NAME' },
];
// hr1054[FG_SA_COMM_CONFIGARATION#EmployeeTypeListGrid ] | 
export const employeeTypeColumnDefs = [
    { headerName: 'employeeType', field: 'DTL_NAME' },
];
// hr1054[FG_HR_COMM_LINE_INFO#LineNameListGrid ] | 
export const lineNameColumnDefs = [
    { headerName: 'lineName', field: 'LINE_NAME' },
];
// hr1054[FG_SA_COMM_CONFIGARATION#ProductTypeListGrid ] | 
export const productTypeColumnDefs = [
    { headerName: 'productType', field: 'PRODUCT_TYPE' },
];

// hr1010[FG_HR_COMM_ELEMENT_LIST#ElementListGrid ] | 
// hr1016[FG_HR1016_ELEMENT#Hr1016ElementModalGrid ] | 
export const elementListTwoColumnDefs = [
    { headerName: 'element', field: 'ELEMENT_NAME' },
    { headerName: 'type', field: 'EARNING' },
    // { headerName: 'amt', field: 'ELEMENT_ID' },
];

//Hr_1144 [FG_SA_COMM_CONFIGARATION#HospitalListGrid]
export const hospitalListColumnDef = [
    { headerName: 'hospitalName', field: 'DTL_NAME' }
];
//Hr_1144 [FG_SA_COMM_CONFIGARATION#HospitalListGrid]
export const dieasesListColumnDef = [
    { headerName: 'dieasesType', field: 'DTL_NAME' }
];
//Hr_1014 [FG_HR_COMM_SERVICEITEM_APRVL#ApprovalTrackGrid_HR1148]
export const approvalTrackColumnDef = [
    { headerName: 'approveBy', field: 'EMP_NAME_ID' },
    { headerName: 'status', field: 'STATUS' },
    { headerName: 'description', field: 'DESCR' },
    { headerName: 'approveDate', field: 'APPROVE_DATE', cellRenderer: 'datePipeRenderer' }
];
//Hr_1148 [FG_HR_COMM_SERVICEITEM_APRVL#ApprovalTrackGridLarge]
export const approvalTrackColumnDefLarge = [
    { headerName: 'approveBy', field: 'EMP_NAME_ID' },
    { headerName: 'designation', field: 'JOBTITLE' },
    { headerName: 'department', field: 'BU_NAME' },
    { headerName: 'status', field: 'STATUS' },
    { headerName: 'description', field: 'DESCR' },
    { headerName: 'approveDate', field: 'APPROVE_DATE', cellRenderer: 'datePipeRenderer' }
];

//Hr_1144 [FG_HR_COMM_BU_NAME#Hr1055BusinessUnitList]
export const businessUnitLocationColumnDef = [
    { headerName: 'businessUnit', field: 'BU_NAME' },
    { headerName: 'location', field: 'LOC' }
];

//Hr_1019 [FG_HR_COMM_ELEMENT#ElementListGrid]
export const elementListColumnDef = [
    { headerName: 'elementName', field: 'ELEMENT_NAME' },
];


//Hr_1019 [FG_HR_COMM_EMPLOYEE_LIST#Hr1019EmployeeListGrid]
export const empNameIDColumnDef = [
    { headerName: 'nameColonId', field: 'EMP_NAME_ID' },
];
// HR_1100[HrTypeGrid_HR_1100#FG_HR_COMM_HR_TYPE]
export const hrTypeColumnDef = [
    { headerName: 'hrType', field: 'DTL_NAME' },
];

// HR_1100[JobTypeList_HR_1100#FG_SA_COMM_CONFIGARATION]
//Hr_1140 [FG_SA_COMM_CONFIGARATION#Hr1140JobTypeGrid]
//Hr_1142 [FG_SA_COMM_CONFIGARATION#Hr1142JobTypeGrid]
export const jobTypeColumnDef = [
    { headerName: 'jobType', field: 'DTL_NAME' },
];

// HR_1100[Hr1019DtlEmployeeListGrid#FG_HR1019_EMP_LIST]
export const dtlEmployeeListColumnDef = [
    { headerName: 'empId', field: 'EMP_ID' },
    { headerName: 'nameColonId', field: 'EMP_NAME_ID' },
    { headerName: 'businessUint', field: 'BU_NAME' },
    { headerName: 'jobTitle', field: 'JOBTITLE' },
    { headerName: 'joinDate', field: 'JOIN_DATE' },
];
// HR_1019[Hr1019ProvideByEmpListGrid#FG_HR_COMM_NOTIN_EMP_LIST]
export const provideByEmpListColumnDef = [
    { headerName: 'nameColonId', field: 'EMP_NAME_ID' },
];

//Hr_1014 [FG_HR1014_ABSENT_STATUS#AbsentStatusGrid]
export const absentColumnDef = [
    { headerName: 'days', field: 'CAL_DT' },
];
// HR_1119[Hr1119LineListGrid#FG_HR_COMM_LINE_INFO ]
export const zoneListColumnDefs = [
    { headerName: 'zoneName', field: 'ZONE_NAME' },
    { headerName: 'process', field: 'PROCESS' },
    { headerName: 'productType', field: 'PRODUCT_TYPE' },
];

// HR_1119[ProcessListGridID#FG_HR_COMM_OPERATION ]
export const processListColumnDefs = [
    { headerName: 'processName', field: 'OPERATION_NAME' },
    { headerName: 'processId', field: 'OPERATION_ID' },
    { headerName: 'buName', field: 'BU_NAME' },
];

//Hr_1016 [FG_SA_COMM_WITHHOLDTAX#taxPolicyGrid]
export const taxPolicyColumnDef = [
    { headerName: 'polName', field: 'POL_NAME' },
];


//Hr_1003 [FG_SA_COMM_CONFIGARATION#JobTypeDescGrid]
export const jobTypeDescColumnDef = [
    { headerName: 'jobType', field: 'DTL_NAME' },
    { headerName: 'descr', field: 'DESCR' },
];

//Hr_1003 [FG_SA_COMM_CONFIGARATION#GradeSingleGrid]
export const gradeSingleColumnDef = [
    { headerName: 'grade', field: 'DTL_NAME' },
];

//Hr_2300 [FG_HR_COMM_SCALE_LIST#GradeListGridId]
export const gradeListColumnDef = [
    { headerName: 'grade', field: 'GRADE' },
];

// /Hr_4010 [FG_HR_COMM_SCALE_LIST#GradeListGridId]
export const salarGgradeListColumnDef = [
    { headerName: 'jobtitle', field: 'JOBTITLE' },
    { headerName: 'salary_grade', field: 'SALARY_GRADE' },

];
//hr_1146 [FG_HR_COMM_EMPLOYEES] #EmpListGridId
export const emplistColumnDef = [
    { headerName: 'empId', field: 'EMP_ID' },
    { headerName: 'empName', field: 'EMP_NAME' },
    { headerName: 'jobTitle', field: 'JOBTITLE' },
    { headerName: 'buName', field: 'BU_NAME' },
    { headerName: 'joinDate', field: 'JOIN_DATE', cellRenderer: 'datePipeRenderer' },

];

//hr_1161 [FG_HR_COMM_EMPLOYEES] #EmpListGridId
export const emplistColumnDef_1161 = [
    { headerName: 'empId', field: 'EMP_ID' },
    { headerName: 'empName', field: 'EMP_NAME' },
    { headerName: 'jobTitle', field: 'JOBTITLE' },
    { headerName: 'buName', field: 'BU_NAME' },

];

//hr_1063 [FG_HR_COMM_EMPLOYEES] #EmpThreeListGridId
export const empThreelistColumnDef = [
    { headerName: 'employee', field: 'EMP_NAME_ID' },
    { headerName: 'jobTitle', field: 'JOBTITLE' },
    { headerName: 'buName', field: 'BU_NAME' },
];

//hr_1161 [FG_HR_COMM_EMPLOYEES] #EmpThreeListGridId
export const empColumnDef = [
    { headerName: 'Name: ID', field: 'EMP_NAME_ID' },
];

//hr_1163 [FG_HR1163_DURATIONPOL_MASTER] #RosterTemplate
export const durationMasterColDef = [
    { headerName: 'Name: Template', field: 'POL_NAME' },
    { headerName: 'Name: Description', field: 'DESCR' },
];


//hr_1156 [FG_HR_COMM_EMPLOYEES] #EmpThreeListGridId
export const employeeColumnDef = [
    { headerName: 'Name: ID', field: 'EMP_NAME_ID' },
    { headerName: 'Card No', field: 'CARD_NO' },
    { headerName: 'Emp No', field: 'EMP_NO' },
];

export const processDateRange = [
    {
        headerName: 'processFromDate', field: 'PROCESS_FROM_DATE', cellRenderer: 'datePipeRenderer',
        cellEditor: 'dateCellEditor'
    },
    {
        headerName: 'processToDate', field: 'PROCESS_TO_DATE', cellRenderer: 'datePipeRenderer',
        cellEditor: 'dateCellEditor'
    }
];

export const leaveColumnDef = [
    { headerName: 'leaveName', field: 'LEAVE_NAME' },
    { headerName: 'holidayCheck', field: 'HOLIDAY_CHECK' },
    { headerName: 'leaveType', field: 'LEAVE_TYPE' }
];



// IN_1013[IN1013customerListWithAdd#FG_IN1013_CUSTOMER_LIST] |
export const ListAttnreqApprovalColumnDefs = [
    { headerName: 'Status Done By', field: 'EMP_NAME_ID' },
    { headerName: 'Status', field: 'STATUS' },
    { headerName: 'Description', field: 'DESCR' },
    { headerName: 'Approve Date', field: 'APPROVE_DATE' },
];




/*====================############=======================
            #region  Purchase Module Column Def
=====================#############=======================*/


// in1079,AC_1127[SalesContractListGrid#FG_SL_COMM_CONTACT_BY_CUSTOMER] | 
export const salesListColumnDefs = [
    { headerName: 'documentQlonAmendment', field: 'DOC_AMENDMENT' },
    { headerName: 'openingDate', field: 'OPENING_DATE' },
];
// sl_1074[SL_1074_AitDrModalGrid#FG_SL_COMM_ACC_NAME] |
// sl_1074[SL_1074_AitCrModalGrid#FG_SL_COMM_ACC_NAME] |
// sl_1074[SL_1074_IncDrModalGrid#FG_SL_COMM_ACC_NAME] |
// sl_1074[SL_1074_IncCrModalGrid#FG_SL_COMM_ACC_NAME] |
// sl_1074[SL_1074_ScDrModalGrid#FG_SL_COMM_ACC_NAME] |
// sl_1074[SL_1074_ScCrModalGrid#FG_SL_COMM_ACC_NAME] |
export const accNameColumnDefs = [
    { headerName: 'accName', field: 'ACC_NAME' }
]
//SL_1074[SL_1074_costCenterModalGrid#FG_SL1074_COSTCENTER_LIST]
export const costCenterNamesColumnDefs = [
    { headerName: 'costCenterName', field: 'COST_NAME' },
];

// in1041[FG_IN1041_OTHERCONDITION_AM#OtherConditionGrid] | 
export const otherConditonColumnDefs = [
    { headerName: 'condition', field: 'CONDITION_NAME' },
    { headerName: 'description', field: 'DESCRIPTION' },
];

// in1005[FG_IN_COMM_INT_EMP_LIST#CommonEmpListGrid] | 
export const employeeColumnDefs = [
    { headerName: 'employeeName', field: 'EMP_NAME' },
    { headerName: 'employeeID', field: 'EMP_ID' },
    { headerName: 'jobTitle', field: 'JOBTITLE' },
];

// in1005[FG_IN_COMM_GROUPITEM_LIST#ItemGroupListGrid] | 
export const itemGroupColumnDefs = [
    { headerName: 'itemName', field: 'ITEM_NAME' },
    { headerName: 'rootGrpName', field: 'ROOT_GRP_NAME' },
];

// in1005[FG_IN1005_PURREQ_ID_FILTER#PurchaseRequisitonGrid] | 
export const purchaseRequisitionColumnDefs = [
    { headerName: 'preqId', field: 'PREQ_ID' },
    { headerName: 'preqDate', field: 'PREQ_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'expectedDate', field: 'EXPECTED_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'reqByName', field: 'REQ_BY_NAME' },
    { headerName: 'reqByBu', field: 'PREQ_FROM_BU' },
];

// in1005[FG_IN1005_REQ_BYFROM_LIST#PurchaseRequisitonByGrid ] | 
export const purchaseRequisitionByColumnDefs = [
    { headerName: 'reqByName', field: 'REQ_BY_NAME' },
    { headerName: 'reqBy', field: 'REQ_BY' },
];

// IN_1005,IN_1019[FG_IN1005_COST_CENTER_LIST#CostCenterNameListGrid ] | 
export const costCenterNameColumnDefs = [
    { headerName: 'costName', field: 'COST_NAME' },
    { headerName: 'salesDocumentId', field: 'SALESDOCUMENT_ID' },
    { headerName: 'description', field: 'DESCR' },
    { headerName: 'salesDocumentId1', field: 'SALESDOCUMENT_ID_1' },
];

// in1005[FG_IN1002_GROUP_ITEM_LIST#CommonGroupItemListGrid ] | 
export const workOrderGroupColumnDefs = [
    { headerName: 'item', field: 'ITEM_NAME' },
    { headerName: 'mainGroup', field: 'ROOT_GRP_NAME' },
];

// in1005[FG_IN1005_WO_LIST#WorkWorderListGrid ] | 
export const workWorderListColumnDefs = [
    { headerName: 'woId', field: 'WO_ID' },
    { headerName: 'woDate', field: 'WO_DATE' },
    { headerName: 'currencyName', field: 'CUR_NAME' },
    { headerName: 'supplierName', field: 'SUPPLIER_NAME' },
    { headerName: 'description', field: 'DESCR' },
    { headerName: 'costName', field: 'COST_NAME' },
    { headerName: 'exchangeRate', field: 'EXCHANGE_RATE' },
];

// in1005[FG_IN_COMM_SUPPLIER_LIST#CommonSupplierListGrid ] | 
export const supplierListColumnDefs = [
    { headerName: 'supplier', field: 'SUPPLIER' },
    { headerName: 'companyName', field: 'COMPANY_NAME' },
    //{ headerName: 'currencyName', field: 'CUR_NAME' },
    { headerName: 'email', field: 'E_MAIL' },
];

// ac1130[FG_IN_COMM_SUPPLIER_LIST#CommonSupplierListGrid ] |
export const supplierListColumnDefsAc = [
    { headerName: 'supplier', field: 'SUPPLIER' },
    { headerName: 'companyName', field: 'COMPANY_NAME' },
    //{ headerName: 'currencyName', field: 'CUR_NAME' },
    { headerName: 'Address', field: 'ADDR1' },
    { headerName: 'Supplier_No', field: 'SUPPLIER_NO' },
];

// in1005[FG_IN_COMM_CURRENCY,FG_SA_COMM_CURRENCY#CommonCurrencyListGrid ] | 
// sl_1076[FG_SA_COMM_NEGO_CURRENCY#SL_1076_ExchangeRateOpenModalGrid ] | 
export const commonCurrencyColumnDefs = [
    { headerName: 'currency', field: 'C_NAME' },
    { headerName: 'currencyID', field: 'CUR_ID' },
    { headerName: 'exchangeRate', field: 'EXCHANGE_RATE' },
];

// in1005[FG_IN1005_STORE_LIST#ReceiveStoreListGrid ] | 
export const commonStoreColumnDefs = [
    { headerName: 'store', field: 'LOC_NAME' },
    { headerName: 'contractByName', field: 'CONTRACT_BY' },
    { headerName: 'type', field: 'STORE_TYPE' },
];
// hr1017[FG_HR_COMM_JOBLOCATION_LIST#LocationListGrid ] | 
export const locationColumnDefs = [
    { headerName: 'location', field: 'JOBLOC_NAME' },
];

// in1005[FG_IN1005_PREPARED_BY_LIST#PreparedByLIstGrid ] | 
// HR1144[FG_HR_COMM_EMP_ALL_PARAM#PreparedByLIstGrid] | 
export const commonPreparedByColumnDefs = [
    { headerName: 'employeeName', field: 'EMP_NAME' },
    { headerName: 'employeeID', field: 'EMP_ID' },
];
export const commonLineInfoColumnDefs = [
    { headerName: 'lineName', field: 'LINE_NAME' },
    { headerName: 'floor', field: 'REMARKS' },
];
export const commonFloorInfoColumnDefs = [
    { headerName: 'floorName', field: 'FLOOR_NAME' },
    { headerName: 'floorNo', field: 'FLOOR_NO' },
];

// in1005[FG_IN1005_IN_WOSTATUS_V#WorkOrderStatusGrid ] | 
export const workOrderStatusColumnDefs = [
    { headerName: 'preqNo', field: 'PREQ_ID' },
    { headerName: 'workorderNo', field: 'WO_ID' },
    { headerName: 'workorderValue', field: 'WO_VALUE' },
    { headerName: 'netBill', field: 'NET_BILL' },
    { headerName: 'netPayment', field: 'NET_PAYMENT' },
    { headerName: 'netAdjustment', field: 'NET_ADJUSTMENT' },
    { headerName: 'netMRR', field: 'NET_MRR' },
    { headerName: 'balance', field: 'Balance' },
];
// in1186[FG_IN1186_CONTRACT_LIST#IN_1186_ContractNoOpenModalGrid ] | 
export const contractIdListColumnDefs = [
    { headerName: 'contractId', field: 'CONTRACT_ID' },
    { headerName: 'lotNo', field: 'LOT_NO' },
    { headerName: 'refCode', field: 'REF_CODE' },
    { headerName: 'salesPrice', field: 'SALE_PRICE' },
    { headerName: 'rcvQty', field: '' }, // No Coluumn assigned in Oracle Form
    { headerName: 'processName', field: 'PROCESS_NAME' },
    { headerName: 'color', field: 'COLOR' },
    { headerName: 'construction', field: 'CONSTRUCTION' },
    { headerName: 'uomName', field: 'UOM_NAME' },
];
// in_1150[FG_IN1150_LOTNO_LIST#IN_1150_lotNoOpenModalGrid]
export const lotListColumnDefs = [
    { headerName: 'lotNo', field: 'MANUAL_LOT' },
    { headerName: 'refCode', field: 'REF_CODE' },
    { headerName: 'processName', field: 'PROCESS_NAME' },
    { headerName: 'color', field: 'COLOR' },
    { headerName: 'construction', field: 'CONSTRUCTION' },
    { headerName: 'description', field: 'DESCRIPTION' },
    { headerName: 'qty', field: 'QTY' },
    { headerName: 'rate', field: 'RATE' },
    { headerName: 'uom', field: 'UOM' }
]
// in1150[IN_1150_ContractNoOpenModalGrid#FG_IN1150_CONTRACTNO_LIST]
export const contractNoList = [
    { headerName: 'contractId', field: 'CONTRACT_ID' },
    { headerName: 'date', field: 'CON_DATE', cellRenderer: 'datePipeRenderer' }
]
// in1150[IN_1150_RollDtl_RollNoOpenModalGrid#FG_IN1150_ROLL_LIST]
// in1150[IN_1186_RollDtl_RollNoOpenModalGrid#FG_IN1186_ROLL_LIST]
export const rollListColumnDefs = [
    { headerName: 'rollNo', field: 'ROLL_NO' },
    { headerName: 'color', field: 'COLOR' },
    { headerName: 'qty', field: 'QTY' },
    { headerName: 'shade', field: 'OFF_SHADE' },
    { headerName: 'type', field: 'TYPE' },
    { headerName: 'fallPoint', field: 'FALL_POINT' },
];
// in1005[FG_IN1059_ITEM_LIST#itemListGrid_IN_1005 ] | 
export const itemListColumnDefs = [
    { headerName: 'itemName', field: 'ITEM_NAME' },
    { headerName: 'itemId', field: 'ITEM_ID' },
    { headerName: 'uom', field: 'UOM_SHORT' },
    { headerName: 'description', field: 'DESCR' },
    { headerName: 'brand', field: 'BRAND' },
    { headerName: 'model', field: 'MODEL_INFO' },
    { headerName: 'origin', field: 'ORIGIN' },
    { headerName: 'manufacturer', field: 'MANUFACTURER_NAME' },
];

// in1005[FG_IN1005_UOM_LIST#UomListGrid ] | 
export const uomListColumnDefs = [
    { headerName: 'uomName', field: 'UOM_NAME' },
    { headerName: 'uomShort', field: 'UOM_SHORT' },
    { headerName: 'parentUnit', field: 'PARENT_UNIT' },
    { headerName: 'baseRelation', field: 'PARENT_UNIT' },
];
// ItemCostDistributionComponent[FG_IN1005_COSTCATEGORY#CostCategoryGrid ] | 
export const costCategoryColumnDefs = [
    { headerName: 'costCategory', field: 'COSTCATEGORY_NAME' },
];
export const sourceTypeColumnDefs = [
    { headerName: 'sourceType', field: 'SOURCE_TYPE' },
];
// IN_1017[FG_SL1017_SALESCONTRACT_LIST#SalesContractGrid ] | 
export const salesContractListColumnDefs = [
    { headerName: 'documentAmendment', field: 'DOC_AMENDMENT' },
    { headerName: 'openingDate', field: 'OPENING_DATE' },
]

// in1019[FG_IN_COMM_SUPPLIER_LIST#CommonSupplierListGrid ] | 
export const supplierListLargeColumnDefs = [
    ...supplierListColumnDefs,
    { headerName: 'phone', field: 'PHONE1' },
    { headerName: 'mobile', field: 'MOBILE' },
    { headerName: 'web', field: 'WEB' },
    { headerName: 'supplierBank', field: 'SUPPLIER_BANK' },
];

// IN_1019[FG_IN1019_SUPPOFFER_WO_LIST#SupplierofferWoListGrid ] | 
export const workOrderColumnDefs = [
    { headerName: 'woNo', field: 'WO_ID' },
    { headerName: 'date', field: 'WO_DATE_FMT' },
    { headerName: ' ', field: 'WO_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'supplier', field: 'SUPPLIER_NAME' },
    { headerName: 'description', field: 'DESCRIPTION' },
    { headerName: 'salesDocumentNo', field: 'SALESDOCUMENT_ID' },
    { headerName: 'costName', field: 'COST_NAME' },
    { headerName: 'salesDocumentId1', field: 'SALESDOCUMENT_ID_1' },
]
// IN_1019[FG_IN1019_ITEM_LIST#ItemListGrid_IN1019 ] | 
export const itemListSmallColumnDefs = [
    { headerName: 'itemName', field: 'ITEM_NAME' },
    { headerName: 'uom', field: 'UOM' },
    { headerName: 'description', field: 'DESCR' },
];
// IN_1019[FG_IN1019_BANK_LIST#BankListGrid]
export const bankListColumnDefs = [
    { headerName: 'bankDtl', field: 'BANKDTL' },
    { headerName: 'branchAlias', field: 'BRANCH_ALIAS' }
];
// IN_1019[FG_AC_COMM_CURRENCIES#CurrencyShortGrid]
export const currencyShortListColumnDefs = [
    { headerName: 'currency', field: 'CUR_NAME' },
    { headerName: 'exchangeRate', field: 'EXCHANGE_RATE' }
];

// IN_1019[FG_AC_COMM_CURRENCIES#CurrencyShortGrid]
export const puroryListColumnDefs = [
    { headerName: 'PQRY_ID', field: 'PQRY_ID' },
    { headerName: 'PQRY_DATE', field: 'PQRY_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'DESCR', field: 'DESCR' },
];
// IN_1019[FG_IN1019_PURCONTRACT_LIST#PurchaseContractListGrid]
export const purchaseContractColumnDefs = [
    { headerName: 'producumentId', field: 'PURDOCUMENT_ID' },
];
// IN_1019[FG_IN1019_SALESCONTRACT_LIST#SalesDocumentListGrid]
export const salesContractColumnDefs = [
    { headerName: 'documentId', field: 'DOCUMENT_ID' },
    { headerName: 'customername', field: 'CUSTOMER_NAME' },
    { headerName: 'openingDate', field: 'OPENING_DATE', cellRenderer: 'datePipeRenderer' },
];
// IN_1019[FG_IN1019_SALESCONTRACT_LIST#TermListGrid]
export const termListColumnDefs = [
    { headerName: 'term', field: 'TERM_NAME' },
    { headerName: 'description', field: 'DESCR' },
];

// in1036[FG_SA_COMM_CURRENCY_LIST#CurrencyListGridID] | 
// gr1022[FG_SA_COMM_CURRENCY_LIST#CurrencyListGridID] | 
export const currencyColumnDefs = [
    { headerName: 'currency', field: 'C_NAME' },
    { headerName: 'isoCode', field: 'ISO_CODE' },
    { headerName: 'exchangeRate', field: 'EXCHANGE_RATE' },
];



// in1036[FG_IN1036_PREQ_LIST#PurReqListGridID] | 
export const purReqColumnDefs = [
    { headerName: 'purchaseReqId', field: 'PREQ_ID' },
    { headerName: 'purchaseReqDate', field: 'PREQ_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'expectedDate', field: 'EXPECTED_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'reqByName', field: 'REQ_BY_NAME' },
    { headerName: 'preqFromBu', field: 'PREQ_FROM_BU' },
];

// in1036[FG_IN_COMM_STORE#StoreListGridID] | 
// IN_1111[FG_IN_COMM_STOREUSER#StoreListGridID ] |
export const storeColumnDefs = [
    { headerName: 'storeName', field: 'LOC_NAME' },
    { headerName: 'storeType', field: 'STORE_TYPE' },
];

// in1036[FG_IN_COMM_COST_CENTER#CostCenterListGridID] | 
export const costCenterColumnDefs = [
    { headerName: 'costCenter', field: 'COST_NAME' },
    { headerName: 'descr', field: 'DESCR' },
];

// in1036[FG_IN1036_PURCONTRACT_LIST#ParentCostCenterListGridID] | 
export const parentCostCenterColumnDefs = [
    { headerName: 'docCloneSignAmendment', field: 'DOC_AMENDMENT' },
    { headerName: 'supplierName', field: 'SUPPLIER_NAME' },
];
// in1036[FG_SL1036_SALESCONTRACT_LIST#SalesContractsListGridID] | 
export const salesContractsColumnDefs = [
    { headerName: 'docCloneSignAmendment', field: 'DOC_AMENDMENT' },
    { headerName: 'costCenter', field: 'COST_NAME' },
];

// in1036[FG_IN1036_SALESCONTRACT_LIST#mstLcListGridID] | 
export const mstLcColumnDef = [
    { headerName: 'lSlashCNo', field: 'LC_NO' },
    { headerName: 'lSlashCDate', field: 'OPENING_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'lSlashCValue', field: 'LC_VALUE' },
    { headerName: 'usedValue', field: 'USED_VALUE' },
    { headerName: 'pendingValue', field: 'PENDING_VAL' },
];

// in1036[FG_IN1036_CONDITION_LIST#ConditionListGridID] | 
export const conditionColumnDefs = [
    { headerName: 'condition', field: 'CONDITION' },
];

// in1036[FG_IN_COMM_COSTCATEGORY#AdditionalCatListGridID] | 
export const additionalCatColumnDefs = [
    { headerName: 'condition', field: 'CONDITION' },
];

// in1036[FG_IN_COMM_COSTCATEGORY#AdditionalCatListGridID] | 
export const itemCostListColumnDefs = [
    { headerName: 'costCategoryName', field: 'COSTCATEGORY_NAME' },
];

// IN_1013[IN1013customerListWithAdd#FG_IN1013_CUSTOMER_LIST] |
export const customerListWithAddColumnDefs = [
    { headerName: 'customerName', field: 'CUSTOMER_NAME' },
    { headerName: 'addressOne', field: 'ADDR1' },
];

// IN_1013[vendorTypeListID#FG_IN1013_VENDOR_LIST] |
export const vendorTypeListColumnDefs = [
    { headerName: 'type', field: 'TYPE_NAME' },
    { headerName: 'description', field: 'DESCR' },
];

// IN_1013[AccountsListID#FG_IN1013_CUSTOMER_LIST] |
export const accountsListColumnDefs = [
    { headerName: 'accName', field: 'ACC_NAME' },
    { headerName: 'accCode', field: 'ACC_CODE' },
    { headerName: 'accNo', field: 'ACC_NO' },
];
// IN_1013[StoreListID#FG_IN1013_STORE_LIST] |
export const storeListColumnDefs = [
    { headerName: 'storeName', field: 'BU_NAME' },
];
// IN_1013[CostCenterListID#FG_IN1013_STORE_LIST] |
export const costCenterListColumnDefs = [
    { headerName: 'costName', field: 'COST_NAME' },
];

// IN_1225[costCenterList#FG_AC_COMM_COST_BASIC_LIST] |
export const costCenter1225ColumnDefs = [
    { headerName: 'costName', field: 'COST_NAME' },
    { headerName: 'description', field: 'DESCR' },
];

export const buyerListColumnDefs = [
    { headerName: 'storeName', field: 'SHORT_NAME' },
];
// in1036[FG_IN_COMM_SUPPLIER_LIST#SupplierListGridID] | 
// export const supplierColumnDefs = [
//     { headerName: 'condition', field: 'CONDITION' },
// ];

//in1045[reqItemList#FG_IN1045_ITEM_LIST ]

export const reqItemListColumnDefs = [
    { headerName: 'item', field: 'ITEM_NAME' },
    { headerName: 'description', field: 'DESCR' },
    { headerName: 'brand', field: 'BRAND' },
    { headerName: 'modelInfo', field: 'MODEL_INFO' },
    { headerName: 'origin', field: 'ORIGIN' },
    { headerName: 'itemNo', field: 'ITEM_NO' }


];
//in1045[reqStoreList#FG_IN_COMM_STOREUSER ]

export const reqStoreListColumnDefs = [
    { headerName: 'storeName', field: 'LOC_NAME' },
    { headerName: 'storeType', field: 'STORE_TYPE' }
];


/*====================############=======================
            #region  Material Management Column Def
=====================#############=======================*/

// IN_2500[FG_SL_COMM_CONTACT_INFO#InContractListId ] | 
export const contractListColumnDefs = [
    { headerName: 'documentId', field: 'DOCUMENT_ID' },
    { headerName: 'date', field: 'OPENING_DATE' },
    { headerName: 'customer', field: 'CUSTOMER_NAME' }
]
// IN_2500[FG_IN_COMM_VATCHALLAN_INFO#InVatChallanListId ] | 
export const vatChallanColumnDefs = [
    { headerName: 'date', field: 'VATCHALLAN_DATE' },
    { headerName: 'customer', field: 'CUSTOMER_NAME' },
    { headerName: 'documentId', field: 'DOCUMENT_ID' },
];
// IN_1186 [FG_SL_COMM_CUSTOMER#IN_1186_CustomerNameList] |
// IN_1150 [FG_SL_COMM_CUSTOMER#IN_1150_CustomerNameList] |
export const inCustomerListColumnDefs = [
    { headerName: 'customername', field: 'CUSTOMER_NAME' },
    { headerName: 'address', field: 'ADDRESS' },
];
// IN_1186 [FG_IN1186_REF_CHALLAN_LIST#IN_1186_ChallanListID] |
export const inChallanListColumnDefs = [
    { headerName: 'challanId', field: 'CHALLAN_ID' },
    { headerName: 'challanDate', field: 'CHALLAN_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'soNo', field: 'SO_ID' },
    { headerName: 'customerName', field: 'CUSTOMER_NAME' },
    { headerName: 'address', field: 'ADDRESS' },
    { headerName: 'date', field: 'ORDER_DATE', cellRenderer: 'datePipeRenderer' },
];
export const doNoListColumnDefs = [
    { headerName: 'soNo', field: 'SO_ID' },
    { headerName: 'date', field: 'ORDER_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'rate', field: 'RATE' },
    { headerName: 'reqQty', field: 'REQ_QNTY' },
    { headerName: 'pendingQty', field: 'PENDING_QTY' },

]

// IN_2510[FG_IN_COMM_SUPPLIER_INFO#InSupplierListId ] | 
export const supplierColumnDefs = [
    { headerName: 'supplier', field: 'SUPPLIER' },
    { headerName: 'supplierId', field: 'SUPPLIER_ID' },
];
// IN_2510[FG_SA_COMM_BU_INFO#InStoreSlashBuListId ] | 
// SL_1074[FG_SL_COMM_STORE_NAME#sl_1074_storeNameModalGrid ] | 
export const storeSlashBuColumnDefs = [
    { headerName: 'storeName', field: 'STORE_NAME' },
    { headerName: 'storeType', field: 'STORE_TYPE' },
]
// IN_2390[FG_SA_COMM_ITEM_LIST#InItemListId ] | 
export const inItemListColumnDefs = [
    { headerName: 'itemName', field: 'ITEM_NAME' },
    { headerName: 'itemId', field: 'ITEM_ID' },
];
// IN_1150[FG_IN1150_MAP_LIST#IN_1150_itemCodeOpenModalGrid ] | 
export const itemCodeListColumnDefs = [
    ...inItemListColumnDefs,
    { headerName: 'qty', field: 'QNTY' }
]
// IN_2390[FG_SL_COMM_ORDER_DTLS#InOrderNoListId ] | 
export const orderNoListColumnDefs = [
    { headerName: 'salesOrder', field: 'SO' },
    { headerName: 'orderDate', field: 'ORDER_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'customer', field: 'CUSTOMER_NAME' },
]
// IN_2770[FG_IN_COMM_TRN_INFO#InTransactionTypeListId ] |
export const transactionTypeListColumnDefs = [
    { headerName: 'transactionName', field: 'TRN_NAME' },
    { headerName: 'type', field: 'TRN_TYPE' }
]
// IN_2770[FG_IN_COMM_LOAN_REQ_INFO#InLoanRequisitionNoListId ] |
export const loanRequisitionNoListColumnDefs = [
    { headerName: 'reqID', field: 'REQ_ID' },
    { headerName: 'reqDate', field: 'REQ_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'reqByNameId', field: 'REQ_BY_NAME_ID' },
];
// IN_2770[FG_IN_COMM_LOAN_REQ_INFO#InLoanNoListId ] |
export const loanNoListColumnDefs = [
    { headerName: 'loanOrderId', field: 'LO_ID' },
    { headerName: 'loanOrderDate', field: 'ORDER_DATE', cellRenderer: 'datePipeRenderer' }
];
// IN_2920[FG_SA_COMM_STORE_USER#InFromStoreId ] |
export const inFromStoreColumnDefs = [
    { headerName: 'storeName', field: 'STORE_NAME' },
    { headerName: 'storeType', field: 'STORE_TYPE' },
]
// IN_1186[FG_IN_COMM_UOM_LIST#IN_1186UomListGridID ] |
export const inFromUomListColumnDefs = [
    { headerName: 'uomName', field: 'UOM_NAME' },
]
// IN_1186[FG_IN1036_VOUCHAR_LIST#AttachableVoucherListGridID ] |
export const voucherListColumnDefs = [
    { headerName: 'voucher', field: 'Voucher' },
    { headerName: 'narration', field: 'NARRATION' },
]
// IN_1036[FG_IN1036_ITEM_LIST#ListOfItemGridID ] |
export const itemListInColumnDefs = [
    { headerName: 'itemName', field: 'ITEM_NAME' },
    { headerName: 'uom', field: 'UOM_SHORT' },
    { headerName: 'description', field: 'DESCR' },
    { headerName: 'itemNo', field: 'ITEM_ID' },
    { headerName: 'brand', field: 'BRAND' },
    { headerName: 'model', field: 'MODEL_INFO' },
    { headerName: 'origin', field: 'ORIGIN' },
    { headerName: 'manufecturer', field: 'MANUFACTURER_NAME' },
    { headerName: 'itemNameDisplay', field: 'ITEM_NAME_DISPLAY' },
]

// IN_2910[portListGrid#FG_SA_COMM_BU_INFO   P_QUERYOPTIONS: '6'] |
export const issueStoreColumnDefs = [
    { headerName: 'Store Name', field: 'STORE_NAME' },
    { headerName: 'LOC NO', field: 'LOC_NO' },
    { headerName: 'STORE TYPE', field: 'STORE_TYPE' },
]

// IN_2910[portListGrid#FG_SL_COMM_CUSTOMER_INFO   P_QUERYOPTIONS: '1'] |
export const issueCustomerColumnDefs = [
    { headerName: 'CUSTOMER NAME', field: 'CUSTOMER_NAME' },
    { headerName: 'CUSTOMER ID', field: 'CUSTOMER_ID' },
    { headerName: 'CUSTOMER NO', field: 'CUSTOMER_NO' },

]


// IN_2910[portListGrid#FG_IN_COMM_ITEM_LIST  ] |
export const submenuInfoColumnDefs = [
    { headerName: ' SUBMENU ', field: 'SUBMENU_NAME_USER' },
    { headerName: 'TRN TYPE', field: 'TRN_TYPE' },
    { headerName: 'Type Id', field: 'TYPE_ID' },
    { headerName: 'MC TRN', field: 'MC_TRN' },
    { headerName: 'SL NO', field: 'SL_NO' },

]



// IN_2910[portListGrid#FG_IN_COMM_ITEM_LIST  ] |
export const issueItemColumnDefs = [
    { headerName: 'ITEM NAME', field: 'ITEM_NAME' },
    { headerName: 'ITEM ID', field: 'ITEM_ID' },
    { headerName: 'ITEM NO', field: 'ITEM_NO' },

]

export const workOrderListColumnDefs = [
    { headerName: 'WO No', field: 'WO_ID' },
    { headerName: 'WO Date', field: 'WO_DATE' },
    { headerName: 'Supplier', field: 'SUPPLIER_NAME' },
    { headerName: 'Comments', field: 'PREQ' },
    { headerName: 'Currency', field: 'CUR_NAME' },
    { headerName: 'Cost Center', field: 'COST_NAME' },
    { headerName: 'Exchange Rate', field: 'EXCHANGE_RATE' },
]

export const attendSummaryColumnDefs = [
    { headerName: 'status', field: 'WO_ID' },
    { headerName: 'shift', field: 'WO_DATE' },
    { headerName: 'days', field: 'SUPPLIER_NAME' }
]

//#endregion
export const uomColumnDefs = [
    { headerName: 'uomName', field: 'UOM_NAME', Filter: true },
    { headerName: 'uomShort', field: 'UOM_SHORT', Filter: true },
];








/*====================############=======================
            #region Sales Module Column Def
=====================#############=======================*/

// sl2890[FG_SA_COMM_ITEM_LIST#GroupNameGrid ] | 
export const groupNameColumnDefs = [
    { headerName: 'groupName', field: 'GROUP_NAME' },
    { headerName: 'subItemOf', field: 'SUBITEM_OF' },
];
// sl2830[FG_SA_COMM_STORE_LIST#SalesCenterGrid ] | 
// sl1074[FG_SL_COMM_STORE_NAME#SL1074_BU_NO_GRID ] | 
export const salesCenterColumnDefs = [
    { headerName: 'storeName', field: 'STORE_NAME' },
    { headerName: 'storeType', field: 'STORE_TYPE' },
];
// sl2660[#FG_SA_COMM_EMPLOYEES#RequisitionByGrid] | 
export const requisitionByColumnDefs = [
    { headerName: 'empName', field: 'EMP_NAME' },
    { headerName: 'jobTitle', field: 'JOBTITLE' },
    { headerName: 'areaName', field: 'AREA_NAME' },
];
// sl_1076[#SL1076_VoucherTypeGrid#FG_AC_COMM_VOUCHER_TYPE_LIST] |
export const voucherTypeListColumnDefs = [
    { headerName: 'voucherType', field: 'TYPE_NAME' }
]
// sl2190[#FG_SL_COMM_CUSTOMER_INFO#CustomerGrid] | 
export const customerColumnDefs = [
    { headerName: 'customerName', field: 'CUSTOMER_NAME' },
    { headerName: 'customerID', field: 'CUSTOMER_ID' },
    { headerName: 'description', field: 'DESCR' },
];
// sl_1076[#SL1076_CollNoGrid#FG_SL1076_SALESCONTRACT]
export const collNoListColumnDefs = [
    { headerName: 'collNo', field: 'LC_NO' },
    { headerName: 'collDate', field: 'LC_DATE' }
];
//  sl_1076 [#SL1076_PayNoGrid#FG_IN_COMM_BANKREF_LIST]
export const bankRefListColumnDefs = [
    { headerName: 'bankRef', field: 'BANKREF_LIST' }
]
// sl2040[#FG_SA_COMM_EMPLOYEES#AccountManagerGrid] | 
export const accountManagerColumnDefs = [
    { headerName: 'empName', field: 'EMP_NAME' },
    { headerName: 'jobTitle', field: 'JOBTITLE' },
    { headerName: 'buName', field: 'BU_NAME' },
];
// sl2040[#FG_SL_COMM_CUSTOMER_INFO#CustomerListGrid] | 
export const customerListColumnDefs = [
    { headerName: 'customerName', field: 'CUSTOMER_NAME' },
    { headerName: 'customerId', field: 'CUSTOMER_ID' },
    { headerName: 'customerPerson', field: 'CUSTOMER_PERSON' },
];

// hr1005[#FG_HR_COMM_CURRSHIFTTIMING#Hr1005ShiftListGrid] | 
export const shiftNameListColumnDefs = [
    { headerName: 'shiftName', field: 'SHIFT_ID' },
    { headerName: 'inTime', field: 'IN_TIME' },
    { headerName: 'outTime', field: 'OUT_TIME' },
];

// hr1025[#FG_HR1025_SCHEDULE_SHIFT#Hr1025ShiftListGrid] | 
export const shiftWithTDListColumnDefs = [
    { headerName: 'shift', field: 'SHIFT_ID' },
    { headerName: 'inTime', field: 'IN_TIME', cellRenderer: "timePipeRenderer" },
    { headerName: 'outTime', field: 'OUT_TIME', cellRenderer: "timePipeRenderer" },
];
// hr1016[#FG_HR1016_PAYROLLPERC_LIST#Hr1016PeronModalGrid] | 
// hr1016[#FG_HR_COMM_PAYROLLPERCENTON#mp-wise-fixed-element-PeronGridID] | 
export const peronListColumnDefs = [
    { headerName: 'element', field: 'LAB' },
]

// HR1101[FG_SA_COMM_CONFIGARATION#DesignationGridHR_1101 ] | 
// HR1003[FG_SA_COMM_CONFIGARATION#GroupNameSingleList] | 
export const groupNameSinleColumnDefs = [
    { headerName: 'groupName', field: 'DTL_NAME' },
];
// HR1003[FG_HR_COMM_SALEFFECTTYPESETUP#EffectTypeGrid] | 
export const effectTypeColumnDefs = [
    { headerName: 'effectType', field: 'EFFECT_TYPE_NAME' },
];

export const jobTypeColumnDefs = [
    { headerName: 'job Type', field: 'DTL_NAME' },
];

// sl1004[#FG_SL1004_INVOICE_LIST#SalesInvoiceListGirdID] | 
export const customerInvoiceListColumnDefs = [
    { headerName: 'invoiceNo', field: 'SI_ID' },
    { headerName: 'invoiceDate', field: 'INVOICE_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'customer', field: 'CUSTOMER_NAME' },
    { headerName: 'costCenter', field: 'COST_NAME' },
];

// sl1004[#FG_SL_COMM_SI#SalesInvoiceDateListGirdID] | 
export const invoiceDateListColumnDefs = [
    { headerName: 'invoiceBracDateBrac', field: 'SI_LIST' },
    { headerName: 'document', field: 'DOC_AMENDMENT' },
];

// SL_2470[portListGrid#FG_IN_COMM_ITEM_LIST  ] |
export const deliverypiListColumnDefs = [
    { headerName: 'PI NO', field: 'PI_NO' },
    { headerName: 'PI', field: 'PI' },
    { headerName: 'PI DATE', field: 'PI_DATE' },

]


// SL_2470[portListGrid#FG_IN_COMM_ITEM_LIST  ] |
export const deliveryOrderColumnDefs = [
    { headerName: 'SO NO', field: 'SO_NO' },
    { headerName: 'SO', field: 'SO' },
    { headerName: 'CUSTOMER NO', field: 'CUSTOMER_NO' },
    { headerName: 'CUSTOMER NAME', field: 'CUSTOMER_NAME' },
    { headerName: 'ORDER_DATE', field: 'ORDER_DATE' },

]
// SL_2090[portListGrid#FG_SL_COMM_INVOICE_LIST  ] |
export const invoiceColumnDefs = [
    { headerName: 'SI NO', field: 'SI_NO' },
    { headerName: 'INVOICE NO', field: 'SI_ID' },
    { headerName: 'INVOICE DATE', field: 'INVOICE_DATE' },


]

// sl2020[#FG_SL_COMM_CUSTOMER_INFO#CustomerGrid] | 
export const salesInvoiceCustomerColumnDefs = [
    { headerName: 'customerName', field: 'CUSTOMER_NAME' },
    { headerName: 'customerID', field: 'CUSTOMER_ID' },
    { headerName: 'customer no', field: 'CUSTOMER_NO' },
];

// sl2550[#FG_SL_COMM_CUSTOMER_INFO#CustomerGrid] | 
export const salesLcFileColumnDefs = [
    { headerName: 'LC FILE NO', field: 'LC_FILE_NO' },
    { headerName: 'DOCUMENT ID', field: 'DOCUMENT_ID' },
    { headerName: 'CONTRACT NO', field: 'CONTRACT_NO' },
];

// sl2550[#FG_SL_COMM_CUSTOMER_INFO#CustomerGrid] | 
export const salesDocTypeColumnDefs = [
    { headerName: 'DOCTYPE NAME', field: 'DOCTYPE_NAME' },
    { headerName: 'SORT NAME', field: 'SORT_NAME' },
    { headerName: 'DOCTYPE NO', field: 'DOCTYPE_NO' },
    { headerName: 'DEFAULT FLAG', field: 'DEFAULT_FLAG' },
];

// IN_1013[IN1013customerListWithAdd#FG_IN1013_CUSTOMER_LIST] |
export const customerListWithAdd01ColumnDefs = [
    { headerName: 'customerName', field: 'CUSTOMER_NAME' },
    { headerName: 'customerNo', field: 'CUSTOMER_NO' },
    { headerName: 'addressOne', field: 'ADDR1' },
];




/*====================############=======================
            #region  AC Module Column Def
=====================#############=======================*/
// AC1005[#FG_AC_COMM_CHART_OF_ACCOUNTS#AccoutMultiListGrid] | 
// SL_1076[#FG_SL1076_ACCOUNT_LIST#SL_1076_AccountsOpenModalGrid] | 
export const accountMultiListColumnDefs = [
    { headerName: 'accountName', field: 'ACC_NAME' },
    { headerName: 'accPath', field: 'ACC_PATH' },
    { headerName: 'accCode', field: 'ACC_CODE' },
    { headerName: 'mapAccount', field: 'MAP_ACC_NAME' },
];
// AC1001[#FG_AC_COMM_CHART_OF_ACCOUNTS#AccoutiListGrid] | 
export const accountListColumnDefs = [
    { headerName: 'accountName', field: 'ACC_NAME' },
    { headerName: 'accCode', field: 'ACC_CODE' },
];
export const accountNameListColumnDefs = [
    { headerName: 'accountName', field: 'ACC_NAME' },
    { headerName: 'accCode', field: 'ACC_CODE' },
];
// AC1005[#FG_AC_COMM_CHART_BA_LISTS#BusinessAreaListGrid] | 
export const businessAreaColumnDefs = [
    { headerName: 'businessArea', field: 'BA_NAME' },
];
// AC1005[#FG_AC_COMM_COST_LIST#CostCenterListGrid] | 
// SL_1076[#FG_SL1076_COST_LIST#SL_1076_CostCenterOpenModalGrid] | 
// AC_1130[#FG_AC_COMM_COST#AC_1130_CostCenterOpenModalGrid] |
export const CostCenterColumnDefs = [
    { headerName: 'costCenter', field: 'COST_NAME' },
];


// AC_1003[AccountTypeGrid#FG_AC1003_ACCOUNT_TYPES] |
// SL_1074[SL1074ORDER_TYPE_GRID#FG_SA_COMM_CONFIGARATION] |
// SL_1074[OrderTypeModalGrid#FG_SA_COMM_CONFIGARATION] |
export const accountTypeColumnDefs = [
    { headerName: 'dtlName', field: 'DTL_NAME' },
];

export const groupCostCenterDef = [
    { headerName: 'Cost Name', field: 'COST_NAME' },
];
// AC_1003[AccountTypeGrid#FG_AC1003_ACCOUNT_TYPES]
export const voucherIDColumnDefs = [
    { headerName: 'voucherID', field: 'V_ID' },
];

// AC1023[#BankInfoListGrid#FG_AC_COMM_BANK_INFO] | 
export const bankInfoColumnDefs = [
    { headerName: 'branchName', field: 'BRANCH_NAME' },
    { headerName: 'branchAddress', field: 'BRANCH_ADDR' },
    { headerName: 'accNo', field: 'BANK_ACC_NO' },
    { headerName: 'accountName', field: 'ACC_NAME' },
];

// AC1023[#FG_AC_COMM_BANK_CHEQUE_INFO#PayToNameGrid] | 
export const payToNameColumnDefs = [
    { headerName: 'payToName', field: 'PAY_TO_NAME' },
];
// AC1023[EmployeeShortGrid#FG_AC_COMM_BANK_CHEQUE_INFO, FG_IN_COMM_INT_EMP_LIST]
export const EmployeeShortColumnDef = [
    { headerName: 'employeeNameId', field: 'EMP_NAME_ID' },
    { headerName: 'jobTitle', field: 'JOBTITLE' },
];

// AC1023[ChequeTypeGrid#FG_AC_COMM_BANK_CHEQUE_INFO]
export const ChequeTypeColumnDef = [
    { headerName: 'status', field: 'STATUS' },
];

export const invoiceListColumnDefs = [
    { headerName: 'Supplier Name', field: 'SUPPLIER_NAME', width: 300 },
    { headerName: 'Cost Name', field: 'COST_NAME', width: 300 },
    { headerName: 'Wo No', field: 'WO_ID', width: 175 },
    { headerName: 'Wo Date', field: 'WO_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'Type', field: 'LC_TYPE', width: 50 },
    { headerName: 'ERP Bill NO', field: 'DOC_NO', width: 175 },
    { headerName: 'Supp Bill No', field: 'INVOICE_NO', width: 175 },
    { headerName: 'Bill Date', field: 'INVOICE_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'Cur Name', field: 'CUR_NAME' },
    { headerName: 'Exchange Rate', field: 'EXCHANGE_RATE' },
    { headerName: 'Invoice Value', field: 'INVOICE_VALUE' },
    { headerName: 'Audited', field: 'AUDITED_VALUE' },
    { headerName: 'Payment Value', field: 'PAY_AMT' },
    { headerName: 'Pending Value', field: 'PENDING_VALUE' },

]

export const costCenterColumnDef = [
    { headerName: 'moneyreqNo', field: 'MONEYREQ_ID' },
    { headerName: 'scheduleNo', field: 'MONEYSCHEDULE_ID' },
    { headerName: 'costCenter', field: 'COST_CENTER' },
    { headerName: 'pendingAmount', field: 'PANDING_AMOUNT' },
    { headerName: 'dueAmt', field: 'DUE_AMT' },
];


// ACCEPTANCE_VALUE: null
// AUDITED_VALUE: 81900
// BILL_NO: 16228
// COST_NAME: "Farid Ahmed-purchase"
// COST_NO: 2160
// CUR_NAME: "BDT"
// CUR_NO: 1
// DOC_NO: "MIL/BL/S0684/18/0003295"
// EXCHANGE_RATE: 1
// INVOICE_DATE: "2018-06-24T00:00:00.000+0600"
// INVOICE_NO: "nill"
// INVOICE_VALUE: 81909.58
// LC_TYPE: "W"
// PAY_AMT: 1000
// PENDING_VALUE: 80900
// REF_NO: "W16228"
// SUPPLIER_NAME: "GENERAL SUPPLIER"
// SUPPLIER_NO: 2830
// WO_DATE: "2018-06-12T00:00:00.000+0600"
// WO_ID: "MIL/WO/MN/S0684/18/0259"




// AC_1127[CustomerShortColumnDefs#FG_SL_COMM_CUSTOMER_LIST] |
// SL_1076[SL1076_SupplierGrid#FG_IN1013_CUSTOMER_LIST] |
// GR_1022[GR1022_SupplierGrid#FG_GR1022_CUSTOMER_LIST] |
// IN_1111[SL1076_SupplierGrid#CustomerListGridID] |
export const CustomerShortColumnDefs = [
    { headerName: 'customerName', field: 'CUSTOMER_NAME' },
    { headerName: 'customerId', field: 'CUSTOMER_ID' },
];
// GR_1022[GR1022_REALIZATION_LIST #FG_GR1022_REALIZATION_LIST ] |
export const RealizationList = [
    { headerName: 'negotiationID', field: 'NEGOTIATION_ID' },
    { headerName: 'lcNo', field: 'LC_NO' },
    { headerName: 'bankRefNo', field: 'BANK_REF_NO' },
    { headerName: 'negotiationNo', field: 'NEGOTIATION_NO' },
];

export const customerNameListColumnDefs = [
    { headerName: 'customerName', field: 'CUSTOMER_NAME' },
    { headerName: 'invoiceNo', field: 'INVOICE_NO' },
    { headerName: 'invoiceDate', field: 'INVOICE_DATE', cellRenderer: 'datePipeRenderer', cellEditor: 'dateCellEditor', },
    { headerName: 'salesType', field: 'SALES_TYPE' },
    { headerName: 'currency', field: 'CURRENCY' },
    { headerName: 'exchangeRate', field: 'EXCHANGE_RATE' },
    { headerName: 'invoiceValue', field: 'INVOICE_VALUE' },
    { headerName: 'invoiceValueBase', field: 'SALES_TOTAL_BASE' },
    { headerName: 'collAmount', field: 'COLL_AMOUNT' },
    { headerName: 'pendingValue', field: 'PENDING_VALUE' },

]

// SL_1015[FG_SL1015_PI_DISTRIBUTION#SL_1015_INVOICE_GRID_ID] |
export const invoiceDistributionColumnDefs = [
    { headerName: 'piNo', field: 'PI_ID' },
    { headerName: 'date', field: 'PI_DATE', cellRenderer: 'datePipeRenderer', cellEditor: 'dateCellEditor', },
    { headerName: 'piValue', field: 'PI_VALUE' },
];
// SL_1015[FG_SL1015_PI_DISTRIBUTION#SL_1015_INVOICE_GRID_ID] |
export const invoiceDistribution2ColumnDefs = [
    { headerName: 'invoiceNo', field: 'SI_ID' },
    { headerName: 'date', field: 'INVOICE_DATE', cellRenderer: 'datePipeRenderer', cellEditor: 'dateCellEditor', },
    { headerName: 'invoiceValue', field: 'INVOICE_VALUE' },
];



/*====================############=======================
            #region  GR Module Column Def
=====================#############=======================*/

// GR_1030[listOfSalesContractsGridID#FG_GR_COMM_SALESCONTRACT_LIST] |
export const listOfSalesContractsColumnDefs = [
    { headerName: 'lcNo', field: 'LC_NO' },
    { headerName: 'lcDate', field: 'LC_DATE', cellRenderer: 'datePipeRenderer' }
]


// GR_1022[listOfSalesContractsGridID#FG_GR_COMM_SALESCONTRACT_LIST] |
export const listOfSalesContractsColumnDefsGR_1022 = [
    { headerName: 'lcNo', field: 'LC_NO' },
    { headerName: 'lcDate', field: 'LC_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'salesContractNo', field: 'SALESCONTRACT_NO' },
]
// GR_1834[BBLCListGridID#FG_GR1834_BBLC_LIST] |
export const bblcListColumnDefs = [
    { headerName: 'bblcNo', field: 'BBLC_NO' },
    { headerName: 'bblcDt', field: 'BBLC_DT', cellRenderer: 'datePipeRenderer' },
    { headerName: 'bblcVal', field: 'BBLC_VAL' },
    { headerName: 'bblcId', field: 'BBLC_ID' }
]
// GR_1834[BBLCInptListGridID#FG_GR1834_BBLC] |
export const bblcInptListColumnDefs = [
    { headerName: 'bblcId', field: 'BBLC_ID' },
    { headerName: 'bblcDt', field: 'BBLC_DT', cellRenderer: 'datePipeRenderer' },
    { headerName: 'bblcVal', field: 'BBLC_VAL' },
    { headerName: 'supplierName', field: 'SUPPLIER_NAME' },
    { headerName: 'tolerancePct', field: 'TOLERANCE_PCT' },
    { headerName: 'tenor', field: 'TENOR' },

]

// GR_1834[AccountListGridID#FG_SL1076_ACCOUNT_LIST] |
export const listOfAccountColumnDefs = [
    { headerName: 'accName', field: 'ACC_NAME' },
    { headerName: 'accPath', field: 'ACC_PATH' }
]
// GR_1834[PiListGridID#FG_SL1076_ACCOUNT_LIST] |
export const piListColumnDefs = [
    { headerName: 'piNo', field: 'PI_NO' },
    { headerName: 'piDate', field: 'PI_DATE', cellRenderer: 'datePipeRenderer' },
    { headerName: 'piValue', field: 'PI_VALUE' },
    { headerName: 'piShipedValue', field: 'PI_SHIPED_VALUE' },
    { headerName: 'balance', field: 'BALANCE' },
    { headerName: 'buyer', field: 'BUYER' },
    { headerName: 'id', field: 'ID' }
]
// GR_1834[PiListGridID#FG_SL1076_ACCOUNT_LIST] |
export const selectdBBLCColumnDefs = [
    { headerName: 'suppdocID', field: 'SUPPDOC_ID' },
    { headerName: 'supplierName', field: 'SUPPLIER_NAME' },
    { headerName: 'bblcId', field: 'BBLC_ID' },
    { headerName: 'bblcDate', field: 'BBLC_DT', cellRenderer: 'datePipeRenderer' },
    { headerName: 'bblcValue', field: 'BBLC_VAL' },
    { headerName: 'creator', field: 'CREATOR' },
]
// GR_1834[OurRefListGridID#FG_GR1834_OUR_REF_LIST] |
export const ourRefListColumnDefs = [
    { headerName: 'ourRef', field: 'OUR_REF' },
    { headerName: 'buyer', field: 'BUYER_NAME' },
    { headerName: 'seasion', field: 'SEASON_DETAIL' },
    { headerName: 'style', field: 'STYLE' },
    { headerName: 'gmtItem', field: 'GMT_ITEM_NAME' },
]
// GR_1834[itemListGridID#FG_GR1834_ITEM_LIST] |
export const gr1834ItemListColumnDefs = [
    { headerName: 'itemName', field: 'ITEM_NAME' },
    { headerName: 'itemType', field: 'ITEM_TYPE' },
]
// GR_1824[PreparaedByColumnDefs#FG_GR1824_PO_LIST] |
export const pendingOrderColumnDefs = [
    { headerName: 'commonPoId', field: 'COMM_PO_ID' },
    { headerName: 'poQty', field: 'PO_QTY' },
    { headerName: 'rate', field: 'RATE' },
    { headerName: 'merchanPoNo', field: 'MERCHAN_PO_NO' },
    { headerName: 'lot', field: 'LOT' },
]
// GR_1824[OurRefListColumnDefs2Grid#FG_GR1824_OUR_REF] |
export const ourRefListColumnDefs2 = [
    { headerName: 'ourRef', field: 'OUR_REF' },
    { headerName: 'style', field: 'STYLE' },
]
// GR_1824[payListGrid#FG_GR1824_PAY_MODE_LIST] |
export const payModeColumnDefs = [
    { headerName: 'Pay Mode Name', field: 'PAY_MODE_NAME' },
    { headerName: 'Pay Mode id', field: 'PAYMODE_NO' },
]
// GR_1824[portListGrid#FG_GR_COMM_PORT_LIST] |
export const portColumnDefs = [
    { headerName: 'Pay Mode Name', field: 'PAY_MODE_NAME' },
    { headerName: 'Pay Mode id', field: 'PAYMODE_NO' },
]
// GR_1022[portListGrid#FG_GR1022_BANK_REF_LIST ] |
export const bankRefListColumnDefsGR_1022 = [
    { headerName: 'Ctr_Bank_Ref_No', field: 'BANK_REF_NO' },
    { headerName: 'Advice Id', field: 'ADVICE_ID' },
    { headerName: 'Relized Date', field: 'REALIZED_DATE' },
]
// GR_1022[portListGrid#FG_GR1022_REALIZED_DIS_HEAD ] |
export const realizedDiscountListColumnDefs = [
    { headerName: 'Discount_Nmae', field: 'DISCOUNT_NAME' },
]


/*====================############=======================
            #region User-Role Column Def
=====================#############=======================*/
export const totalInheritorLovColumnDef = [
    { headerName: 'Employee', field: 'EMP_NAME_ID' },
    { headerName: 'Business Unit', field: 'BU_NAME' },
    { headerName: 'Job Title', field: 'JOBTITLE' },
    { headerName: 'Total Role', field: 'ROLE_COUNT' },
]

export const subMenuListColumnDef = [
    { headerName: 'SubMenu Name', field: 'SUBMENU_NAME_USER' },
    { headerName: 'Description', field: 'DESCR' },
    { headerName: 'Sub-Menu ID', field: 'SUBMENU_ID' },
    { headerName: 'Sub-Menu NO', field: 'SUBMENU_NO' },
]