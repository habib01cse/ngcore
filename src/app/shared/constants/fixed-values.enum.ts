let  sqlState = {
  sqlInsert: 1,
  sqlUpdate: 2,
  sqlDelete: 3,
  sqlUnchange: 0,
};

let queryOptions = {
  PaidTo: 1,
  ReceiveFrom: 2,
  CostName: 3,
  CostCenterDtl: 4,
  BusinessAreaForGL: 5,
  CoaForGL: 6,
  CostCenterForGL: 7,
  RefCenterForGL: 8,
  CoaForAV: 9,
  CoaForConfig: 10,
  CoaForConfig1: 11,
  BusinessAreaForAV: 12,
  VoucherTypeForTC: 13,
  CostCenterForTC: 14,
  BusinessAreaForTC: 15,
  CoaForTC: 16,
  VoucherForTC: 17,
  VoucherForUT: 18,
  CostCenterForALL: 20,
  VoucherForPV: 19,
  CostCenterForCT: 21,
  DB: 22,
  CostCenterForTB: 23,
  DBAC: 24,
  CoaForCS: 25,
  BusinessAreaForCT: 26,
  CoaForCT: 27,
  DBACTS: 28,
  VoucherTypeForTDB: 29,
  CoaForTS: 30,
  CoaForCSOB: 31,
  CoaForTree: 32,
  CoaForParent: 33,
  BusinessAreaForTSB: 34,
  BusinessAreaTSB: 42,
  BusinessAreaGL: 35,
  CoaTSB: 37,
  DBAcc: 38,
  CoaTSBA: 54,
  CoaCB: 48,
  CoaCT: 55,
  CostCenterForCS: 39,
  CoaForCB: 47,
  CoaForCFS: 40,
  CoaForTSBR: 41,
  CoaForTSB: 43,
  CoaForSB: 44,
  CostCenterForTSB: 45,
  CostCenterForTSC: 46,
  BusinessAreaCB: 49,
  BusinessAreaForRP: 50,
  BusinessAreaRP: 51,
  CoaRP: 52,
  CoaAVD: 53,
  CoaForBudget: 56,
  CostCenterForCR: 57,
  CoaForBd: 58,
  CoaForBV: 59,
  CoaForBDA: 63,
  PRIV_NO: 50148,
  CoaForQJ: 60,
  CostCenterForQJ: 61,
  B_A_QJ: 62,
  CoaForDSR: 67,
  CoaForBFE: 68,
  CostCenterForBFE: 69,
  BusinessAreaBEF: 70,
  VoucherForBFE: 71,
  VoucherByVNO: 72,
  CostCenterNO: 73,
  GroupCostCenter: 74,
  LookupNo: 1026,
};

let voucherType = {
  DebitVoucher: 1,
  CreditVoucher: 2,
  PurchaseVoucher: 19,
};

let conditionStatus = [
  { TEXT: "All", VALUE: "A" },
  { TEXT: "Employee", VALUE: "E" },
  { TEXT: "Designation", VALUE: "J" },
  { TEXT: "Business Unit", VALUE: "B" },
  { TEXT: "Line Name", VALUE: "L" },
];
let conditionRosterStatus = [
  { TEXT: "All", VALUE: "A" },
  { TEXT: "Employee", VALUE: "E" },
  { TEXT: "Designation", VALUE: "J" },
  { TEXT: "Business Unit", VALUE: "B" },
];
let tranDate = [{ TEXT: "Tran Date", VALUE: "T" }];

let transactionType = {
  Dr: "Dr",
  Cr: "Cr",
};

let transactionTypeUpperCase = {
  Dr: "DR",
  Cr: "CR",
};
let carbonList = [
  { TEXT: "YES", VALUE: 0 },
  { TEXT: "NO", VALUE: 1 },
];
let shiftWiseList = [
  { TEXT: "YES", VALUE: "1" },
  { TEXT: "NO", VALUE: "0" },
];
let imageShowList = [
  { TEXT: "YES", VALUE: "Y" },
  { TEXT: "NO", VALUE: "N" },
];
let imageHolderList = [
  { TEXT: "ALL", VALUE: null },
  { TEXT: "YES", VALUE: "1" },
  { TEXT: "NO", VALUE: "0" },
];
let previewDataForList = [
  { VALUE: "O", TEXT: "Overtime Process" },
  { VALUE: "S", TEXT: "Salary Process" },
];
let compateWithList = [
  { VALUE: "G", TEXT: "Salary Gross" },
  { VALUE: "P", TEXT: "Payble Gross" },
];

let reportTypeApplicant = [
  { TEXT: "Summary", VALUE: 1 },
  { TEXT: "Detail", VALUE: 0 },
];

let otStatus = [{ VALUE: 1, TEXT: "A" }];

let statisticsType = [
  { TEXT: "Date wise Attendance Statistics", VALUE: "0" },
  { TEXT: "Employee wise Attendance Statistics", VALUE: "1" },
  { TEXT: "BU wise Attendance Statistics", VALUE: "2" },
  { TEXT: "Line wise Attendance Statistics", VALUE: "16" },
  { TEXT: "Jobtitle Wise Daily Manpower", VALUE: "10" },
  { TEXT: "Daily Manpower Detail", VALUE: "3" },
  { TEXT: "Daily Manpower Summary", VALUE: "4" },
  { TEXT: "Daily BU wise OT Summary", VALUE: "13" },
  { TEXT: "BU wise Attendance summary", VALUE: "11" },
  { TEXT: "Monthly Attendance Statistic", VALUE: "5" },
  { TEXT: "Monthly Attendance Statistic(Def.)", VALUE: "6" },
  { TEXT: "Overtime Statistics", VALUE: "7" },
  { TEXT: "Overtime Statistics (Default)", VALUE: "8" },
];

let accountType = {
  Assets: "A",
  Expenses: "E",
  Liabilities: "L",
  Income: "I",
};

let preferred = {
  Mobile: "M",
  Office: "O",
  Home: "H",
};



let billStatus = {
  InvoiceDate: "B",
  RcvDate: "R",
  LcDate: "W",
};

let genderStatus = {
  Male: "M",
  Female: "F",
};
let maturityType = {
  Acceptance: "A",
  Delivery: "D",
  BL: "B",
  Negotiation: "N",
  Advance: "D",
} 
let genderStatus2 = [
  { TEXT: "Others", VALUE: null },
  { TEXT: "Male", VALUE: "M" },
  { TEXT: "Female", VALUE: "F" },
];
let POStatus = [
  { TEXT: "With PO", VALUE: 1 },
  { TEXT: "Without PO", VALUE: 2 },
];
let lcStatus = [
  { TEXT: "Without LC", VALUE: 2 },
  { TEXT: "With LC", VALUE: 1},
];

let reportTitleForSalaryStatement = [
  { TEXT: "Head Office", VALUE: "Head Office" },

];

let filterOptionType = {
  AllChequeId: "A",
  VoidChequeId: "V",
  PostingChequeIdOnly: "PO",
  UnpostedChequeId: "UP",
  AllButVoid: "AV",
};

let coaIndentificationType = {};

let coaDisplayType = {};

let postingStatus = {
  PostedOnly: "AC_LEDGER_V",
  // all :'AC_UPLEDGER_V'
};

let postStatusType = {
  Posted: "PO",
  Unposted: "UPO",
  All: "A",
};

let postStatusTypeNumber = {
  Posted: 1,
  Unposted: 0,
};

let checkFlag = {
  Checked: 1,
  Unchecked: 0,
  All: null,
};

let postStatusType1 = {
  Posted: 1,
  Unposted: 0,
};
let postedStatus = [
  { VALUE: 1, TEXT: "Posted" },
  { VALUE: 0, TEXT: "Unposted" },
];

let postingStatusType = {
  PostedOnly: 1,
};
let status = {
  Approved: 1,
  Waiting: 0,
};

let moneyReqStatus01 = {

  Waiting: "W",
  Approved: "A",
  Denied: "H",
};

let voucherModeType = {
  CashInflow: "CI",
  CashOutflow: "CO",
  Adjustments: "AD",
  Contra: "CT",
  Journal: "JL",
  Others: "OT",
};

let budgetModeType = {
  Budget: "B",
  HeadWiseSummary: "H",
  SummaryDetails: "D",
  BudgetAllocationReport: "BA",
  BudgetDetailsReport: "DA",
  BudgetVarianceReport: "BV",
};

let generationType = {
  Monthly: "M",
  FYYearly: "Y",
  Daily: "D",
};

let duration = {
  Day: "D",
  Month: "M",
  Year: "Y",
};

let indentificationAccountType = [
  { TEXT: "Cash", VALUE: "CS" },
  { TEXT: "Bank", VALUE: "B" },
  { TEXT: "Profit/Loss", VALUE: "PL" },
  { TEXT: "Account Receivable", VALUE: "AR" },
  { TEXT: "Account Payable", VALUE: "AP" },
  { TEXT: "Fixed Asset", VALUE: "FA" },
  { TEXT: "Tax", VALUE: "TX" },
  { TEXT: "VAT", VALUE: "VT" },
  { TEXT: "Discount Receive", VALUE: "DR" },
  { TEXT: "Discount Paid", VALUE: "DP" },
  { TEXT: "Cash & Bank", VALUE: "CB" },
  { TEXT: "Rounding Deference", VALUE: "RD" },
  { TEXT: "Inventory", VALUE: "IN" },
];

let integratedModuleType = {
  Accounts: "AC",
  Purchase: "PR",
  Sales: "SL",
  Inventory: "IN",
  OfficeOrg: "OO",
  HRM: "HR",
  CashManagement: "CM",
};
let stockCategory = [
  { VALUE: "1", TEXT: "Matrix" },
  { VALUE: "2", TEXT: "Item (Only with stock)" },
  { VALUE: "3", TEXT: "Bu wise Item Stock" },
  { VALUE: "4", TEXT: "Bu Wise Item Stock(BL)" },
];

let confirmedType = {
  None: 2,
  Yes: 1,
  No: 0,
};

let nameCodeStyleType = {
  NameCode: "NC",
  CodeName: "CN",
  Name: "N",
  Code: "C",
};

let balanceType = {
  Positive: "P",
  Negative: "N",
};

let settlementType = {
  Cash: "C",
  Void: "V",
  Waiting: "W",
};

let dateType = {
  ChequeDate: "C",
  PrepareDate: "P",
};

let ccBaType = {
  Fixed: "F",
  List: "L",
  Optional: "O",
  Select: "S",
};

let dayBookreportTypeList = {
  Default: "D",
  WithoutCostCenter: "C",
  VoucherList: "V",
  WithCashBank: "S",
};

let maritialStatus = {
  Single: "S",
  Married: "M",
  NotAssained: "O",
};

let rcvStatus = {
  General: "G",
  Warrenty: "W",
  All: null,
};

let transferTypeStatus = {
  Transfer: "Transfer",
  Promotion: "Promotion",
  Adjustment: "Adjustment",
};

let transferTypeStatus01 = {
  Transfer: "Transfer", 
  Adjustment: "Adjustment",
};

let maintainceType = {
  RegularMaintenance: "R",
  IrregularMaintenance: "I",
  YearlyMaintenance: "Y",
  Decoration: "D",
  Accident: "A",
  Fuel: "F",
};
let promotionTypeStatus = {
  Increment: "Increment",
  Promotion: "Promotion",
  Adjustment: "Adjustment",
};
let discountType = {
  Regular: "R",
  Panalty: "P",
};

let overTimeReqStatusList = {
  Waiting: "W",
  Approved: "A",
  Denied: "D",
};

let status1 = {
  All: "",
  Unrealized: "Unrealized",
  Negotiated: "Negotiated",
  BankAccepted: "Bank Accepted",
  BankSubmitted: "Bank Submitted",
  PartyAccepted: "Party Accepted",
  PartySubmitted: "Party Submitted",
  Initialized: "Initialized",
  Realized: "Realized",
  Paymentreceived: "Payment received",
};

let allocateCostCenters = {
  ActiveCostcenterAllocation: 1,
  ActiveBusinessAreaAllocation: 2,
  None: null,
};
let invoiceCategory = [
  { VALUE: "I", TEXT: "Purchase" },
  { VALUE: "L", TEXT: "Loan" },
];

let promotionTypeStatusSingle = [{ VALUE: "Promotion", TEXT: "Promotion" }];

let reportFormat = [
  { VALUE: 1, TEXT: "T-Format 1" },
  { VALUE: 2, TEXT: "T-Format 2" },
  { VALUE: 3, TEXT: "T-Format 3" },
];

let inReportFormat = [
  { VALUE: 1, TEXT: "Format-1" },
  { VALUE: 2, TEXT: "Format-2" },
  { VALUE: 3, TEXT: "Format-3" },
];

let recieveStatusLoan = [
  { VALUE: null, TEXT: "All" },
  { VALUE: 1, TEXT: "Paid" },
  { VALUE: 0, TEXT: "Unpaid" },
];
let reportFormatList = [
  { VALUE: "HR_2086", TEXT: "Format 1(Default)" },
  { VALUE: "HR_2081", TEXT: "Format 2(Dynamic)" },
  { VALUE: "HR_2087", TEXT: "Format 3" },
  { VALUE: "HR_2088", TEXT: "Format 4 (English)" },
  { VALUE: "HR_2089", TEXT: "Format 5" },
  { VALUE: "HR_20810", TEXT: "Format 1( 4 Hour )" },
  { VALUE: "HR_20811", TEXT: "Format 5(Bangla-A)" },
  { VALUE: "HR_20812", TEXT: "Format 5(Bangla-C)" },
  { VALUE: "HR_20813", TEXT: "Format 6(Bangla-A)" },
];

let reportTypeListOne = [
  { VALUE: "1", TEXT: "Report 1" },
  { VALUE: "0", TEXT: "Format 2" },
  { VALUE: "3", TEXT: "Format 3 (Default)" },
  { VALUE: "4", TEXT: "Format 4 (Default)" },
  { VALUE: "5", TEXT: "Format 5 (Default)" },
  { VALUE: "6", TEXT: "Detail Report 6" },
  { VALUE: "7", TEXT: "Detail Report 7 ( On Salary Process)" },
  { VALUE: "8", TEXT: "Detail Report 8 ( On Salary Process 2 Hr.)" },
  { VALUE: "9", TEXT: "Detail Report 9 ( With IN/OUT)" },
  { VALUE: "10", TEXT: "Detail Report 10 (With Holiday/Weekend Present)" },
  { VALUE: "11", TEXT: "Report 11 (Default)" },
  { VALUE: "12", TEXT: "Report 12" },
  { VALUE: "13", TEXT: "Report 11 (Hourly)" },
];

let SummeryReportTypeList = [
  { VALUE: "1", TEXT: "Report 1" },
  { VALUE: "2", TEXT: "Report 2" },
  { VALUE: "3", TEXT: "Pay Order Report" },
  
];

let rbType = [
  { VALUE: "W", TEXT: "WO" },
  { VALUE: "B", TEXT: "Both" },
  { VALUE: "L", TEXT: "L/C" },
];
let reportFormatFourStyle = [
  { VALUE: 1, TEXT: "Format 1" },
  { VALUE: 2, TEXT: "Format 2" },
  { VALUE: 3, TEXT: "Format 3" },
  { VALUE: 4, TEXT: "Format 4" },
];
let reportFormatFourStyleOne = [
  { VALUE: 1, TEXT: "Format One" },
  { VALUE: 2, TEXT: "Format Two" },
  { VALUE: 3, TEXT: "Format Three" },
  { VALUE: 4, TEXT: "Format Four" },
];

let reportFormatFourStyleOne1 = [
  { VALUE: "1", TEXT: "Format One" },
  { VALUE: "2", TEXT: "Format Two" },
  { VALUE: "3", TEXT: "Format Three" },
  { VALUE: "4", TEXT: "Format Four" },
];

let dobProvedBy = [
  { VALUE: "National ID", TEXT: "National ID" },
  { VALUE: "Birth Certificate", TEXT: "Birth Certificate" },
  { VALUE: "Educational Certificate", TEXT: "Educational Certificate" },
  { VALUE: "Doctors Prescription", TEXT: "Doctors Prescription" },
];

let reportOptionList = [
  { VALUE: 0, TEXT: "In Active" },
  { VALUE: 1, TEXT: "Active" },
  { VALUE: null, TEXT: "All" },
  { VALUE: 3, TEXT: "Report XLS" },
];
let activeStatusList = [
  { VALUE: 1, TEXT: "Active" },
  { VALUE: 2, TEXT: "Inactive" },
];

let activeStatusListHr1016 = [
  { VALUE: 1, TEXT: "Active" },
  { VALUE: 0, TEXT: "Inactive" },
];

let missingStatusList = [
  { VALUE: 1, TEXT: "In Time" },
  { VALUE: 2, TEXT: "Out Time" },
];

let adjustWithList = [
  { VALUE: "I", TEXT: "In Time" },
  { VALUE: "O", TEXT: "Out Time" },
  { VALUE: "OS", TEXT: "Out time based on shift time" },
  { VALUE: "IS", TEXT: "In time based on shift time" },
];

let adjustTypeList = [
  { VALUE: "I", TEXT: "Increase" },
  { VALUE: "D", TEXT: "Decrease" },
];

let ActualIncrNoList = [
  { VALUE: "G", TEXT: "Gross" },
  { VALUE: "B", TEXT: "Basic" },
];
let printTypeList = [
  { VALUE: 1, TEXT: "Single (A4)" },
  { VALUE: 2, TEXT: "Twice per page" },
  { VALUE: 3, TEXT: "Single (Half Page)" },
];
let reportSizeList = [
  { VALUE: "11.69x8.27", TEXT: "A4" },
  { VALUE: "14x8.5", TEXT: "Legal" },
  { VALUE: "11x8.5", TEXT: "Letter" },
  { VALUE: "14x11", TEXT: "Fanfold(14x11)" },
  { VALUE: "15x8.5", TEXT: "Width '15' x Height '8.5'" },
  { VALUE: "16x8.5", TEXT: "Width '16' x Height '8.5'" },
  { VALUE: "17x8.5", TEXT: "Width '17' x Height '8.5'" },
  { VALUE: "10.5x8.27", TEXT: "10.5x8.27" },
];
let reportFormatListOne = [
  { VALUE: "1", TEXT: "Format One" },
  { VALUE: "2", TEXT: "Format Two" },
  { VALUE: "3", TEXT: "Format Three" },
  { VALUE: "4", TEXT: "Format Four" },
  { VALUE: "5", TEXT: "Format Five" },
  { VALUE: "6", TEXT: "Format Six" },
  { VALUE: "7", TEXT: "Format Seven" },
  { VALUE: "8", TEXT: "Format Eight" },
  { VALUE: "9", TEXT: "Format Nine" },
  { VALUE: "10", TEXT: "Format Ten" },
  { VALUE: "11", TEXT: "New Emp" },
  { VALUE: "12", TEXT: "Lefty Emp" },
  { VALUE: "13", TEXT: "Format Eleven(New)" },
  { VALUE: "14", TEXT: "Format Eleven(Lefty)" },
  { VALUE: "15", TEXT: "Format Twelve" },
  { VALUE: "16", TEXT: "Format Thirteen (R)" },
  { VALUE: "17", TEXT: "Format Thirteen (L)" },
  { VALUE: "18", TEXT: "UTL Salary Sheet" },
  { VALUE: "19", TEXT: "Bangla Format" },
];
let reportFormatListForAllowance = [
  { VALUE: "1", TEXT: "Format 1" },
  { VALUE: "2", TEXT: "Format 2" },
  { VALUE: "3", TEXT: "Format 3" },
  { VALUE: "4", TEXT: "Format 4" },
  { VALUE: "5", TEXT: "Format 5 (Default)" },
  { VALUE: "6", TEXT: "Format 6 (Default)" },
  { VALUE: "7", TEXT: "Format 7 (Default)" },
  { VALUE: "8", TEXT: "Format 8 (Dynamic)" },
  { VALUE: "9", TEXT: "Format 9 (Eid Bonus)" },
  { VALUE: "10", TEXT: "Format 10(Partial Salary)" },
  { VALUE: "11", TEXT: "Format 11(Non Prod)" },
  { VALUE: "12", TEXT: "Format 12(Hourly)" },
  { VALUE: "13", TEXT: "Format 13(Summary Hourly)" },
  { VALUE: "14", TEXT: "Format-14" },
];


let reportFormatListTwo = [
  { VALUE: "10", TEXT: "Tick Sheet" },
  { VALUE: "11", TEXT: "Tick Sheet(New)" },
  { VALUE: "12", TEXT: "Tick Sheet(Lefty)" },
  { VALUE: "13", TEXT: "Sign Sheet" },
  { VALUE: "16", TEXT: "Sign Sheet(Lefty)" },
  { VALUE: "14", TEXT: "Bank Sheet" },
  { VALUE: "15", TEXT: "Denomination(Company Wise)" },
  { VALUE: "17", TEXT: "Denomination(BU Wise)" },
  { VALUE: "18", TEXT: "Lefty Without Pay" },
  { VALUE: "19", TEXT: "Payment Sheet (Format Twelve)" },
  { VALUE: "20", TEXT: "Bank Sheet (Format Nine)" },
  { VALUE: "21", TEXT: "Token Slip (Sign Sheet)" },
  { VALUE: "22", TEXT: "Extra OT Payment Sheet ( F-13)" },
  { VALUE: "23", TEXT: "Extra OP Payment Sheet(Lefty)" },
  { VALUE: "24", TEXT: "Extra OP Payment Sheet" },
];

let reportFormatListThree = [
  { VALUE: "1", TEXT: "Salary Sheet 4 Hr." },
  { VALUE: "2", TEXT: "Sign Sheet 2 Hr." },
  { VALUE: "3", TEXT: "Sign Sheet 1 Hr." },
  { VALUE: "4", TEXT: "Sign Sheet 4 Hr." },
  { VALUE: "5", TEXT: "Balance OT" },
  { VALUE: "6", TEXT: "Sign Sheet 2 Hr. (Lefty)" },
  { VALUE: "7", TEXT: "Balance OT (Lefty)" },
  { VALUE: "8", TEXT: "Sign Sheet 1 Hr. (Lefty)" },
 
];

let perChantageList = [
  { TEXT: "With Percentage", VALUE: 0 },
  { TEXT: "Without Percentage", VALUE: 1 },
];

let dicsType = [
  { TEXT: "Percentage", VALUE: 'P' },
  { TEXT: "Amount", VALUE: 'A' },
];
let dicsOn = [
  { TEXT: "Item Price", VALUE: 'P' },
  { TEXT: "Item Sales Price", VALUE: 'S' },
];
let reportCategoryTypeList = [
  { VALUE: 1, TEXT: "Opening - Transaction Detail - Closing Detail" },
  { VALUE: 2, TEXT: "Opening Detail" },
  { VALUE: 3, TEXT: "Opening Transaction Details" },
  { VALUE: 4, TEXT: "Transaction Details" },
];

let reportOptionTypeList = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: 1, TEXT: "Active" },
  { VALUE: 0, TEXT: "Inactive" },
  { VALUE: 3, TEXT: "Report XLS" },
];
let salaryOperator = [
  { VALUE: "%3E=", TEXT: ">=" },
  { VALUE: "%3E", TEXT: ">" },
  { VALUE: "%3C=", TEXT: "<=" },
  { VALUE: "%3C", TEXT: "<" },
  { VALUE: "=", TEXT: "=" },
];

let transferTypeStatus1 = [
  { VALUE: "Transfer", TEXT: "Transfer" },
  { VALUE: "Promotion", TEXT: "Promotion" },
  { VALUE: "Adjustment", TEXT: "Adjustment" },
];

let reportTypeList = [
  { VALUE: 1, TEXT: "Landscape?" },
  { VALUE: 2, TEXT: "With Description?" },
  { VALUE: 3, TEXT: "Show Running Balance?" },
  { VALUE: 4, TEXT: "Group Ledger Report?" },
  { VALUE: 5, TEXT: "Monthly Ledger Report?" },
  { VALUE: 6, TEXT: "Monthly Statement?" },
  { VALUE: 7, TEXT: "Monthly Statement (Group)?" },
  
];
let reportTypeListTwo = [
  { VALUE: 1, TEXT: "Grade List" },
  { VALUE: 2, TEXT: "Employee's with basic" },
  { VALUE: 3, TEXT: "Employee's Payroll" },
];

let reportTypeListThree = [
  { VALUE: 1, TEXT: "Default" },
  { VALUE: 2, TEXT: "H&M INVOICE" },
  { VALUE: 3, TEXT: "H&M COF Format-1" },
  { VALUE: 4, TEXT: "H&M COF Format-2" },
  { VALUE: 5, TEXT: "GAP INVOICE" },
  { VALUE: 6, TEXT: "GAP COF" },
  { VALUE: 7, TEXT: "Invoice IN Excel" },
  { VALUE: 8, TEXT: "BENEFICIARY CERTIFICATE" },
];

let reportCategory = [
  { VALUE: 1, TEXT: "H&M" },
  { VALUE: 2, TEXT: "GAP" },
];

let reportEarnLeavePayment = [
  { VALUE: "S", TEXT: "Salary Sheet" },
  { VALUE: "P", TEXT: "Payment Sheet" },
  { VALUE: "C", TEXT: "Compliance" },
];



let valueTipe = [
  { VALUE: "Y", TEXT: "With Value" },
  { VALUE: "N", TEXT: "Without Value" },
];

let inventoryTypes = {
  OpeningStock: "OS",
  ClosingStock: "CS",
};
let inventoryType = [
  { VALUE: null, TEXT: "All" },
  { VALUE: "F", TEXT: "FIFO" },
  { VALUE: "L", TEXT: "LIFO" },
  { VALUE: "E", TEXT: "FEFO" },
  { VALUE: "W", TEXT: "Weighted Avg" },
  { VALUE: "B", TEXT: "Batch" },
];
let inventoryMethos = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "F", TEXT: "FIFO" },
  { VALUE: "L", TEXT: "LIFO" },
  { VALUE: "W", TEXT: "WA" },
  { VALUE: "B", TEXT: "BATCH" },
  { VALUE: "D", TEXT: "@ O Rate" },
];

let activeType = {
  All: null,
  Yes: 1,
  No: 0,
};

let session = {
  FireUrgent: 1,
  Urgent: 2,
  Normal: 3,
};

let activeType1 = {
  Yes: 1,
  No: 0,
};

let activeStatus = {
  Active: 1,
  Inactive: 0,
  // All: null
};
let activeStatusTwo = [
  { VALUE: "1", TEXT: "Active" },
  { VALUE: "0", TEXT: "Inactive" },
];
let salesInvoiceDateType = [
  { VALUE: "I", TEXT: "Invoice" },
  { VALUE: "DO", TEXT: "DO Date" },
  { VALUE: "DC", TEXT: "DC Date" },
];
let fromOrderInvoice = [
  { VALUE: "PI", TEXT: "Proforma Invoice" },
  { VALUE: "SI", TEXT: "Sales Invoice" },
  
];


let requisitionStatus = [
  { VALUE: "W", TEXT: "Waiting" },
  { VALUE: "A", TEXT: "Approved" },
  { VALUE: "C", TEXT: "Cancelled" },
  { VALUE: null, TEXT: "All" },
];
let billReport = [
  { VALUE: "PB", TEXT: "Purchase Bill" },
  { VALUE: "SB", TEXT: "Service Bill" },
  { VALUE: "SC", TEXT: "Sub Contract" },
  { VALUE: "L", TEXT: "Loan" },
  { VALUE: "PA", TEXT: "Purchase Bill(Additional Charge)" },
  { VALUE: "SA", TEXT: " Service Bill (Additional Charge))" },
];

let billStatus1 = [
  { VALUE: "C", TEXT: "Clearence" },
  { VALUE: "A", TEXT: "Acceptance" },
  { VALUE: "L", TEXT: "LC Date" },
  { VALUE: "B", TEXT: "Bill Date" },
];

let requisitionHistoryStatus = [
  { VALUE: "W", TEXT: "Unapproved" },
  { VALUE: "A", TEXT: "Approved" },
  { VALUE: "D", TEXT: "Denied" },

];

let salesNegotiationType = [
  { VALUE: "N", TEXT: "Negotiation" },
  { VALUE: "L", TEXT: "LC Date" },
  { VALUE: "D", TEXT: "Doc Date" },
];
let salesRealizationType = [
  { VALUE: "R", TEXT: "Realization" },
  { VALUE: "N", TEXT: "Negotiation" },
  { VALUE: "L", TEXT: "LC Date" },
  { VALUE: "D", TEXT: "Doc Date" },
];
let serviceType = [
  { VALUE: "W", TEXT: "Warrenty" },
  { VALUE: "G", TEXT: "General" },
];

let billRegisterType = [
  { VALUE: "B", TEXT: "Bill Date" },
  { VALUE: "R", TEXT: "Rcv Date" },
  { VALUE: "W", TEXT: "Wo Date" },
];

let saleReturnType = [
  { VALUE: "DC", TEXT: "Return Date" },
  { VALUE: "DO", TEXT: "DO Date" },
];

let issueReportType = [
  { VALUE: "S", TEXT: "Summary" },
  { VALUE: "D", TEXT: "Details" },
];

let dcdoDate = [
  { VALUE: "DC", TEXT: "DC Date" },
  { VALUE: "DO", TEXT: "DO Date" },
];
let percentOn = [
  { VALUE: "", TEXT: "Select" },
  { VALUE: "B", TEXT: "Basic" },
  { VALUE: "G", TEXT: "Gross" },
  { VALUE: "DG", TEXT: "Daily Gross" }  
];
let lcType = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "L", TEXT: "Local(LC)" },
  { VALUE: "F", TEXT: "Foregin(LC)" },
  { VALUE: "E", TEXT: "EPZ" },
];
let lcType2 = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "LLC", TEXT: "Local(LC)" },
  { VALUE: "FLC", TEXT: "Foregin(LC)" },
  { VALUE: "TT", TEXT: "TT" },
];

let acceptedType = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "AC", TEXT: "Accepted" },
  { VALUE: "NA", TEXT: "Not Accepted" },
];
let acceptType = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: 1, TEXT: "Accept" },
  { VALUE: 0, TEXT: "Unaccept" },
];
let itemMovementType = [
  { VALUE: "F", TEXT: "Fast Moving" },
  { VALUE: "S", TEXT: "Slow Moving" },
  { VALUE: "NS", TEXT: "Not Sale" },
];
let paymentFrequency = [
  { VALUE: "Y", TEXT: "Yearly" },
  { VALUE: "Q", TEXT: "Quarterly" },
  { VALUE: "M", TEXT: "Monthly" },
  { VALUE: "D", TEXT: "Day Basis" },
];

let paymentStatus = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "2", TEXT: "Paid" },
  { VALUE: "3", TEXT: "Pending" },
];
let shipmentEntryStatus = [
  { VALUE: 0, TEXT: "Pending" },
  { VALUE: 1, TEXT: "Clear" },
];

let shipmentEntryReportType = [
  { VALUE: 1, TEXT: "Shipments Bank Guarantee" },
  { VALUE: 2, TEXT: "Shipment Bank Forwarding" },
  { VALUE: 3, TEXT: "Document Acceptance Note" },
  { VALUE: 4, TEXT: "Shipment Endorsement Forwarding" },
];
let issueProcess = [
  { VALUE: 1, TEXT: "On Transaction" },
  { VALUE: 2, TEXT: "On Valuation" },
  { VALUE: 3, TEXT: "Inter Company Sales (On Valuation)" },
  { VALUE: 5, TEXT: "Inter Company Sales (On Policy)" },
  { VALUE: 4, TEXT: "Company Wise Sales Summary" },
  { VALUE: 6, TEXT: "Lot Wise Chemical Consumption" },
  { VALUE: 7, TEXT: "Loan Statement" },
];

let paymentMood = [
  { VALUE: "Cheque", TEXT: "Cheque" },
  { VALUE: "Cash", TEXT: "Cash" },
  { VALUE: "Cash-Cheque", TEXT: "Cash-Cheque" },
];

let salePaymentType  = [

  { VALUE: "CS", TEXT: "Cash" },
  { VALUE: "CQ", TEXT: "Cheque" },
  { VALUE: "PO", TEXT: "Pay Order" },
  { VALUE: "AD", TEXT: "Adjustment" },
  { VALUE: "DD", TEXT: "Demand Draft" },
  { VALUE: "CC", TEXT: "Credit Card" },
  { VALUE: "DS", TEXT: "Diposit Slip" },
]

let policyStatus = [
  { VALUE: 0, TEXT: "NO" },
  { VALUE: 1, TEXT: "Jobtitle Special Allow Ded" },
  { VALUE: 2, TEXT: " Bill Policy" },
  { VALUE: 3, TEXT: " Shift Allow " },
  { VALUE: 4, TEXT: "Payable Day" },

];
let policyStatus01 = [
  { VALUE: 0, TEXT: "NO" },
  { VALUE: 1, TEXT: "Jobtitle Special Allow Ded" },
  { VALUE: 2, TEXT: " Bill Policy" },
  { VALUE: 3, TEXT: " Shift Allow " },
  

];




let reqPaymentType = [

  { VALUE: "CS", TEXT: "Cash" },
  { VALUE: "CQ", TEXT: "Cheque" },


];
let paymentBy = [
  { VALUE: "0", TEXT: "Cheque" },
  { VALUE: "1", TEXT: "Cash" },
  { VALUE: "", TEXT: "Cash-Cheque" },
];
let paymentBy1 = [
  { VALUE: "0", TEXT: "Cheque" },
  { VALUE: "1", TEXT: "Cash" },
  { VALUE: "2", TEXT: "Cash-Cheque" },
];

let probisionData = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "1", TEXT: "Provision" },
  { VALUE: "0", TEXT: "Not Provision" },
];

let bblcDateType = [
  { VALUE: "I", TEXT: "Invoice" },
  { VALUE: "A", TEXT: "Acceptance" },
  { VALUE: "B", TEXT: "Bank Accept DT" },
  { VALUE: "M", TEXT: "Maturity DT" },
];
let auditStatus = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "1", TEXT: "Audited" },
  { VALUE: "0", TEXT: "Unaudited" },
];
let acceptanceType = [
  { VALUE: "Regular", TEXT: "Regular" },
  { VALUE: "Advence", TEXT: "Advence" },
];
let transferType = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "2", TEXT: "Waiting" },
  { VALUE: "1", TEXT: "Approve" },
  { VALUE: "0", TEXT: "Deny" },
];
let transferStatus = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "T", TEXT: "Transfered" },
  { VALUE: "NT", TEXT: "Not Transfered" },
];
let billTypeStatus = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "W", TEXT: "Waiting" },
  { VALUE: "A", TEXT: "Approved" },
  { VALUE: "D", TEXT: "Denied" },
];
let billType = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "S", TEXT: "Service" },
  { VALUE: "P", TEXT: "Purchase" },
  { VALUE: "L", TEXT: "Loan" },
];

let inBillTypes = [
  { VALUE: "S", TEXT: "Service" },
  { VALUE: "I", TEXT: "Purchase" },
  { VALUE: "L", TEXT: "Loan" },
  { VALUE: "T", TEXT: "Transport-Internal" },
  { VALUE: "SC", TEXT: "Sub Contract" },
  { VALUE: "BI", TEXT: "Insurance" },
  { VALUE: "CF", TEXT: "C&F" },
];

let purchaseBillTypes = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "S", TEXT: "Service" },
  { VALUE: "P", TEXT: "Purchase" },
  { VALUE: "L", TEXT: "Loan" },
  { VALUE: "TI", TEXT: "Transport-Internal" },
  { VALUE: "SC", TEXT: "Sub Contract" },
];

let purchaseBillTypes2 = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "S", TEXT: "Service" },
  { VALUE: "I", TEXT: "Purchase" },
];
let purchaseBillTypes1 = [
  { VALUE: "S", TEXT: "Service" },
  { VALUE: "P", TEXT: "Purchase" },
  { VALUE: "L", TEXT: "Loan" },
  { VALUE: "T", TEXT: "Transport-Internal" },
  { VALUE: "SC", TEXT: "Sub Contract" },
];
let purchaseBillType2 = [
  { VALUE: "S", TEXT: "Service" },
  { VALUE: "I", TEXT: "Purchase" },
  { VALUE: "L", TEXT: "Loan" },
  { VALUE: "T", TEXT: "Transport-Internal" },
  { VALUE: "SC", TEXT: "Sub Contract" },
];

let loanStatus = [
  { VALUE: "IP", TEXT: "Loan Issue Pending" },
  { VALUE: "RP", TEXT: "Loan Receive Pending" },
  { VALUE: "IR", TEXT: "Loan Return Rcv Pending" },
  { VALUE: "IR", TEXT: "Loan Receive Return Pending" },
  { VALUE: "RC", TEXT: "Loan Return & Collected" },
  { VALUE: "LR", TEXT: "Loan Returned" },
  { VALUE: "LC", TEXT: "Loan Collected" },
  { VALUE: "U", TEXT: "Undefined" },

];

let loanTransactionType = [
  { VALUE: "D", TEXT: "Loan Statement details" },
  { VALUE: "L", TEXT: "Loan Reconciliation Statement" },
];
let auditStatusBillPayment = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "A", TEXT: "Audited" },
  { VALUE: "NA", TEXT: "Unaudited" },
];
let recurring = [
  { VALUE: 1, TEXT: "Yes" },
  { VALUE: 0, TEXT: "No" },
  { VALUE: 2, TEXT: "Both" },
];
let attendanceBonusReportType = [
  { VALUE: "0", TEXT: "Details (Bu wise)" },
  { VALUE: "1", TEXT: "Summary" },
  { VALUE: "3", TEXT: "Details" },
  { VALUE: "2", TEXT: "Audit" },
];
let postStatus = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "1", TEXT: "Posting" },
  { VALUE: "0", TEXT: "Not Posting" },
];
let voucherType2 = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "U", TEXT: "Un-Reconciled" },
  { VALUE: "R", TEXT: "Reconciled" },
];
let invoiceType = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "SI", TEXT: "Sl (Local)" },
  { VALUE: "PI", TEXT: "PI (Export)" },
  { VALUE: "CI", TEXT: "CI (Export)" },
];
let invoiceType1 = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "SI", TEXT: "Sl (Local)" },
  { VALUE: "PI", TEXT: "PI (Export)" },
];

let deliveryType = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "DO", TEXT: "DO Wise Delivery" },
  { VALUE: "RP", TEXT: "Replacement Delivery" },

];

let deliveryTypeOne = [
  { VALUE: "DO", TEXT: "DO Wise Delivery" },
  { VALUE: "RP", TEXT: "Replacement Delivery" },
  { VALUE: "SR", TEXT: "Sales Return" },
];


let loanType = [
  { VALUE: "PC", TEXT: "Packing Credit (PC)" },
  { VALUE: "TL", TEXT: "Time Loan" },
];

let orderType = [
  { VALUE: 1, TEXT: "Regular" },
  { VALUE: 2, TEXT: "Commission" },
];
let orderType1 = [
  { VALUE: 'BULK', TEXT: "BULK" },
  { VALUE: 'SMS', TEXT: "SMS" },
];

let referenceStatus = [
  { VALUE: 1, TEXT: "Active" },
  { VALUE: 3, TEXT: "Closed" },
  { VALUE: 2, TEXT: "Cancel" },
];

let lcBasis = [
  { VALUE: "FOB", TEXT: "FOB" },
  { VALUE: "C & F", TEXT: "C & F" },
  { VALUE: "CIF", TEXT: "CIF" },
  { VALUE: "CM", TEXT: "CM" },
  { VALUE: "CMT", TEXT: "CMT" },
];

let quantityUnitType = [
  { VALUE: 1, TEXT: "Pcs" },
  { VALUE: 12, TEXT: "Dz" },
];
let quantityUnitTypeTwo = [
  { VALUE: 1, TEXT: "Pcs" },
  { VALUE: 2, TEXT: "Set" },
  { VALUE: 12, TEXT: "Dz" },
];

let imageFormateList = {
  JPG: "JPG",
  GIF: "GIF",
  BMP: "BMP",
  TIF: "TIF",
};

let cardGenaratorType = [
  { VALUE: "A", TEXT: "Auto" },
  { VALUE: "E", TEXT: "Numeric Emp ID" },
  { VALUE: "U", TEXT: "User Define" },
];
let genderList = [
  { VALUE: "M", TEXT: "Male" },
  { VALUE: "F", TEXT: "Female" },
];
let genderList3 = [
  { VALUE: null, TEXT: "All" },
  { VALUE: "M", TEXT: "Male" },
  { VALUE: "F", TEXT: "Female" },
];

let applicationNameFormate = [
  { VALUE: "1L", TEXT: "Salutation LName, Fname" },
  { VALUE: "0L", TEXT: "LName, Fname" },
  { VALUE: "1F", TEXT: "Salutation FName Lname" },
  { VALUE: "0F", TEXT: "FName Lname" },
];
let applicationType = [
  { VALUE: "1", TEXT: "Granted" },
  { VALUE: "0", TEXT: "Rejected" },
  { VALUE: "2", TEXT: "Just Apply" },
  { VALUE: "", TEXT: "" },
];
let shipmentMode = [
  { VALUE: "S", TEXT: "Sea" },
  { VALUE: "A", TEXT: "Air" },
  { VALUE: "T", TEXT: "Sea/Air" },
];
let shipmentMode2 = [
  { VALUE: 1, TEXT: "Air" },
  { VALUE: 2, TEXT: "Sea" },
  { VALUE: 3, TEXT: "Air & Sea" },
  { VALUE: 4, TEXT: "Sea & Air" },
  { VALUE: 5, TEXT: "Road" },
];
let shipmentMode3 = [
  { VALUE: 1, TEXT: "Air" },
  { VALUE: 2, TEXT: "Sea" },
  { VALUE: 3, TEXT: "Air & Sea" },
];

let shipType = [
  { VALUE: 1, TEXT: "Direct" },
  { VALUE: 2, TEXT: "Transshipment" },
];
let carierType = [
  { VALUE: "BL", TEXT: "BL No" },
  { VALUE: "AW Bill", TEXT: "MAW Bill No" },
  { VALUE: "TR", TEXT: "TR No" },
  { VALUE: "Courier", TEXT: "Courier No" },
];
let recieveStatus1 = [
  { VALUE: "W", TEXT: "Pending" },
  { VALUE: "P", TEXT: "PartialReceive" },
  { VALUE: "F", TEXT: "FullReceive" },
];


let bainaryType = {
  Yes: 1,
  No: 0,
};
let prefixSuffix = {
  Prefix: "P",
  Suffix: "S",
};

let languageProfieancyStatus = {
  Excellent: "E",
  Moderate: "M",
  Good: "G",
};

let workOrderStatus = {
  All: "",
  Approved: "A",
  Waiting: "W",
};
let workOrderStatusSl = {
  Approved: "A",
  Waiting: "W",
};

let recieveStatus = {
  All: "",
  Pending: "W",
  PartialReceive: "P",
  FullReceive: "F",
};

let approvalStatus = {
  All: "4",
  Complete: "1",
  PartiallyApproved: "2",
  FullPending: "3",
};

let weekStatus = {
  Sunday: 1,
  Monday: 2,
  Tuesday: 3,
  Wednesday: 4,
  Thursday: 5,
  Friday: 6,
  Saturday: 7,
};

let monthStatus = {
  JANUARY: "JAN",
  FEBRUARY: "FEB",
  MARCH: "MAR",
  APRIL: "APR",
  MAY: "MAY",
  JUNE: "JUN",
  JULY: "JUL",
  AUGUST: "AUG",
  SEPTEMBER: "SEP",
  OCTOBER: "OCT",
  NOVEMBER: "NOV",
  DECEMBER: "DEC",
};

let profomaInvoiceType = {
  New: "N",
  Revised: "R",
  Amendment: "A",
  AgnistBlock: "B",
  Canceled: "C",
};

let billStatus2 = {
  New: "N",
  Revised: "R",
  Amendment: "A",
  AgnistBlock: "B",
  AdvancePayment: "AP",
};

let sourceStatus = {
  Nominated: "N",
  OwnSource: "O",
};

let lcTypeThree = {
  Foreign: "F",
  Local: "L",
};
let productItem = {
  Accessories: "A",
  Fabric: "F",
  Machinery: "M",
}

let yearStatus = {
  2005: 2005,
  2006: 2006,
  2007: 2007,
  2008: 2008,
  2009: 2009,
  2010: 2010,
  2011: 2011,
  2012: 2012,
  2013: 2013,
  2014: 2014,
  2015: 2015,
  2016: 2016,
  2017: 2017,
  2018: 2018,
  2019: 2019,
  2020: 2020,
  2021: 2021,
  2022: 2022,
  2023: 2023,
  2024: 2024,
  2025: 2025,
};

let userPermissionType = [
  { VALUE: null, TEXT: "Select" },
  { VALUE: 1, TEXT: "All user" },
  { VALUE: 2, TEXT: "Specific user" },
];

let approvalStatus1 = [
  { VALUE: 1, TEXT: "Complete" },
  { VALUE: 2, TEXT: "PartiallyApproved" },
  { VALUE: 3, TEXT: "FullPending" },
];

let taskType = {
  select: "",
  Forward: "F",
  Backward: "B",
  Halt: "H",
};

let dateTypeStatus = [
  { VALUE: "R", TEXT: "Req Date" },
  { VALUE: "W", TEXT: "WO date" },
  { VALUE: "M", TEXT: "MRR Date" },
];

let payrollStatus = [
  { VALUE: 1, TEXT: "Do not create" },
  { VALUE: 2, TEXT: "Create as Jobtitle wise" },
  { VALUE: 3, TEXT: "Create as Employee's current payroll wise" },
];

let promotionPayrollStatus = [
  { VALUE: 1, TEXT: "Do not create" },
  { VALUE: 2, TEXT: "Create as Jobtitle wise" },
  { VALUE: 3, TEXT: "Create as Employee's current payroll wise" },
  { VALUE: 4, TEXT: "Create Payroll with Basic & Gross" },
];

let manPowerStatus = [
  { TEXT: "Section wise Man Power status", VALUE: "S" },
  { TEXT: "Department wise Man Power status", VALUE: "D" },
  { TEXT: "Job Type wise Man Power status", VALUE: "J" },
  { TEXT: "Department && Section Wise Status", VALUE: "DS" },
  { TEXT: "Daily Costing Report", VALUE: "DC" },
];

let manPowerStatusTypeList = [
  { VALUE: "1", TEXT: "Manpower Status" },
  { VALUE: "2", TEXT: "Turnover Status" },
];
let manPowerStatusTypeList1 = [
  { VALUE: 1, TEXT: "Manpower Status" },
  { VALUE: 2, TEXT: "Turnover Status" },
];

let payrollStatus1 = [
  { VALUE: 1, TEXT: "Do not create" },
  { VALUE: 2, TEXT: "Create as Jobtitle wise" },
  { VALUE: 3, TEXT: "Create as Employee's current payroll wise" },
  { VALUE: 4, TEXT: "Create Payroll with Basic&Gross" },
];

let offDayStatyus = [
  { VALUE: 1, TEXT: "SUN" },
  { VALUE: 2, TEXT: "MON" },
  { VALUE: 3, TEXT: "TUE" },
  { VALUE: 4, TEXT: "WED" },
  { VALUE: 5, TEXT: "THU" },
  { VALUE: 6, TEXT: "FRI" },
  { VALUE: 7, TEXT: "SAT" },
];
let applyOn = [
  { VALUE: "B", TEXT: "BASIC" },
  { VALUE: "G", TEXT: "GROSS" },
];
let supplierCategoryList = [
  { VALUE: null, LABEL: "All" },
  { VALUE: 1, LABEL: "Active" },
  { VALUE: 0, LABEL: "In Active" },
];
let statementList = [
  { VALUE: "H", TEXT: "HR Type" },
  { VALUE: "B", TEXT: "Division" },
  { VALUE: "J", TEXT: "Jobtitle" },
  { VALUE: "G", TEXT: "Grade" },
  { VALUE: null, TEXT: "All" },
];
let statementList1 = [
  { VALUE: "H", TEXT: "HR Type" },
  { VALUE: "B", TEXT: "Division" },
  { VALUE: "J", TEXT: "Jobtitle" },
  { VALUE: "G", TEXT: "Grade" },
];
let statementForList = [
  { VALUE: "PF", TEXT: "Provident Fund" },
  { VALUE: "B", TEXT: "Basic" },
  { VALUE: "SA", TEXT: "Salary Advice" },
  { VALUE: "E", TEXT: "Earning" },
  { VALUE: "D", TEXT: "Deduction" },
];
let earningStatusList = [
  { VALUE: "E", TEXT: "Earning" },
  { VALUE: "D", TEXT: "Deduction" },
];
let behaviourStatus = [
  { VALUE: "", TEXT: "Select" },
  { VALUE: "E", TEXT: "Earning" },
  { VALUE: "D", TEXT: "Deduction" },
  { VALUE: "O", TEXT: "Others" },
];
let otherType = [
  { VALUE: null, TEXT: "Select" },
  { VALUE: 2, TEXT: "Present days" },
  { VALUE: 3, TEXT: "Present Hour" },
  { VALUE: 4, TEXT: "Absent Day" },
  { VALUE: 5, TEXT: "Absent Hour" },
  { VALUE: 7, TEXT: "Leave Day" },
  { VALUE: 6, TEXT: "Leave Hour" },
  { VALUE: 10, TEXT: "Holiday" },
  { VALUE: 11, TEXT: "Weekend" },
  { VALUE: 30, TEXT: "OT Rate" },
  { VALUE: 31, TEXT: "OT Hour" },
  { VALUE: 41, TEXT: "Weekend+Offday+Holiday" },
  { VALUE: 43, TEXT: "Weekend+Offday" },
  { VALUE: 42, TEXT: "Total Attendance" },
  { VALUE: 44, TEXT: "Last Day of month" },
];
let behaviorList = [
  { VALUE: "E", TEXT: "Earning" },
  { VALUE: "D", TEXT: "Deduction" },
];
let statementListOne = [
  { VALUE: "M", TEXT: "Monthly Statement" },
  { VALUE: "B", TEXT: "Bank Statement" },
];
let taxBehavior = [
  { VALUE: null, TEXT: "Select" },
  { VALUE: 1, TEXT: "Taxable Element" },
  { VALUE: 0, TEXT: "Non-taxable Element" },
  { VALUE: 2, TEXT: "Income Tax Element" },
];
let clStatusList = [
  { VALUE: null, TEXT: "All" },
  { VALUE: "Shipment", TEXT: "Shipment" },
  { VALUE: "Not Shipment", TEXT: "Not Shipment" },
  { VALUE: "A", TEXT: "Arival Port" },
  { VALUE: "AWNR", TEXT: "Arival Warehouse Not Rcv" },
  { VALUE: "Rcv", TEXT: "Receive" },
  { VALUE: "L", TEXT: "Not Lc" },
];
let docStatusList = [
  { VALUE: null, TEXT: "All" },
  { VALUE: "Paid", TEXT: "Paid" },
  { VALUE: "Unpaid", TEXT: "Unpaid" },
  { VALUE: "Bank Accepted", TEXT: "Bank Accepted" },
  { VALUE: "Accepted", TEXT: "Accepted" },
  { VALUE: "Initialized", TEXT: "Initialized" },
];

let lcReqList = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: 0, TEXT: "WO" },
  { VALUE: 1, TEXT: "L/C" },
];
let lcReqList1 = [
  { VALUE: 0, TEXT: "WO" },
  { VALUE: 1, TEXT: "L/C" },
];
let  itemDestType= [
  { VALUE: 'C', TEXT: "Cotton" },
  { VALUE: 'L', TEXT: "Lycra" },
];
let purchaseTypeList = [
  { VALUE: "S", TEXT: "Sales Bill Wise" },
  { VALUE: "C", TEXT: "Sales Supplier Wise" },
  { VALUE: "I", TEXT: "Sales Item Wise" },
  { VALUE: "RS", TEXT: "Return Bill Wise" },
  { VALUE: "RC", TEXT: "Return Supplier Wise" },
  { VALUE: "RI", TEXT: "Return Item Wise" },
];
let itemSerialList = [
  { VALUE: "C", TEXT: "Customer Wise" },
  { VALUE: "M", TEXT: "Serial List" },
];
let workOrderStatusTwo = {
  All: "",
  Waiting: "W",
  Approved: "A",
  Denied: "D",
};

let salesReportSatus = [
  { VALUE: "SL_2023", TEXT: "Sales Invoice Details WITH Collection" },
  { VALUE: "SL_2025", TEXT: "Delivery Chalan " },
  { VALUE: "SL_20231", TEXT: "Sales Invoice & Delivery Chalan" },
  { VALUE: "SL_2624", TEXT: "Loan" },
  { VALUE: "SL_2241", TEXT: "Packing LIST" },
  { VALUE: "SL_20210", TEXT: "Gate Pass" },
  { VALUE: "SL_20211", TEXT: "Delivery Challan(WITH BATCH Lot)" },
  { VALUE: "SL_20212", TEXT: "Gate Pass (WITH BATCH Lot)" },
  { VALUE: "SL_20213", TEXT: "Delivery Challan(Wastage)" },
  { VALUE: "SL_20214", TEXT: "Gate Pass (Wastage)" },
];

let gradeStatus = {
  Grade: "G",
  Division: "D",
  Class: "C",
  Appeared: "A",
};

let itemQualityStatus = {
  Good: "Good",
  Damage: "Damage",
  Broken: "Broken",
};

let statusTwo = {
  All: null,
  Waiting: "W",
  Approved: "A",
  Denied: "D",
};

let statusThree = {
  All: null,
  Pending: "W",
  Approved: "A",
  Rejected: "R",
};

let adjustType = {
  Increase: "I",
  Decrease: "D",
};

let intervalStats = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};

let secoundRoundingStatus = {
  Trunc: "T",
  Round: "R",
  AsItIs: "A",
};

let adjustWith = {
  InTime: "I",
  OutTime: "O",
  OutTimeBasedOnShiftTime: "OS",
  InTimeBasedOnShiftTime: "IS",
};

let delModeStatus = [
  { VALUE: 1, TEXT: "Air" },
  { VALUE: 2, TEXT: "Sea" },
  { VALUE: 3, TEXT: "Air & Sea" },
  { VALUE: 4, TEXT: "Road" },
];

let currectionType = {
  Holiday: "Holiday",
  Absent: "Absent",
  Leave: "Leave",
  Weekend: "Weekend",
  OffDay: "Off Day",
};

let currectionTypeList = [
  { VALUE: "Holiday", TEXT: "Holiday" },
  { VALUE: "Absent", TEXT: "Absent" },
  { VALUE: "Leave", TEXT: "Leave" },
  { VALUE: "Weekend", TEXT: "Weekend" },
  { VALUE: "Off Day", TEXT: "Off Day" },

 
];

let workOrderStatus1 = [
  { VALUE: "A", TEXT: "Approved" },
  { VALUE: "W", TEXT: "Waiting" },
];
let procurementStaus = [
  { VALUE: "A", TEXT: "Approved" },
  { VALUE: "W", TEXT: "Pending" },
];
let offDayStatus = [
  { VALUE: 0, TEXT: "Offday" },
  { VALUE: -1, TEXT: "Holiday" },
  { VALUE: 1, TEXT: "Normal" },
];

let printCopyFormat = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "1", TEXT: "Vendor's Copy" },
  { VALUE: "2", TEXT: "Office Copy" },
  { VALUE: "3", TEXT: "Factory Copy" },
];
let printCopyFormat2 = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "1", TEXT: "Vendor's Copy" },
  { VALUE: "2", TEXT: "Office Copy" },
];
let referenceList = [
  { VALUE: "D", TEXT: "Direct" },
  { VALUE: "N", TEXT: "Pur. Notice" },
  { VALUE: "R", TEXT: "Pur. Requisition" },
];
let purchaseOrderTypeList = [
  { VALUE: "S", TEXT: "Summary" },
  { VALUE: "C", TEXT: "Supplier Wise Summary" },
  { VALUE: "L", TEXT: "Customer Wise Detail" },
  { VALUE: "I", TEXT: "Item Wise" },
  { VALUE: "D", TEXT: "Form" },
];
let purchaseOrderStatusList = [
  { VALUE: null, TEXT: "All" },
  { VALUE: "X", TEXT: "All but Denied" },
  { VALUE: "A", TEXT: "Approved" },
  { VALUE: "W", TEXT: "Waiting" },
  { VALUE: "D", TEXT: "Denied" },
  { VALUE: "P", TEXT: "Processing" },
];
let purchaseRequisitionTypeList = [
  { VALUE: "F", TEXT: "Form Type" },
  { VALUE: "R", TEXT: "Requisition Wise Detail" },
  { VALUE: "I", TEXT: "Item wise Detail" },
];
let purchaseRequisitionStatusList = [
  { VALUE: null, TEXT: "All" },
  { VALUE: "A", TEXT: "Approved" },
  { VALUE: "W", TEXT: "Waiting" },
  { VALUE: "C", TEXT: "Cancelled" },
];
let manpowerStrengthReqApprovalStatusList = [
  { VALUE: null, TEXT: "All" },
  { VALUE: "A", TEXT: "Approved" },
  { VALUE: "W", TEXT: "Waiting" },
  { VALUE: "D", TEXT: "Denied" },
];
let invoiceStatus = [
  { VALUE: "A", TEXT: "Approved" },
  { VALUE: "W", TEXT: "Waiting" },
  { VALUE: "D", TEXT: "Denied" },
];

let transactionStatus = [
  { VALUE: "1", TEXT: " Contract Wise Other Invoices" },
  { VALUE: "2", TEXT: "Workorder Wise Other Invoices" },
  { VALUE: "3", TEXT: "Bill Wise" },
];

let purchaseTransactionSummaryList = [
  { VALUE: "S", TEXT: "Purchase MRR Wise" },
  { VALUE: "C", TEXT: "Purchase Supplier Wise" },
  { VALUE: "I", TEXT: "Purchase Item Wise" },
  { VALUE: "SD", TEXT: "Purchase MRR Wise Purchase Detail" },
  { VALUE: "RS", TEXT: "Return MRR Wise" },
  { VALUE: "RC", TEXT: "Return Supplier Wise" },
  { VALUE: "RI", TEXT: "Return Item Wise" },
];
let budgetTypeList = [
  { VALUE: "NO", TEXT: "No Budget" },
  { VALUE: "FI", TEXT: "Financial Budget" },
  { VALUE: "PA", TEXT: "Purchase Budget" },
];
let financialStatementType = [
  { VALUE: "B", TEXT: "Balance Sheet" },
  { VALUE: "I", TEXT: "Income Statement" },
  { VALUE: "C", TEXT: "Cash Flow" },
];
let isBudgetList = [
  { VALUE: 0, TEXT: "No Budget" },
  { VALUE: 1, TEXT: "Only Message" },
  { VALUE: 2, TEXT: " Message & Protect" },
];
let csReprotTypeList = [
  { VALUE: 0, TEXT: "Group / Item Wise" },
  { VALUE: 1, TEXT: "Item And TS Wise" },
  { VALUE: 2, TEXT: "Item Wise" },
  { VALUE: 3, TEXT: "Unit Wise" },
  { VALUE: 4, TEXT: "Department Wise" },
  { VALUE: 5, TEXT: "Requsitior Wise" },
  { VALUE: 6, TEXT: "Procurer Wise" },
  { VALUE: 7, TEXT: "Supplier Wise" },
];
let bankTypeList = [
  { VALUE: 1, TEXT: "One Bank" },
  { VALUE: 2, TEXT: "Islami Bank" },
  { VALUE: 3, TEXT: "Bank Asia" },
  { VALUE: 4, TEXT: "Prime Bank" },
];
let importReportTypeList = [
  { VALUE: 1, TEXT: "Bank Forwarding Application" },
  { VALUE: 2, TEXT: "Application & Aggrement Form" },
  { VALUE: 3, TEXT: "LC Authorisation Form" },
];
let purchaseAnalysisTypeList = [
  { VALUE: "M", TEXT: "Work Order Wise Details Report" },
];
let transactionRelatedTo = [
  { VALUE: 1, TEXT: "Work Order" },
  { VALUE: 2, TEXT: "Cash" },
  { VALUE: 3, TEXT: "Purchase Contract" },
  { VALUE: 4, TEXT: "Purchase Requisition" },
  { VALUE: 0, TEXT: "None" },
  { VALUE: null, TEXT: "All" },
];

let transactionRelatedToSl = [
  { VALUE: 1, TEXT: "Delivery Order" },
  { VALUE: 2, TEXT: "Sales Contract" },
  { VALUE: 3, TEXT: "Sales Invoice" },
  { VALUE: 4, TEXT: "POS" },
  { VALUE: 0, TEXT: "None" },
  { VALUE: null, TEXT: "All" },
];
let importLeaveTypeList = [
  { VALUE: 1, TEXT: "Leave Register" },
  { VALUE: 2, TEXT: "Leave Register Detail" },
  { VALUE: 3, TEXT: "Leave Opening Balance" },
  { VALUE: 4, TEXT: "Earn Leave From Present" },
  { VALUE: 5, TEXT: "Earn Leave Payment" },
  { VALUE: 6, TEXT: "Summery" },
];
let summeryTypeList = [
  { VALUE: 0, TEXT: "Normal" },
  { VALUE: 1, TEXT: "Group" },
];

let reportEmpList = [
  { VALUE: 1, TEXT: "Emp List (Process wise)" },

];
let loanHistoryReportType = [
  { VALUE: "S", TEXT: "Summary" },
  { VALUE: "D", TEXT: "Details" },
  { VALUE: "L", TEXT: "List" },
];
let salaryTypeList = [
  { VALUE: "TD", TEXT: "Time/Day Rated" },
  { VALUE: "P", TEXT: "Piece Rated" },
];
let importLcReportTypeList = [
  { VALUE: 1, TEXT: "LC Reports" },
  { VALUE: 2, TEXT: "LC Supplier wise Reports" },
  { VALUE: 3, TEXT: "LC Statement Report" },
];
let documentWisePurchaseStatementType = [
  { VALUE: "S", TEXT: "LC Summary" },
  { VALUE: "D", TEXT: "Document Wise" },
  { VALUE: "L", TEXT: "LC Report" },
];
let handoverTransportType = [
  { VALUE: 0, TEXT: "Handover Transport Report" },
  { VALUE: 1, TEXT: "CNF Agency Commission Bill" },
];

let acceptedType2 = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "A", TEXT: "Accepted" },
  { VALUE: "NA", TEXT: "Not Accepted" },
];

let dateStatus = [
  { VALUE: "1", TEXT: "Requisition Date" },
  { VALUE: "2", TEXT: "Expected Date" },
  { VALUE: "3", TEXT: "Approve Date" },
];
let reqStatus = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: 1, TEXT: "Complete" },
  { VALUE: 2, TEXT: "Partially Issue" },
  { VALUE: 3, TEXT: "Full Pending" },
];

let moneyReqStatus = [
  { VALUE: "W", TEXT: "Pending" },
  { VALUE: "A", TEXT: "Passed" },
  { VALUE: "H", TEXT: "Denied" },
];

let attendaceList = [
  { VALUE: 1, TEXT: "With Time (In / Out)" },
  { VALUE: 2, TEXT: "Without Time (In / Out)" },
  { VALUE: 3, TEXT: "With Movement" },
  { VALUE: 4, TEXT: "Without Date" },
  { VALUE: 5, TEXT: "With Late Duration" },
  { VALUE: 6, TEXT: "Absent List" },
  { VALUE: 7, TEXT: "Holiday Absent" },
  { VALUE: 8, TEXT: "With Time (In / Out) [BU Group]" },
  { VALUE: 9, TEXT: "Absent Comparison (Two Days)" },
  { VALUE: 10, TEXT: "Inactive Employee Card Punch" },
  { VALUE: 11, TEXT: "With Time (C)" },
];

let incrementSuggestionReportFormetType = [
  { VALUE: "HR_3081", TEXT: "Format 1" },
  { VALUE: "", TEXT: "Format 2" },
  { VALUE: "HR_3084", TEXT: "Incremented List" },
  { VALUE: "HR_3085", TEXT: "Increment List (Gross)" },
  { VALUE: "HR_3086", TEXT: "Increment Letter" },
  { VALUE: "HR_3087", TEXT: "Format 3" },
  { VALUE: "HR_3088", TEXT: "Format 4" },
];
let incrementSuggestionReportCheckType = [
  { VALUE: 0, TEXT: "Increment Holder Only" },
  { VALUE: 1, TEXT: "Incremet Not Found" },
  { VALUE: null, TEXT: "All" },
];
let incrementSuggestionActiveStatus = [
  { VALUE: null, TEXT: "All" },
  { VALUE: 1, TEXT: "Active" },
  { VALUE: 0, TEXT: "Inactive" },
];
// Active
// Canceled
// Sattled

let loanRegStatus = [
  { VALUE: 'A', TEXT: "Active" },
  { VALUE: 'C', TEXT: "Canceled" },
  { VALUE: 'S', TEXT: "Sattled" },
];
let activeStatusCurrentMonth = [
  { VALUE: null, TEXT: "All" },
  { VALUE: 1, TEXT: "Active" },
  { VALUE: 0, TEXT: "Inactive" },
  { VALUE: 2, TEXT: "Inactive(Current Month)" },
];
let earnLeavePaymentReportFormat = [
  { VALUE: 1, TEXT: "Format 1" },
  { VALUE: 2, TEXT: "Format 2" },
  { VALUE: 3, TEXT: "Format 3" },
];
let transactionAction = [
  {VALUE: null, TEXT: "All"},
  { VALUE: 'IR', TEXT: "Receive (+)" },
  { VALUE: 'II', TEXT: "Issue (-)" },
];

let transactionActionPur = [
  {VALUE: null, TEXT: "All"},
  { VALUE: 'PR', TEXT: "Receive (+)" },
  { VALUE: 'PI', TEXT: "Issue (-)" },
];

let transactionActionSl = [
  {VALUE: null, TEXT: "All"},
  { VALUE: 'SR', TEXT: "Receive (+)" },
  { VALUE: 'SI', TEXT: "Issue (-)" },
];

let earnLeavePaymentReportType = [
  { VALUE: 0, TEXT: "Details" },
  { VALUE: 1, TEXT: "Summary" },
  { VALUE: 2, TEXT: "Leave Register Detail" },
  { VALUE: 3, TEXT: "Leave Register Summary" },
];
let absentConterList = [
  { VALUE: 1, TEXT: "On Total Absent" },
  { VALUE: 2, TEXT: "On Continuous Absent" },
];
let absentConterList1 = [
  { VALUE: "1", TEXT: "On Total Absent" },
  { VALUE: "2", TEXT: "On Continuous Absent" },
];
let dailyStatusList = [
  { VALUE: "P", TEXT: "Present" },
  { VALUE: "A", TEXT: "Absent" },
  { VALUE: "H", TEXT: "Holiday" },
  { VALUE: "W", TEXT: "Weekly" },
  { VALUE: "L", TEXT: "Late In" },
  { VALUE: "E", TEXT: "Early Exit" },
  { VALUE: "L/E", TEXT: "Late/Early" },
  { VALUE: "HP", TEXT: "Holiday Present" },
  { VALUE: "WP", TEXT: "Weekly Present" },
  { VALUE: "OP", TEXT: "Offday Present" },
  { VALUE: "No", TEXT: "Present but no Outtime" },
  { VALUE: "OT", TEXT: "OT Only" },
//  { VALUE: null, TEXT: "All" },
];
let EmployeeStatusList = [
  { VALUE: "Present", TEXT: "Present" },
  { VALUE: "Weekend", TEXT: "Weekend" },
  { VALUE: "Absent", TEXT: "Absent" },
  { VALUE: "Holiday", TEXT: "Holiday" },
  { VALUE: "Off Day", TEXT: "Off Day" },
  { VALUE: "Present : Inside", TEXT: "Present : Inside" },
  { VALUE: "EE", TEXT: "Early Exit" },
  { VALUE: "LE", TEXT: "Late Entry" },
];

let activeStatusCom = [
  { VALUE: 1, TEXT: "Active" },
  { VALUE: 0, TEXT: "Inactive" },
  { VALUE: null, TEXT: "All" },
];
let activeStatusCom1 = [
  { VALUE: 1, TEXT: "Active" },
  { VALUE: 0, TEXT: "Inactive" },
];

let employeeWiseAttendaceReportFormetDefault = [
  { VALUE: "HR_2029", TEXT: "Format 1 (Default)" },
  { VALUE: "HR_2024", TEXT: "Format 2" },
  { VALUE: "HR_20212", TEXT: "Format 1 (Default 2)" },
  { VALUE: "HR_20214", TEXT: "Format 1 (Default 3 - alt)" },
  { VALUE: "HR_20215", TEXT: "Format 1 (Default - Alt)" },
  { VALUE: "HR_20218", TEXT: "Format 1" },
  { VALUE: "HR_20219", TEXT: "Format 2(Default-Alt)" },
  { VALUE: "HR_20220", TEXT: "Format 1(Default-1 Non Production)" },
  { VALUE: "HR_20221", TEXT: "Format 4" },
  { VALUE: "HR_2024", TEXT: "Format 01 (Default)" },
  { VALUE: "HR_2026", TEXT: "Format 0101" },
  { VALUE: "HR_2027", TEXT: "Format 1 (3)" },
];

let employeeWiseAttendaceReportFormetSummary = [
  { VALUE: "HR_2026", TEXT: "Format 1 (Default)" },
  { VALUE: "HR_20210", TEXT: "Format 2" },
  { VALUE: "HR_20213", TEXT: "Format 3(six)" },
  { VALUE: "HR_20216", TEXT: "Format 3 (Point System)" },
  { VALUE: "HR_20222", TEXT: "Format 4" },
];

let employeeWiseAttendaceType = [
  { VALUE: 1, TEXT: "Without Date" },
  { VALUE: 2, TEXT: "With Date" },
  { VALUE: 3, TEXT: "Without Shift" },
];

let employeeWiseAttendaceReportType = [
  { VALUE: 1, TEXT: "Online Date" },
  { VALUE: 2, TEXT: "Last Process" },
];
let recieveLoanAmt = [
  { VALUE: 1, TEXT: "Yes" },
  { VALUE: 0, TEXT: "No" },
  { VALUE: 2, TEXT: "Forward" },
  { VALUE: 3, TEXT: "Forward to next Loan" },
  { VALUE: 4, TEXT: "Manual Return" },
];

let calOn = [
  { VALUE: "H", TEXT: "Hour" },
  { VALUE: "T", TEXT: "Time" },
];

let formulaOn = [
  { VALUE: "B", TEXT: "Basic" },
  { VALUE: "G", TEXT: "Gross" },
];
let typeList = [
  { VALUE: "F", TEXT: "Forward" },
  { VALUE: "B", TEXT: "Backword" },
  { VALUE: "H", TEXT: "Deny" },
  { VALUE: "A", TEXT: "Alternate" },

];
let calDayType = [
  { VALUE: "PM", TEXT: "Present(M)" },
  { VALUE: "PD", TEXT: "Present(D)" },
  { VALUE: "D", TEXT: "Day" },
  { VALUE: "R", TEXT: "Rate" },
  { VALUE: "PAM", TEXT: "Payable(M)" },
]; 

let lateDayType = [
  { VALUE: "I", TEXT: "Interval" },
  { VALUE: "R", TEXT: "Range" },
  { VALUE: "M", TEXT: "Minute" }, 
];

let moduleList = [
  { VALUE: "AC", TEXT: "Accounts" },
  { VALUE: "SL", TEXT: "Sales" },
  { VALUE: "IN", TEXT: "Inventory" }, 
  { VALUE: "PR", TEXT: "Purchase" }, 
  { VALUE: "HR", TEXT: "Human Resource" }, 
];

let searchArea = [
  { VALUE: 1, TEXT: "Employee" },
  { VALUE: 0, TEXT: "Bonus Hold" },
];

let amountStatus = [
  { VALUE: ">=", TEXT: ">=" },
  { VALUE: "<=", TEXT: "<=" },
  { VALUE: ">", TEXT: ">" },
  { VALUE: "<", TEXT: "<" },
  { VALUE: "=", TEXT: "=" },
];

let dailyOrMonthly = [
  { VALUE: "D", TEXT: "Daily" },
  { VALUE: "M", TEXT: "Monthly" },
];
let calNoOption= [
  { VALUE: "T", TEXT: "Time" },
  { VALUE: "H", TEXT: "Hour" },
]; 
let durationYear = [
  { VALUE: "=", TEXT: "=" },
  { VALUE: ">", TEXT: ">" },
  { VALUE: "<", TEXT: "<" },
  { VALUE: ">=", TEXT: ">=" },
  { VALUE: "<=", TEXT: "<=" },
];
let durationMonth = [
  { VALUE: "=", TEXT: "=" },
  { VALUE: ">", TEXT: ">" },
  { VALUE: ">=", TEXT: ">=" },
  { VALUE: "<", TEXT: "<" },
];
let durationDay = [
  { VALUE: "=", TEXT: "=" },
  { VALUE: ">", TEXT: ">" },
];
let durationYearOperator = [
  { VALUE: "=", TEXT: "=" },
  { VALUE: "%3E", TEXT: ">" },
  { VALUE: "%3C", TEXT: "<" },
  { VALUE: "%3E=", TEXT: ">=" },
  { VALUE: "%3C=", TEXT: "<=" },
];
let durationMonthOperator = [
  { VALUE: "=", TEXT: "=" },
  { VALUE: "%3E", TEXT: ">" },
  { VALUE: "%3C", TEXT: "<" },
  { VALUE: "%3E=", TEXT: ">=" },
];
let durationDayOperator = [
  { VALUE: "=", TEXT: "=" },
  { VALUE: "%3E", TEXT: ">" },
];

let approveStatus = [
  { VALUE: null, TEXT: "All" },
  { VALUE: "2", TEXT: "Submit" },
  { VALUE: "1", TEXT: "Draft" },
  { VALUE: "3", TEXT: "Approved" },
  { VALUE: "4", TEXT: "Paid" },
];
let grossStatus = [
  { VALUE: 0, TEXT: "Without Gross" },
  { VALUE: 1, TEXT: "With Gross" },
];
let salPayMood = [
  { VALUE: "C", TEXT: "Cash" },
  { VALUE: "Q", TEXT: "Cheque" },
];
let employeeListReport = [
  { VALUE: 0, TEXT: "Employee Details" },
  { VALUE: 1, TEXT: "Employee List" },
  { VALUE: 2, TEXT: "Employee List Group 3" },
  { VALUE: 4, TEXT: "Summary" },
  { VALUE: 5, TEXT: "Absent & Leave Days" },
  { VALUE: 6, TEXT: "New Employee" },
  { VALUE: 7, TEXT: "New Emp(Format-1)" },
  { VALUE: 8, TEXT: "New Emp(Format-2)" },
  { VALUE: 9, TEXT: "Employee Evaluation" },
  { VALUE: 10, TEXT: "Emp List With Gross" },
  { VALUE: 11, TEXT: "Emp List (Process wise)" },
  { VALUE: 12, TEXT: "Emp List with Payroll" },

  
];

let employeeListReportOne = [
  { VALUE: 0, TEXT: "Employee List" },
  { VALUE: 1, TEXT: "Suggestion List" },
 

  
];

let payScheduleStatus = [
  { VALUE: 1, TEXT: "Schedule Complete" },
  { VALUE: 0, TEXT: "Waiting For Schedule" },
];

let paymentMode = [
  { VALUE: "Cheque", TEXT: "Cheque" },
  { VALUE: "Cash", TEXT: "Cash" },
  { VALUE: "Cash-Cheque", TEXT: "Cash Cheque" },
];
let paymentMode1 = [
  { VALUE: "LC", TEXT: "LC" },
  { VALUE: "FDD", TEXT: "FDD" },
  { VALUE: "FTT", TEXT: "FTT" },
  { VALUE: "CREDIT", TEXT: "CREDIT" },
  { VALUE: "FOC", TEXT: "FOC" },
];
let salaryType = [
  { VALUE: "TD", TEXT: "Time/Day Rated" },
  { VALUE: "P", TEXT: "Piece Rated" },
];
let purposeTypeList = [
  { VALUE: null, TEXT: "All" },
  { VALUE: "P", TEXT: "Personal" },
  { VALUE: "O", TEXT: "Offical" },
];
let purposeTypeList1 = [
  { VALUE: "P", TEXT: "Personal" },
  { VALUE: "O", TEXT: "Offical" },
];
let departmentList = [
  { VALUE: "S", TEXT: "Section" },
  { VALUE: "D", TEXT: "Department" },
  { VALUE: "A", TEXT: "At a galance" },
  { VALUE: "HR_2228", TEXT: "TOP SHEET (BU wise)" },
  { VALUE: "HR_2229", TEXT: "TOP SHEET (Jobtitle wise)" },
  { VALUE: "HR_22210", TEXT: "TOP SHEET (Company wise)" },
  { VALUE: "HR_22211", TEXT: "TOP SHEET (BU wise - Non Com)" },
  { VALUE: "HR_22212", TEXT: "Balance Overtime Summary" },
  { VALUE: "HR_22213", TEXT: "TOP SHEET (BU wise- Format 12)" },
  { VALUE: "HR_22214", TEXT: "Balance Overtime Summary(Format 2)" },
  { VALUE: "HR_22215", TEXT: "BU Wise Present Summary" },
  { VALUE: "HR_22216", TEXT: "TOP SHEET (Cash & Bank)" },
  { VALUE: "HR_22217", TEXT: "Salary Comparison" },
  { VALUE: "HR_22218", TEXT: "TOP SHEET (BU Group wise)" },
  { VALUE: "HR_22219", TEXT: "BU WISE TABULAR SHEET (F-13)" },
  { VALUE: "HR_22221", TEXT: "With Distribution policy" },
  { VALUE: "HR_22220", TEXT: "Non com & OT Dist" },
  { VALUE: "HR_22222", TEXT: "Top Sheet (3 Segment OT)" },
  { VALUE: "HR_22223", TEXT: "Balance Overtime Summary (Format 3)" },
  { VALUE: "HR_22224", TEXT: "Top Sheet (Format 9 -Fixed)" },
  { VALUE: "HR_22225", TEXT: "Extra OT Summary Sheet (2 Hour)" },
  {
    VALUE: "HR_22226",
    TEXT: "Balance OT & Total Salary Payment Sheet Summary",
  },
  { VALUE: "HR_22227", TEXT: "Extra OT Summary Sheet (1 hour)" },
];
let overTimeRequisitionType = [
  { VALUE: 1, TEXT: "Over Time Requisition" },
  { VALUE: 2, TEXT: "Over Time Requisition Summary" },
];
let overtimeRateList = [
  { VALUE: "0", TEXT: "Time Rated" },
  { VALUE: "1", TEXT: "Piece Rated" },
  { VALUE: null, TEXT: "All" },
];
let otType = [
  { VALUE: 1, TEXT: "Extra OT" },
  { VALUE: 2, TEXT: "General OT" },
];
let tiffinType = [
  { VALUE: 1, TEXT: "Worker" },
  { VALUE: 2, TEXT: "Executive" },
  { VALUE: 3, TEXT: "Prod Staff" },
];
let overTimeRequisitionReportFormat = [
  { VALUE: 1, TEXT: "Format-1" },
  { VALUE: 2, TEXT: "Format-2" },
  { VALUE: 3, TEXT: "Format-3" },
];
let equisitionReportFormat = [
  { VALUE: 1, TEXT: "Format-1" },
  { VALUE: 2, TEXT: "Format-2" },
  { VALUE: 3, TEXT: "Format-3" },
  { VALUE: 4, TEXT: "Format-4" }
];
let issueAs = [
  { VALUE: 'C', TEXT: "Issue as Capital Item" },
  { VALUE: 'R', TEXT: "Issue as Revenue Item" },  
];
let overTimeRequisitionReportFormat2 = [
  { VALUE: 1, TEXT: "Format-1" },
  { VALUE: 2, TEXT: "Format-2" },
];
let leaveRegisterHistoryReportType = [
  { VALUE: "HR_3002", TEXT: "Section" },
  { VALUE: "HR_3003", TEXT: "Jobtitle" },
  { VALUE: "HR_3001", TEXT: "Employee" },
  { VALUE: "HR_3004", TEXT: "ML" },
];
let activeStatusLeaveRegisterHistory = [
  { VALUE: null, TEXT: "All" },
  { VALUE: 1, TEXT: "Active" },
  { VALUE: 0, TEXT: "In-Active" },
];
let activeStatusLeaveRegisterHistory1 = [
  { VALUE: 1, TEXT: "Active" },
  { VALUE: 0, TEXT: "In-Active" },
];
let trainingStatus = [
  { VALUE: 0, TEXT: "Without Training" },
  { VALUE: 1, TEXT: "Trained" },
];

let finalSettlementStatementReportType = [
  { VALUE: "S", TEXT: "Statement" },
  { VALUE: "L", TEXT: "List" },
  { VALUE: "W", TEXT: "Sattlement List" },
  { VALUE: "G", TEXT: "Statement List with Basic and Gross" },
];

let billPaymentReportType = [
  { VALUE: "HR_2251", TEXT: "Bill Payment Detail" },
  { VALUE: "HR_2252", TEXT: "Bill Payment Summary" },
  { VALUE: "HR_2253", TEXT: "Night Allowance details" },
];
let billPaymentPayableStatus = [
  { VALUE: -1, TEXT: "All Employee" },
  { VALUE: 0, TEXT: "Payable Only" },
];
let salesTransactionType = [
  { TEXT: "Challan Wise (Sales)", VALUE: "S" },
  { TEXT: "Customer Wise (Sales)", VALUE: "C" },
  { TEXT: "Item Wise (Sales)", VALUE: "I" },
  { TEXT: "Challan Wise (Return)", VALUE: "RS" },
  { TEXT: "Customer Wise (Return)", VALUE: "RC" },
  { TEXT: "Item Wise (Return)", VALUE: "RI" },
];
let companyType = [
  { VALUE: null, TEXT: "All" },
  { VALUE: 1, TEXT: "Internal" },
  { VALUE: 2, TEXT: "Extarnal" },
];
let gatePassType = [
  { VALUE: null, TEXT: "All" },
  { VALUE: 2, TEXT: "Returnable" },
  { VALUE: 1, TEXT: "Non Returnable" },
];

let loanReportType = [
 
  { VALUE: "D", TEXT: "Loan Order Preview" },
  { VALUE: "E", TEXT: "Loan Oder" },
];
let paymentCompleteStatus = [
  { VALUE: null, TEXT: "All" },
  { VALUE: 2, TEXT: "Pending" },
  { VALUE: 1, TEXT: "Complete" },
];
let paymentStatusPaySalary = [
  { VALUE: 1, TEXT: "Paid" },
  { VALUE: 0, TEXT: "Unpaid" },
  { VALUE: null, TEXT: "All" },
];
let paymentStatusPaySalary1 = [
  { VALUE: 1, TEXT: "Paid" },
  { VALUE: 0, TEXT: "Unpaid" },
];
let employeeSalaryStatus = [
  { VALUE: 1, TEXT: "With Pay" },
  { VALUE: 0, TEXT: "Without Pay" },
  { VALUE: null, TEXT: "All" },
];
let employeeSalaryStatus1 = [
  { VALUE: 1, TEXT: "With Pay" },
  { VALUE: 0, TEXT: "Without Pay" },
];
let reportTitleForPaySalary = [
  { VALUE: "11.69x8.27", TEXT: "A4" },
  { VALUE: "14x8.5", TEXT: "Legal" },
  { VALUE: "11x8.5", TEXT: "Letter" },
  { VALUE: "14x11", TEXT: "Fanfold(14x11)" },
  { VALUE: "15x8.5", TEXT: "Width '15' x Height '8.5'" },
  { VALUE: "16x8.5", TEXT: "Width '16' x Height '8.5'" },
  { VALUE: "17x8.5", TEXT: "Width '17' x Height '8.5'" },
  { VALUE: "10.5x8.27", TEXT: "'10.5x8.27'" },
];
let testReportPriceType = [
  { VALUE: "SL_2891", TEXT: "Local Price" },
  { VALUE: "SL_2892", TEXT: "Import Price" },
];
let salesReportType = [
  { VALUE: "SL_2831", TEXT: "Sales" },
  { VALUE: "SL_2833", TEXT: "Collection" },
  { VALUE: "SL_2832", TEXT: "Total Internal Sales Report" },
  { VALUE: "SL_2837", TEXT: "Total Local Sales Report" },
  { VALUE: "SL_2834", TEXT: "Net Cash Sales Report" },
  { VALUE: "SL_2835", TEXT: "Net Loan Sales Report" },
  { VALUE: "SL_2836", TEXT: "Net Credit Sales Report" },
];
let loanReqType = [
  { VALUE: null, TEXT: "ALL" },
  { VALUE: "LR", TEXT: "LOAN Receive" },
  { VALUE: "LI", TEXT: "Loan Issue" },
];
let activeStatusThree = [
  { VALUE: null, TEXT: "All" },
  { VALUE: 0, TEXT: "Active" },
  { VALUE: 1, TEXT: "Cancelled" },
];
let processedStatus = [
  { VALUE: "P", TEXT: "Processed" },
  { VALUE: "V", TEXT: "Void" },
];
let paymentType = [
  { VALUE: "L", TEXT: "Lc at Sight" },
  { VALUE: "D", TEXT: "Deffered LC" },
  { VALUE: "T", TEXT: "T/T" },
  { VALUE: "U", TEXT: "UPAS" },
];
let inPaymentType = [
  { VALUE: "CH", TEXT: "Cash" },
  { VALUE: "LC", TEXT: "LC" },
  { VALUE: "CR", TEXT: "Credit Sale" },
  { VALUE: "LN", TEXT: "Loan Sale" },
  { VALUE: "GT", TEXT: "Gift" },
  { VALUE: "BL", TEXT: "Bill" },
  { VALUE: "W", TEXT: "Without Type" },
];
let stockTypeList = [
  { VALUE: "1", TEXT: "Inventory Valuation Summary" },
  { VALUE: "2", TEXT: "Inventory Stock Status" },
];
let pendingLcDateOptions = [
  { VALUE: "F", TEXT: "Fixed Date" },
  { VALUE: "P", TEXT: "Periodical" },
];

let marketingSalesReportType = [
  { VALUE: "SL_2191", TEXT: "Sales And Collection Report" },
  { VALUE: "SL_2193", TEXT: "Sales Report Without Loan" },
  { VALUE: "SL_2192", TEXT: "Item Sales (Without Inter com)" },
  { VALUE: "SL_2197", TEXT: "Item Sales ( Inter company)" },
  { VALUE: "SL_2196", TEXT: "Loan Report" },
  { VALUE: "SL_2198", TEXT: "Detail Marketing Report" },
  { VALUE: "SL_21911", TEXT: "Customer Wise Sale" },
];
let receivableLedgerReportType = [
  { VALUE: "SL_2041", TEXT: "Receivable Ledger" },
  { VALUE: "SL_2042", TEXT: "Document wise Receivable Ledger" },
];
let yesOrNo = [
  { VALUE: "Y", TEXT: "Yes" },
  { VALUE: "N", TEXT: "No" },
];
let lcListType = [
  { VALUE: null, TEXT: "All" },
  { VALUE: "PI", TEXT: "PI" },
  { VALUE: "IN", TEXT: "Indent" },
];
let lcListReportType = [
  { VALUE: "SL_2681", TEXT: "LC List" },
  { VALUE: "SL_2682", TEXT: "Document Wise Indent" },
  { VALUE: "SL_2683", TEXT: "Summary" },
  { VALUE: "SL_2684", TEXT: "Document Wise Shipment" },
  { VALUE: "SL_2685", TEXT: "Shipment Summary" },
];
let orderTypeList = [
  { VALUE: "PI", TEXT: "PI" },
  { VALUE: "SI", TEXT: "SI" },
  { VALUE: "CI", TEXT: "CI" },
];

let leaveType = [
  { VALUE: "N", TEXT: "Normal" },
  { VALUE: "L", TEXT: "Limit" },
  { VALUE: "C", TEXT: "Carry Forward" },
  { VALUE: "V", TEXT: "Advancve" },
];
let priority = [
  { VALUE: "", TEXT: "Select" },
  { VALUE: "H", TEXT: "Higher" },
  { VALUE: "L", TEXT: "Lower" },
];
let reqPriority = [
  { VALUE: 1, TEXT: "Normal" },
  { VALUE: 2, TEXT: "Urgent" },
  { VALUE: 3, TEXT: "Fire Urgent" },
];
let behavior = [
  { VALUE: "", TEXT: "Select" },
  { VALUE: "A", TEXT: "Advance" },
  { VALUE: "L", TEXT: "Loan" },
];
let dayMonth = [
  { VALUE: "", TEXT: "Select" },
  { VALUE: "D", TEXT: "Day" },
  { VALUE: "M", TEXT: "Month" },
];
let contributionType = [
  { VALUE: "", TEXT: "Select" },
  { VALUE: "O", TEXT: "Own" },
  { VALUE: "C", TEXT: "Company" },
];
let dayStatusList = [
  { VALUE: "", TEXT: "Select" },
  { VALUE: "N", TEXT: "Work Day" },
  { VALUE: "W", TEXT: "Weekend" },
  { VALUE: "H", TEXT: "Holiday" },
];
let reportList = [
  { TEXT: "Delivery Chalan", VALUE: "1" },
  { TEXT: "Packing List", VALUE: "2" },
  { TEXT: "Gate Pass", VALUE: "3" },
];

let reportListForIn1089 = [
  { TEXT: "Delivery Chalan", VALUE: "D" },
  { TEXT: "Gate Pass", VALUE: "G" },
  { TEXT: "Report Preview", VALUE: "P" },
];
let overTimeOnPer = [
  { VALUE: "1", TEXT: "Payroll Gross" },
  { VALUE: "2", TEXT: "Payroll Basic" },
  { VALUE: "G", TEXT: "Earning Gross" },
  { VALUE: "B", TEXT: "Earning Basic" },
];
let dayMinuteList = [
  { VALUE: "D", TEXT: "Day" },
  { VALUE: "M", TEXT: "Minuit" },
];
let perOnStatusLarge = [
  { VALUE: null, TEXT: "Select" },
  { VALUE: "G", TEXT: "Gross" },
  { VALUE: "B", TEXT: "Basic" },
  { VALUE: "P", TEXT: "Piece & Present" },
  { VALUE: "W", TEXT: "Piece & Workda" },
];
let perOnStatus = [
  { VALUE: "2", TEXT: "Payroll Basic" },
  { VALUE: "1", TEXT: "Payroll Gross" },
  { VALUE: "B", TEXT: "Basic" },
  { VALUE: "G", TEXT: "Gross" },
];
let baseOn = [
  { VALUE: null, TEXT: "Select" },
  { VALUE: 1, TEXT: "Employee Age" },
  { VALUE: 2, TEXT: "Service Age" },
  { VALUE: 3, TEXT: "Gross Salary" },
];
let payrollStatus2 = [
  { VALUE: null, TEXT: "Select" },
  { VALUE: "B", TEXT: "Payroll Basic" },
  { VALUE: "G", TEXT: "Payroll Gross" },
];
let monitoringDetail = [
  { VALUE: "D", TEXT: "Day" },
  { VALUE: "M", TEXT: "Month wise" },
];
let monitoringFor = [
  { VALUE: null, TEXT: "All Employee" },
  { VALUE: 1, TEXT: "Active" },
  { VALUE: 0, TEXT: "Inactive" },
];
let monitoringSubordinate = [
  { VALUE: 1, TEXT: "Immediate" },
  { VALUE: 0, TEXT: "All" },
];
let movementPurpose = [
  { VALUE: "O", TEXT: "Office" },
  { VALUE: "P", TEXT: "Personal" },
];
let importLcReportFormet = [
  { VALUE: 1, TEXT: "Format 1" },
  { VALUE: 2, TEXT: "Format 2" },
  { VALUE: 3, TEXT: "Format 3" },
];
let lcPaymentType = [
  { VALUE: "S", TEXT: "LC at Sight" },
  { VALUE: "D", TEXT: "Deffered LC" },
  { VALUE: "A", TEXT: "Advance L/C" },
  { VALUE: "U", TEXT: "UPAS" },
];
let lcTenureOn = [
  { VALUE: "BA", TEXT: "Bank Acceptance Date" },
  { VALUE: "OA", TEXT: "Acceptance Date" },
  { VALUE: "BL", TEXT: "BL Date" },
];
let invAttachedDocType = [{ VALUE: "BD", TEXT: "Bank Document" }];
let drCrList = [
  { VALUE: "Dr", TEXT: "DR" },
  { VALUE: "Cr", TEXT: "CR" },
];
let unapproveStatus = [
  { VALUE: null, TEXT: "All" },
  { VALUE: 1, TEXT: "Approved" },
  { VALUE: 2, TEXT: "Unapprove" },
];
let commercialInvoiceStatus = [
  { VALUE: null, TEXT: "All" },
  { VALUE: 2, TEXT: "Exfact" },
  { VALUE: 3, TEXT: "Doc Submit" },
  { VALUE: 4, TEXT: "Payment" },
  { VALUE: 5, TEXT: "Realized" },
  { VALUE: 6, TEXT: "Increment" },
];

let invoiceDate = [
  { VALUE: "I", TEXT: "Invoice Date" },
  { VALUE: "E", TEXT: "Exfactory Date" },
];
let deliveryOrderType = [
  { TEXT: "Summary", VALUE: "S" },
  { TEXT: "Customer Wise Summary", VALUE: "C" },
  { TEXT: "Customer wise Detail", VALUE: "L" },
  { TEXT: "Item wise", VALUE: "I" },
  { TEXT: "Form", VALUE: "D" },
  { TEXT: "Item wise delivery status", VALUE: "T" },
  { TEXT: "Compensation", VALUE: "CO" },
  { TEXT: "Compensation(Summary)", VALUE: "CS" },
];
let salesOrderType = [
  { VALUE: "RT", TEXT: "Return List" },
  { VALUE: "RTD", TEXT: "Return Details" },
];

let salesInvoiceType = [
  { VALUE: "IL", TEXT: "Invoice List" },
  { VALUE: "ID", TEXT: "Invoice Details" },
  { VALUE: "IT", TEXT: "Invoice Transaction Summary" },
  { VALUE: "IC", TEXT: "Invoice Details with Collection" },
  { VALUE: "IS", TEXT: "Invoice Wise Sales Statement" },
];

let salesDocumentType = [
  { VALUE: "L", TEXT: "L/C List" },
  { VALUE: "D", TEXT: "L/C Details" },
  { VALUE: "S", TEXT: "Sales Person" },
  { VALUE: "T", TEXT: "Customer Wise" },
  { VALUE: "TB", TEXT: "Buyer Wise" },
];

let salesType = [
  { VALUE: 0, TEXT: "External Sales" },
  { VALUE: 1, TEXT: "Internal Sales" },
  
];

let DataType = [
  { VALUE: 0, TEXT: "Textile" },
  { VALUE: 1, TEXT: "Garments" },
  
];

let UdType = [
  { VALUE: 1, TEXT: "UD Received" },
  { VALUE: 0, TEXT: "UD Not Received" },
  
];

let DocumentReportType = [
  { VALUE: "D", TEXT: "Document (Default)" },
  { VALUE:"S", TEXT: "Doc. Wise" },
  { VALUE:"L", TEXT: "LC Position" },
  { VALUE:"P", TEXT: "Payment Follow Up" },
  
];
let DocumentStatus = [
  { VALUE: "Unrealized", TEXT: "Unrealized" },
  { VALUE:"Negotiated", TEXT: "Negotiated" },
  { VALUE:"BankSubmitted", TEXT: "Bank Submitted" },
  { VALUE:"PartyAccepted", TEXT: "Party Accepted" },
  { VALUE:"PartySubmitted", TEXT: "Party Submitted" },
  { VALUE:"Initialized", TEXT: "Initialized" },
  { VALUE:"Realized", TEXT: "Realized" },
  { VALUE:"Paymentreceived", TEXT: "Payment received" },
  
];

let effectType = [
  { VALUE: 'F', TEXT: "Formula" },
  { VALUE: 'S', TEXT: "Fixed" },
  { VALUE: 'R', TEXT: "Rest Of formula" },
  { VALUE: 'P', TEXT: "Piece Rate" }
];
let factoryType = [
  { VALUE: 'M', TEXT: "Multiple Factor" },
  { VALUE: 'D', TEXT: "Division Factor" },
  { VALUE: null, TEXT: "Both" } 
];

let documentDdeliveryType = [
  { VALUE: 1, TEXT: "With Delivery" },
  { VALUE: 0, TEXT: "Without Delivery" },
  
];


let formatType = [
  
  { VALUE: 1, TEXT: "FORMAT 1" },
  { VALUE: 2, TEXT: "FORMAT 2" },
];

let formatTypeApproval = [
  
  { VALUE: 1, TEXT: "FORMAT 1" },
  { VALUE: 2, TEXT: "FORMAT 2" },
  { VALUE: 3, TEXT: "FORMAT 3" },
  { VALUE: 4, TEXT: "FORMAT 4" },
  { VALUE: 5, TEXT: "FORMAT 5" },
  { VALUE: 6, TEXT: "FORMAT 6" },
  { VALUE: 7, TEXT: "FORMAT 7" },
];

let hourList = [
  { VALUE: "FD", TEXT: "Full Day Leave" },
  { VALUE: "HD", TEXT: "Half Day Leave" },

];

let empStatus = [
  { VALUE: 1, TEXT: "Active"},
  { VALUE: 0, TEXT: "Inactive"},
];
let attnStatus = [
  { VALUE: 'L', TEXT: "Late"},
  { VALUE: 'E', TEXT: "Early"},
  { VALUE: 'G', TEXT: "Gate Pass"},
];

let appvStatus = [
  { VALUE: 1, TEXT: "Approved" },
  { VALUE: 0, TEXT: "Pending" },
];
let itemQualityList = [
  { VALUE: 'Good', TEXT: "Good" },
  { VALUE: 'Damage', TEXT: "Damage" },
  { VALUE: 'Broken', TEXT: "Broken" }
];

let issueType = [
  { VALUE: 'N', TEXT: "None" },
  { VALUE: 'F', TEXT: "Use Batch as FIFO" },
  { VALUE: 'L', TEXT: "Use Batch as LIFO" },
  { VALUE: 'E', TEXT: "Use Batch as FEFO" },
  { VALUE: 'I', TEXT: "Use Intact, FIFO" }
];
let hazardStatus = [
  { VALUE: 1, TEXT: "Yes" },
  { VALUE: 0, TEXT: "No" },
];
let yarnType = [
  { VALUE: 'E', TEXT: "English" },
  { VALUE: 'D', TEXT: "Denier" },
];
let invMethodType = [
  { VALUE: 'F', TEXT: "FIFO" },
  { VALUE: 'L', TEXT: "LIFO" },
  { VALUE: 'W', TEXT: "WA" },
  { VALUE: 'B', TEXT: "BATCH" },
  { VALUE: 'D', TEXT: "@ O Rate" },
];

let issueTypeForItem = [
  { VALUE: 'R', TEXT: "Issue as Revenue Item" },
  { VALUE: 'C', TEXT: " Issue as Capital Item" }
];



export const fixedValues: any = {
  issueTypeForItem: issueTypeForItem,
  invMethodType: invMethodType,
  yarnType: yarnType,
  hazardStatus: hazardStatus,
  issueType: issueType,
  empStatus: empStatus,
  attnStatus: attnStatus,
  appvStatus: appvStatus,
  itemQualityList: itemQualityList,
  drCrList: drCrList,
 
  invAttachedDocType: invAttachedDocType,
  applyOn: applyOn,
  invoiceCategory: invoiceCategory,
  recieveLoanAmt: recieveLoanAmt,
  paymentFrequency: paymentFrequency,
  recieveStatusLoan: recieveStatusLoan,
  recieveStatus1: recieveStatus1,
  dateStatus: dateStatus,
  moneyReqStatus: moneyReqStatus,
  
  sqlState: sqlState,
  taskType: taskType,
  checkFlag: checkFlag,
  queryOptions: queryOptions,
  voucherType: voucherType,
  transactionType: transactionType,
  accountType: accountType,
  coaIndentificationType: coaIndentificationType,
  coaDisplayType: coaDisplayType,
  postingStatus: postingStatus,
  voucherModeType: voucherModeType,
  generationType: generationType,
  indentificationAccountType: indentificationAccountType,
  integratedModuleType: integratedModuleType,
  confirmedType: confirmedType,
  nameCodeStyleType: nameCodeStyleType,
  balanceType: balanceType,
  postStatusType: postStatusType,
  postingStatusType: postingStatusType,
  printTypeList: printTypeList,
  postStatusType1: postStatusType1,
  ccBaType: ccBaType,
  allocateCostCenters: allocateCostCenters,
  inventoryTypes: inventoryTypes,
  reportOptionList: reportOptionList,
  reportFormat: reportFormat,
  activeType: activeType,
  filterOptionType: filterOptionType,
  settlementType: settlementType,
  budgetModeType: budgetModeType,
  reportOptionTypeList: reportOptionTypeList,
  reportCategoryTypeList: reportCategoryTypeList,
  reportTypeList: reportTypeList,
  dayBookreportTypeList: dayBookreportTypeList,
  status: status,
  dateType: dateType,
  billStatus: billStatus,
  salesInvoiceDateType: salesInvoiceDateType,
  fromOrderInvoice: fromOrderInvoice,  
  billStatus1: billStatus1,
  salesNegotiationType: salesNegotiationType,
  salesRealizationType: salesRealizationType,
  billRegisterType: billRegisterType,
  saleReturnType: saleReturnType,
  issueReportType: issueReportType,  
  dcdoDate: dcdoDate,
  lcType: lcType,
  moneyReqStatus01: moneyReqStatus01,
  duration: duration,
  acceptedType: acceptedType,
  acceptType: acceptType,
  paymentStatus: paymentStatus,
  probisionData: probisionData,
  bblcDateType: bblcDateType,
  auditStatus: auditStatus,
  billType: billType,
  inBillTypes: inBillTypes,
  billTypeStatus: billTypeStatus,
  purchaseBillTypes: purchaseBillTypes,
  purchaseBillTypes1: purchaseBillTypes1,
  auditStatusBillPayment: auditStatusBillPayment,
  lcType2: lcType2,
  postStatus: postStatus,
  invoiceType: invoiceType,
  invoiceType1: invoiceType1,
  deliveryType: deliveryType,
  deliveryTypeOne: deliveryTypeOne,
  promotionTypeStatusSingle: promotionTypeStatusSingle,
  invoiceStatus: invoiceStatus,
  transactionStatus: transactionStatus,
  voucherType2: voucherType2,
  transactionTypeUpperCase: transactionTypeUpperCase,
  transferType: transferType,
  transferStatus: transferStatus,
  loanType: loanType,
  orderType: orderType,
  inventoryMethos : inventoryMethos,
  orderType1: orderType1,
  referenceStatus: referenceStatus,
  lcBasis: lcBasis,
  quantityUnitType: quantityUnitType,
  quantityUnitTypeTwo: quantityUnitTypeTwo,
  dobProvedBy: dobProvedBy,
  maritialStatus: maritialStatus,
  activeStatus: activeStatus,
  activeStatusList: activeStatusList,
  activeStatusListHr1016: activeStatusListHr1016,
  
  missingStatusList: missingStatusList,  
  adjustWithList: adjustWithList,  
  adjustTypeList: adjustTypeList,  
  
  
  activeStatusTwo: activeStatusTwo,
  requisitionStatus: requisitionStatus,
  imageFormateList: imageFormateList,
  cardGenaratorType: cardGenaratorType,
  applicationNameFormate: applicationNameFormate,
  bainaryType: bainaryType,
  prefixSuffix: prefixSuffix,
  userPermissionType: userPermissionType,
  genderStatus: genderStatus,
  offDayStatyus: offDayStatyus,
  languageProfieancyStatus: languageProfieancyStatus,
  reportFormatFourStyle: reportFormatFourStyle,
  yearStatus: yearStatus,
  monthStatus: monthStatus,
  status1: status1,
  rbType: rbType,
  shipmentMode: shipmentMode,
  shipmentMode2: shipmentMode2,
  approvalStatus: approvalStatus,
  approvalStatus1: approvalStatus1,
  dateTypeStatus: dateTypeStatus,
  workOrderStatus: workOrderStatus,
  workOrderStatus1: workOrderStatus1,
  currectionTypeList: currectionTypeList,  
  workOrderStatusSl: workOrderStatusSl,
  recieveStatus: recieveStatus,
  salaryOperator: salaryOperator,
  paymentMood: paymentMood,
  transferTypeStatus: transferTypeStatus,
  transferTypeStatus01: transferTypeStatus01,
  payrollStatus: payrollStatus,
  supplierCategoryList: supplierCategoryList,
  clStatusList: clStatusList,
  docStatusList: docStatusList,
  carbonList: carbonList,
  reportFormatList: reportFormatList,
  reportFormatListOne: reportFormatListOne,
  shiftWiseList: shiftWiseList,
  statisticsType: statisticsType,
  perChantageList: perChantageList,
  dicsType: dicsType,
  dicsOn: dicsOn,
  imageHolderList: imageHolderList,
  lcReqList: lcReqList,
  lcReqList1: lcReqList1,
  itemDestType: itemDestType,
  payrollStatus1: payrollStatus1,
  purchaseTypeList: purchaseTypeList,
  manPowerStatus: manPowerStatus,
  applicationType: applicationType,
  otStatus: otStatus,
  workOrderStatusTwo: workOrderStatusTwo,
  salesReportSatus: salesReportSatus,
  printCopyFormat: printCopyFormat,
  referenceList: referenceList,
  loanRegStatus: loanRegStatus,
  purchaseOrderTypeList: purchaseOrderTypeList,
  purchaseOrderStatusList: purchaseOrderStatusList,
  purchaseRequisitionTypeList: purchaseRequisitionTypeList,
  purchaseRequisitionStatusList: purchaseRequisitionStatusList,
  purchaseTransactionSummaryList: purchaseTransactionSummaryList,
  budgetTypeList: budgetTypeList,
  financialStatementType: financialStatementType,
  isBudgetList: isBudgetList,
  csReprotTypeList: csReprotTypeList,
  salePaymentType : salePaymentType,
  reqPaymentType: reqPaymentType,
  
  bankTypeList: bankTypeList,
  importReportTypeList: importReportTypeList,
  purchaseAnalysisTypeList: purchaseAnalysisTypeList,
  importLeaveTypeList: importLeaveTypeList,
  attendaceList: attendaceList,
  genderList: genderList,
  maturityType: maturityType,
  summeryTypeList: summeryTypeList,
  reportEmpList: reportEmpList,
  importLcReportTypeList: importLcReportTypeList,
  documentWisePurchaseStatementType: documentWisePurchaseStatementType,
  printCopyFormat2: printCopyFormat2,
  reportTypeListOne: reportTypeListOne,
  handoverTransportType: handoverTransportType,
  acceptedType2: acceptedType2,
  reqStatus: reqStatus,
  procurementStaus: procurementStaus,
  reportSizeList: reportSizeList,
  salaryTypeList: salaryTypeList,
  statementList: statementList,
  statementList1: statementList1,
  transactionAction: transactionAction,
  statementForList: statementForList,
  incrementSuggestionReportFormetType: incrementSuggestionReportFormetType,
  reportFormatListTwo: reportFormatListTwo,
  reportFormatListThree: reportFormatListThree,
  incrementSuggestionReportCheckType: incrementSuggestionReportCheckType,
  incrementSuggestionActiveStatus: incrementSuggestionActiveStatus,
  earnLeavePaymentReportFormat: earnLeavePaymentReportFormat,
  salesInvoiceReportFormat:earnLeavePaymentReportFormat,
  earnLeavePaymentReportType: earnLeavePaymentReportType,
  dailyStatusList: dailyStatusList,
  activeStatusCom: activeStatusCom,
  activeStatusCom1: activeStatusCom1,
  employeeWiseAttendaceReportFormetDefault: employeeWiseAttendaceReportFormetDefault,
  employeeWiseAttendaceReportFormetSummary: employeeWiseAttendaceReportFormetSummary,
  employeeWiseAttendaceType: employeeWiseAttendaceType,
  employeeWiseAttendaceReportType: employeeWiseAttendaceReportType,
  conditionStatus: conditionStatus,
  conditionRosterStatus: conditionRosterStatus,
  calOn: calOn,
  formulaOn: formulaOn,
  typeList: typeList,
  calDayType: calDayType,
  lateDayType: lateDayType,
  moduleList: moduleList,
  paymentBy: paymentBy,
  paymentBy1: paymentBy1,
  policyStatus:policyStatus,
  policyStatus01:policyStatus01,
  searchArea: searchArea,
  reportFormatListForAllowance: reportFormatListForAllowance,
  dailyOrMonthly: dailyOrMonthly,
  calNoOption: calNoOption,
  durationYear: durationYear,
  durationMonth: durationMonth,
  durationDay: durationDay,
  durationYearOperator: durationYearOperator,
  durationMonthOperator: durationMonthOperator,
  durationDayOperator: durationDayOperator,
  imageShowList: imageShowList,
  approveStatus: approveStatus,
  statementListOne: statementListOne,
  grossStatus: grossStatus,
  adjustType: adjustType,
  adjustWith: adjustWith,
  salPayMood: salPayMood,
  employeeListReport: employeeListReport,
  employeeListReportOne: employeeListReportOne,
  EmployeeStatusList: EmployeeStatusList,
  paymentMode: paymentMode,
  paymentMode1: paymentMode1,
  departmentList: departmentList,
  salaryType: salaryType,
  overTimeRequisitionType: overTimeRequisitionType,
  otType: otType,
  productItem: productItem,
  overTimeRequisitionReportFormat: overTimeRequisitionReportFormat,
  equisitionReportFormat: equisitionReportFormat,
  issueAs:issueAs,
  purposeTypeList: purposeTypeList,
  purposeTypeList1: purposeTypeList1,
  absentConterList: absentConterList,
  absentConterList1: absentConterList1,
  currectionType: currectionType,
  leaveRegisterHistoryReportType: leaveRegisterHistoryReportType,
  activeStatusLeaveRegisterHistory: activeStatusLeaveRegisterHistory,
  activeStatusLeaveRegisterHistory1: activeStatusLeaveRegisterHistory1,
  trainingStatus: trainingStatus,
  finalSettlementStatementReportType: finalSettlementStatementReportType,
  billPaymentReportType: billPaymentReportType,
  billPaymentPayableStatus: billPaymentPayableStatus,
  reportTypeListTwo: reportTypeListTwo,
  earningStatusList: earningStatusList,
  reportFormatFourStyleOne: reportFormatFourStyleOne,
  reportFormatFourStyleOne1: reportFormatFourStyleOne1,
  overtimeRateList: overtimeRateList,
  previewDataForList: previewDataForList,
  manPowerStatusTypeList: manPowerStatusTypeList,
  manPowerStatusTypeList1: manPowerStatusTypeList1,
  loanHistoryReportType: loanHistoryReportType,
  behaviorList: behaviorList,
  attendanceBonusReportType: attendanceBonusReportType,
  companyType: companyType,
  gatePassType: gatePassType,
  loanReportType: loanReportType,
  paymentCompleteStatus: paymentCompleteStatus,
  paymentStatusPaySalary: paymentStatusPaySalary,
  paymentStatusPaySalary1: paymentStatusPaySalary1,
  employeeSalaryStatus: employeeSalaryStatus,
  employeeSalaryStatus1: employeeSalaryStatus1,
  reportTitleForPaySalary: reportTitleForPaySalary,
  testReportPriceType: testReportPriceType,
  salesReportType: salesReportType,
  stockTypeList: stockTypeList,
  pendingLcDateOptions: pendingLcDateOptions,
  marketingSalesReportType: marketingSalesReportType,
  receivableLedgerReportType: receivableLedgerReportType,
  yesOrNo: yesOrNo,
  itemSerialList: itemSerialList,
  inventoryType: inventoryType,
  stockCategory: stockCategory,
  activeStatusThree: activeStatusThree,
  processedStatus: processedStatus,
  paymentType: paymentType,
  salesTransactionType: salesTransactionType,
  transactionActionPur: transactionActionPur,
  transactionActionSl: transactionActionSl,
  lcListType: lcListType,
  lcListReportType: lcListReportType,
  requisitionHistoryStatus: requisitionHistoryStatus,
  amountStatus: amountStatus,
  leaveType: leaveType,
  loanReqType: loanReqType,
  loanTransactionType: loanTransactionType,
  itemMovementType: itemMovementType,
  inPaymentType: inPaymentType,
  weekStatus: weekStatus,
  intervalStats: intervalStats,
  secoundRoundingStatus: secoundRoundingStatus,
  manpowerStrengthReqApprovalStatusList: manpowerStrengthReqApprovalStatusList,
  overTimeRequisitionReportFormat2: overTimeRequisitionReportFormat2,
  statusTwo: statusTwo,
  reportListForIn1089: reportListForIn1089,
  offDayStatus: offDayStatus,
  statusThree: statusThree,
  tranDate: tranDate,
  tiffinType: tiffinType,
  behaviourStatus: behaviourStatus,
  transactionRelatedTo : transactionRelatedTo,
  transactionRelatedToSl: transactionRelatedToSl,
  otherType: otherType,
  taxBehavior: taxBehavior,
  recurring: recurring,
  percentOn: percentOn,
  gradeStatus: gradeStatus,
  promotionTypeStatus: promotionTypeStatus,
  promotionPayrollStatus: promotionPayrollStatus,
  ActualIncrNoList: ActualIncrNoList,
  transferTypeStatus1: transferTypeStatus1,
  overTimeReqStatusList: overTimeReqStatusList,
  genderStatus2: genderStatus2,
  priority: priority,
  reqPriority: reqPriority,
  behavior: behavior,
  dayMonth: dayMonth,
  activeType1: activeType1,
  contributionType: contributionType,
  dayStatusList: dayStatusList,
  overTimeOnPer: overTimeOnPer,
  dayMinuteList: dayMinuteList,
  perOnStatusLarge: perOnStatusLarge,
  baseOn: baseOn,
  payrollStatus2: payrollStatus2,
  monitoringDetail: monitoringDetail,
  monitoringFor: monitoringFor,
  monitoringSubordinate: monitoringSubordinate,
  compateWithList: compateWithList,
  reportTypeApplicant: reportTypeApplicant,  
  movementPurpose: movementPurpose,
  importLcReportFormet: importLcReportFormet,
  lcPaymentType: lcPaymentType,
  lcTenureOn: lcTenureOn,
  perOnStatus: perOnStatus,
  loanStatus: loanStatus,
  preferred: preferred,
  genderList3: genderList3,
  orderTypeList: orderTypeList,
  activeStatusCurrentMonth: activeStatusCurrentMonth,
  reportList: reportList,
  postedStatus: postedStatus,
  purchaseBillTypes2: purchaseBillTypes2,
  shipType: shipType,
  carierType: carierType,
  acceptanceType: acceptanceType,
  postStatusTypeNumber: postStatusTypeNumber,
  inReportFormat: inReportFormat,
  serviceType: serviceType,
  POStatus: POStatus,
  discountType: discountType,
  profomaInvoiceType: profomaInvoiceType,
  delModeStatus: delModeStatus,
  session: session,
  billStatus2: billStatus2,
  lcTypeThree: lcTypeThree,
  sourceStatus: sourceStatus,
  rcvStatus: rcvStatus,
  itemQualityStatus: itemQualityStatus,
  reportTypeListThree: reportTypeListThree,
  reportCategory: reportCategory,
  reportEarnLeavePayment: reportEarnLeavePayment,  
  valueTipe: valueTipe,
  shipmentEntryStatus: shipmentEntryStatus,
  shipmentEntryReportType: shipmentEntryReportType,
  issueProcess: issueProcess,  
  maintainceType: maintainceType,
  lcStatus: lcStatus,
  reportTitleForSalaryStatement: reportTitleForSalaryStatement,
  purchaseBillType2: purchaseBillType2,
  billReport: billReport,
  SummeryReportTypeList: SummeryReportTypeList,
  unapproveStatus: unapproveStatus,
  commercialInvoiceStatus: commercialInvoiceStatus,
  invoiceDate: invoiceDate,
  shipmentMode3: shipmentMode3,
  deliveryOrderType: deliveryOrderType,
  salesOrderType: salesOrderType,
  salesInvoiceType: salesInvoiceType,
  salesDocumentType: salesDocumentType,
  salesType: salesType,
  DataType: DataType,
  UdType: UdType,
  DocumentReportType: DocumentReportType,
  DocumentStatus: DocumentStatus,
  documentDdeliveryType: documentDdeliveryType,
  effectType: effectType,
  factoryType: factoryType,
  formatType: formatType,
  formatTypeApproval: formatTypeApproval,
  
  hourList: hourList,
  payScheduleStatus: payScheduleStatus,
  
};
