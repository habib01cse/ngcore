export class FormParam {

    MENU_NO: number;
    MENU_ID: string;
    // ACTIVE: number;
    CAN_MODIFY: any;
    CAN_CREATE: any;
    CAN_VIEW: any;
    CAN_REMOVE: any;
    DESCR: string;

    TOTAL_ROLE: number;
    JOB_TITLE: string;
    BUSINESS_UNIT: string;
    EMPLOYEE: string;
    FORMS: string;
    REPORTS: string;
    GRAPH: string;
    ROLE_NO: number;
    RADIO_BUTTON_TYPE: any;
    IS_HR_TYPE: boolean;
    HR_TYPE_NO: number;

    IS_JOB_TYPE_NO: boolean;
    IS_JOB_TYPE: boolean;
    IS_LINE_NO: boolean;
    JOBTITLE_NO: number;
    NEW_JOBTITLE: string;
    NEW_JOBTITLE_NO: number;
    JOBTITLE: string;
    JOB_TYPE_NO: any;
    JOB_TYPE: string;
    EMP_TYPE_NO: number;
    INHERITOR: number;
    IS_EMPLOYEE_TYPE: boolean;
    IS_BUSINESS_UNIT: boolean;

    IS_JOBTITLE: boolean;
    IS_LINE: boolean;
    IS_FLOOR: boolean;
    IS_SHIFT: boolean;
    BU_NO: number;
    EMP_NO: number;
    IS_EMPLOYEE: boolean;
    IS_BUSINESS_UNIT_ALL: boolean;
    ACTIVE_STAT: any;
    FORM_ID: string;
    USER_TYPE_NO: number;
    EMP_LIST_TYPE: string;
    PERMANENT: string;
    PRESENT: string;

    SUBMENU_TYPE: string;
    SUBMENU_NAME_USER: string;
    SUBMENU_ID: string;
    SUBMENU_NO: number;
    TOTAL: number;
    constructor(options: any = {}) {
        this.TOTAL_ROLE = options.TOTAL_ROLE || null;
        this.BUSINESS_UNIT = options.BUSINESS_UNIT || '';
        this.DESCR = options.DESCR || '';
        this.JOB_TITLE = options.JOB_TITLE || '';
        this.EMPLOYEE = options.EMPLOYEE || '';
        // this.ACTIVE = options.ACTIVE || null;
        this.MENU_NO = options.MENU_NO || null;
        this.MENU_ID = options.MENU_ID || '';
        this.CAN_VIEW = options.CAN_VIEW || '';
        this.CAN_MODIFY = options.CAN_MODIFY || '';
        this.CAN_CREATE = options.CAN_CREATE || '';
        this.CAN_REMOVE = options.CAN_REMOVE || '';
        this.RADIO_BUTTON_TYPE = options.RADIO_BUTTON_TYPE || '';

        this.ROLE_NO = options.ROLE_NO || null;

        this.INHERITOR = options.INHERITOR || null;
        this.IS_HR_TYPE = options.IS_HR_TYPE || false;
        this.HR_TYPE_NO = options.HR_TYPE_NO || null;
        this.IS_JOB_TYPE_NO = options.IS_JOB_TYPE_NO || false;
        this.IS_JOB_TYPE = options.IS_JOB_TYPE || false;
        this.IS_LINE_NO = options.IS_LINE_NO || false;
        this.JOBTITLE_NO = options.JOBTITLE_NO || null;
        this.NEW_JOBTITLE = options.NEW_JOBTITLE || null;
        this.NEW_JOBTITLE_NO = options.NEW_JOBTITLE_NO || null;
        this.JOBTITLE = options.JOBTITLE || null;
        this.JOB_TYPE_NO = options.JOB_TYPE_NO || null;
        this.JOB_TYPE = options.JOB_TYPE || null;
        this.EMP_TYPE_NO = options.EMP_TYPE_NO || null;
        this.IS_BUSINESS_UNIT = options.IS_BUSINESS_UNIT || false;
        this.IS_EMPLOYEE_TYPE = options.IS_EMPLOYEE_TYPE || false;
        this.BU_NO = options.BU_NO || null;
        this.IS_JOBTITLE = options.IS_JOBTITLE || false;
        this.IS_LINE = options.IS_LINE || false;
        this.IS_FLOOR = options.IS_FLOOR || false;
        this.IS_SHIFT = options.IS_SHIFT || false;
        this.EMP_NO = options.EMP_NO || null;
        this.IS_EMPLOYEE = options.IS_EMPLOYEE || false;
        this.IS_BUSINESS_UNIT_ALL = options.IS_BUSINESS_UNIT_ALL || false;
        this.ACTIVE_STAT = options.ACTIVE_STAT || "";
        this.FORM_ID = options.FORM_ID || "";
        this.USER_TYPE_NO = options.USER_TYPE_NO || null;
        this.EMP_LIST_TYPE = options.EMP_LIST_TYPE || "";
        this.PRESENT = options.PRESENT || '';
        this.PERMANENT = options.PERMANENT || '';
        this.SUBMENU_TYPE = options.SUBMENU_TYPE || '';
        this.SUBMENU_NAME_USER = options.SUBMENU_NAME_USER || '';
        this.SUBMENU_ID = options.SUBMENU_ID || '';
        this.SUBMENU_NO = options.SUBMENU_NO || null;
        this.TOTAL = options.TOTAL || null;



    }
}