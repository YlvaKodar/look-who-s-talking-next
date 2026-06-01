//Temp file based on original JS app
export const CONFIG = {
    VARIANTS: {
        women: {
            base: "bg-women-dark border-2 border-women-light text-bglight hover:bg-women-light",
            active: "bg-women-light border-2 border-women-dark text-bglight scale-102"
        },
        nonbinary: {
            base: "bg-nonbinary-dark border-2  border-nonbinary-light text-bglight hover:bg-nonbinary-light",
            active: "bg-nonbinary-light border-2 border-nonbinary-dark text-bglight scale-102"
        },
        men: {
            base: "bg-men-dark border-2  border-men-light text-bglight hover:bg-men-light",
            active: "bg-men-light border-2 border-men-dark text-bglight scale-102"
        }
    }
}

export const STORAGE = {
    ACTIVE_MEETING: 'activeMeeting',
    SETUP_MEETING_DATA: 'setupMeetingData',
    COLOR_THEME_PREFERENCE: 'userColorTheme'
}

// Trans. key prep: will be used in internationalization later.
export const Genders = {
    womenLabel: 'Women',
    nonbinaryLabel: 'Nonbinary',
    menLabel: "Men",
    womenSpeakingButton: 'Woman speaking',
    nonbinarySpeakingButton: 'Nonbinary speaking',
    menSpeakingTime: 'Man speaking',
    chartLabels: {
        women: 'Women',
        nonbinary: 'Nobinary',
        men: 'Men',
    },
    buttonLabels: {
        women: 'Woman speaking',
        nonbinary: 'Nonbinary speaking',
        men: 'Man speaking',
    }
}

export const StatsText = {
    heading: 'Meeting statistics',
    totalStatementCount: 'Total statement count: ',
    totalSpeakingTime: 'Total speaking time: ',
    participantCount: 'Participants: ',
    speakingTime: 'Speaking time: ',
    statementCount: 'Statement count: ',
    averageLength: 'Average statement length ',
    equalTimeShare: "Fair share of speaking time would have been ",
    participantPie: 'Participant distribution',
    speakingtimePie: "Speaking time distribution",
    statementPie: "Statement distribution",
}

export const Common = {
    title: "LOOK WHO'S TALKING!",
    description: "Timing tool for mixed-gender conversations",
    logOut: "Log out",
    logIn: "Sign in",
    signUp: "Sign up",
    greeting: "Meetee ",
    backButton: "Back",
    footer: "YLVA KODAR",
    userName: "Name",
    userNameOther: "Username (if other than email)",
    userEmail: "Email",
    password: "Password",
    repeatPassword: "Repeat password",
    deleteAccount: "Delete account",
    comingSoon: "Coming soon ...",
    yes: "Yes, totally!",
    no: "Not really ...",
}

export const MeetingText = {
    pauseButton: 'Pause timer',
    endButton: 'End meeting',
    headingMeeting: 'Meetings',
    createNewMeeting: 'New meeting',
    myMeetings: 'My meetings',
    goToMeeting: "See meeting",
}

export const SetupText = {
    heading: "Let's set it up!",
    about: "About this meeting:",
    meetingTitleLabel: "Name your meeting:",
    colorSchemeLabel: "Pick a color scheme?",
    schemePreview: "Preview:",
    womenCountLabel: "How many women?",
    nonbinaryCountLabel: "How many nonbinary?",
    menCountLabel: "How many men?",
    submitLabel: "Start the meeting!",
    pickAGroup: "Pick a group?",
    groupTitleLabel: "Meeting group:",
    changeGroup: "Change group",
}

export const StartText = {
    heading: "Look Who's Talking",
    about: "Timing tool for mixed-gender conversations",
    useWithoutLoginHeading: "Start timing ...",
    useWithoutLoginText: "Click \"New meeting\", fill in the meeting details and chose a colour theme. Then use the timer by clicking on the corresponding gender button when somebody starts talking. If there's a silence, click \"pause\". When you're done, you'll see the stats. No account needed!",
    newMeetingButton: "New meeting",
    howToUseButton: "How to use",
    aboutButton: "About",
    loginButton: "Log in",
    signupButton: "Sign up",
    useWithAccountHeading: "... or use with account!",
    useWithAccountText: "With the account, you can create meeting groups and access statistics from past meetings. No costs! Not yet, anyway.",
}

export const DashboardText = {
    heading: "Dashboard",
    headingMeetings: "Meetings",
    headingMe: "Me!",
}

export const GroupText = {
    keeperLabel: "Keeper: ",
    dateLabel: "Created: ",
    meetingsInGroup: "Meetings in this group ",
    clockersInGroup: "Clockers in this group ",
    formHeading: "Create new group!",
    nameLabel: "Name your group",
    descriptionLabel: "Want to add a description?",
    submitLabel: "Make it happen!",
    createNewGroupMeeting: "Create new meeting",
    headingGroups: "Groups",
    myGroups: "My groups",
    keeperGroups: "My keeper groups",
    clockerGroups: "My clocker groups",
    createNewGroup: "New group",
    goToGroup: "Go to group",
    addClockers: "Add clockers",
    searchClockers: "Search by name or email",
    removeClocker: "Remove clocker",
}
export const Validation = {
    meetingTitle: "Your meeting wants a title! Enter 3 to 30 characters.",
    cannotBeNegative: "Can't be fewer than zero. Do a recount!",
    minParticipants: "No meeting without at least 2 meeters. From separate meeting groups.",
    groupName: "Your group needs a name! Enter 3 to 30 characters.",
    groupDescription: "Your group description cannot be over 30 characters.",
}