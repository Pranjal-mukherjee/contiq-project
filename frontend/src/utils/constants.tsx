export const DAYS_OF_WEEK = new Map([
  ["Su", "SUN"],
  ["Mo", "MON"],
  ["Tu", "TUE"],
  ["We", "WED"],
  ["Th", "THU"],
  ["Fr", "FRI"],
  ["Sa", "SAT"],
]);
export const DAY = "day";

export const START_DATE = "Start date";
export const END_DATE = "End date";
export const MOST_RELEVANT = "Most relevant";
export const DRIVE_TEXT = "Closing this window will not interrupt your sync";
export const SYNC_PROGRESS = "Sync in progress";

export const FILE_UPLOAD_TEXT = [
  "Drop your files here",
  "Choose files",
  "Upload file",
];

export const BUTTON_TEXT = ["Add files"];
export const COPY_POPUP_TEXT = "Text Copied";
export const SIDE_BAR_LABELS = [
  "Home",
  "Office",
  "People",
  "Calender",
  "Files",
  "Metrics",
];
export const FILE_TAB = ["All files", "Slides", "Docs"];
export const UPLOAD_TAB = ["Uploads", "Cloud storage"];

export const RADIO_BUTTON_GROUP = [
  {
    id: 1,
    label: "Sync entire drive",
    isChecked: false,
  },
  {
    id: 2,
    label: "Sync folders",
    isChecked: true,
  },
];

export const EMAIL_ID = "Email ID";
export const PLACEHOLDER_TEXT = "john@example.com";

export const SEND = "Send";
export const RESET_PASSWORD = "Reset your password";
export const RESET_PWD_MESSAGE =
  "The verification mail will be sent to the mailbox";
export const RESET_PWD_MESSAGE_NEW_LINE = "please click it.";
export const FOLDER_TITLE = "Add files";

export const SEARCH = "Search";
export const UPLOADING_TEXT = "Uploading 1/1";
export const MODAL_TEXT = [
  "Upload options",
  "already exists in this location. Do you want to replace the existing file with a new version or keep both files?",
  "Contract agreemant.pdf",
];
export const NEW_PWD_HEADING = "Create new password";
export const NEW_PWD_MESSAGE =
  "Enter new password below to change your password";
export const CREATE_NEW_PWD_PLACEHOLDER = "**************";
export const RESET_PWD_BUTTON_TEXT = "Reset Password";
export const NEW_PASSWORD = "New password";
export const CONFIRM_NEW_PASSWORD = "Confirm new password";
export const PASSWORD_NOT_MATCHING = "Passwords dont match";

export const FORM_CONTENT = "Choose the folders to sync with contiq";
export const BACK_BUTTON = "Back";
export const SYNC_BUTTON = "Sync";
export const SEARCH_FILE_LIST = ["Search results", "Other documents"];
export const FILE_DATA = [
  {
    fileId: 10,
    fileName: "contiq.pdf",
    filePath: "/files/contiq.pdf",
    uploadedAt: "2023-10-13",
    fileType: "pdf",
    userId: 1,
    searchTexts: ["", ""],
  },
  {
    fileId: 11,
    fileName: "contiq2.pdf",
    filePath: "/files/contiq2.pdf",
    uploadedAt: "2023-10-14",
    fileType: "pdf",
    userId: 1,
    searchTexts: ["", ""],
  },
];
export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])/;
export const PASSWORD_VALIDATION_MESSAGE =
  "Password must be at least 8 characters and contain 1 uppercase letter, 1 lower case letter, 1 numeric, and 1 special character.";
export const SIGN_IN_HEADING = "Sign In";
export const REMEMBER_ME = "Remember me";
export const FORGOT_PASSWORD = "Forgot password?";
export const NO_ACCOUNT_TEXT = "Doesn’t have an account?";
export const SIGN_UP = "Sign Up";
export const PROFILE = "Profile";
export const SETTINGS = "Settings";
export const LOGOUT = "Logout";
export const EMAIL_LABEL = "Email";
export const PASSWORD_LABEL = "Password";
export const CREATE_ACCOUNT = "Create account";
export const GOOGLE_SIGNIN_TEXT = "Continue with google";
export const SIGN_UP_HEADING = "Sign Up";
export const OR = "OR";
export const EXISTING_SIGNIN_TEXT = "Already have an account?";
export const SIGN_IN = "Sign In";
export const NOTIFICATION_HEADER_TEXT = "Notifications";
export const NAME_PLACEHOLDER = "John Doe";
export const EMAIL_PLACEHOLDER = "john@example.com";
export const PASSWORD_PLACEHOLDER = "Create a password";
export const NAME_LABEL = "Name";
export const NOT_FOUND = "not found image";
export const CLOSE_NOT_FOUND = "not found close image";
export const FILE_TYPE = "File type";
export const PUBLISH_LABEL = "Published by";
export const FILE_ITEM1 = "PDF";
export const FILE_ITEM2 = "PPT";
export const FILE_ITEM3 = "Image";
export const PUBLISH_ITEM1 = "Published by me";
export const PUBLISH_ITEM2 = "Published by Sales team";
export const PUBLISH_ITEM3 = "Published by others";
export const PUBLISH_PLACEHOLDER = "Publish setting";

export const UPLOAD_FILES = "Upload files";

export const FILES_HEADER = "Files";
export const ADD_FILES = "Add files";

export const FILES = [
  {
    id: 1,
    fileName: "Company agreement.pdf",
    fileType: "pdf",
    uploadedAt: "20 June  10:30 AM",
  },
  {
    id: 2,
    fileName: "Company agreement1.pdf",
    fileType: "pdf",
    uploadedAt: "20 June  10:31 AM",
  },
  {
    id: 3,
    fileName: "Company agreement2.pdf",
    fileType: "pdf",
    uploadedAt: "20 June  10:32 AM",
  },
  {
    id: 4,
    fileName: "Company agreement3.pdf",
    fileType: "pdf",
    uploadedAt: "20 June  10:33 AM",
  },
  {
    id: 5,
    fileName: "Company agreement4.pdf",
    fileType: "pdf",
    uploadedAt: "20 June  10:34 AM",
  },
  {
    id: 6,
    fileName: "Company agreement5.pdf",
    fileType: "pdf",
    uploadedAt: "20 June  10:35 AM",
  },
  {
    id: 7,
    fileName: "Company agreement6.pdf",
    fileType: "pdf",
    uploadedAt: "20 June  10:36 AM",
  },
  {
    id: 8,
    fileName: "Company agreement7.pdf",
    fileType: "pdf",
    uploadedAt: "20 June  10:37 AM",
  },
  {
    id: 9,
    fileName: "Company agreement8.pdf",
    fileType: "pdf",
    uploadedAt: "20 June  10:38 AM",
  },
];

export const USERNAME_REGEX = /^[a-zA-Z ]{4,50}$/;

export const UPLOADED_FILES = [
  "GHFPM5613H-2023.pdf",
  "GHFPM5613H-2023.pdf",
  "GHFPM5613H-2023.pdf",
];

export const MIN_ZOOM = 0.1;
export const MAX_ZOOM = 1.5;
export const DEFAULT_ZOOM = 0.85;

export const DUPLICATE_TEXT = "Contract Agreement.pdf";

export const APP_NAME = "CONTIQ";
export const RECENT = "Recent";

export const PASSWORD_RESET = "Password reset";
export const RESET_TEXT = "Your password has been successfully reset.";
export const CLICK_ON_CONTINUE = "Click below to login magically.";
export const NAVIGATE_PDF = "/pdf-view";
export const NAVIGATE_FILES = "/files";

export const NAVIGATE_SIGNIN = "/";
export const NAVIGATE_CREATEPASSWORD = "/create-password";
export const NAVIGATE_RESETPASSWORD = "/reset-password";
export const NAVIGATE_HOME = "/home";
export const NAVIGATE_SIGNUP = "/sign-up";
//commiting to merge changes to deployment branch
export const REDIRECT_URL = "https://fe-bc138.bootcamp64.tk/home";
export const USERNAME_VALIDATION_MESSAGE =
  "Username should only contain alphabets and length should be at least 4";
export const EMAIL_VALIDATION_MESSAGE = "Invalid Email address";
export const SIGN_IN_VALIDATION = "Invalid Username or password !!";
export const SEARCH_CONTENT = [
  "Since being established in 1908 as a sewing machine Repair business, the brother group has pursued the diversification and globalization of business in its history of more",
  "Repair business is",
  "Repair business is ss",
];
export const filePath = "./files/";
export const BACKEND_URL = "https://be-bc138.bootcamp64.tk/api/v1";
export const DRAG_MEDIA_CONTENT = [
  "Drag media here to upload of",
  "connect an account",
];

export const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];
export const SCOPE = "https://www.googleapis.com/auth/drive.metadata.readonly";
