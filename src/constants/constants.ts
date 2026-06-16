

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
    dashboardButton: "Dashboard",
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
    areYouSure: "Are you sure?",
    groupLabel: "Group",
    groupSelector: "Pick a group?",
    dateLabel: "Date",
    keeperLabel: "Keeper",
    clockerLabel: "Clocker",
}

export const MeetingText = {
    pauseButton: 'Pause timer',
    endButton: 'End meeting',
    headingMeeting: 'Meetings',
    createNewMeeting: 'New meeting',
    myMeetings: 'My meetings',
    goToMeeting: "See meeting",
    addGroupButton: 'Add meeting to group',
    addGroupLabel: 'Pick a group for this meeting',
    addGroupInfo: 'If you sort this meeting into an existing group, everybody in that group has access to the meeting data.',
    changeClockerCheckbox: 'Yes, please! Make group keeper new meeting clocker!',
    changeClockerInfo: 'Do you want the group keeper to replace you as meeting clocker? You would no longer be listed as clocker for this meeting.',
    changeClockerButton: 'Switch meeting clocker',
    showMeetingStats: "See meeting statistics",
    showEditMeeting: "Edit meeting",
    deleteMeeting: "Delete meeting",
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

export const HowToUseText = {
    basics: "Basic usage:",
    one: "1. Click “New meeting” and fill in the meeting details",
    oneMore: "Name the meeting and state number of participants per present gender group. Pick a color scheme; be sure to choose a scheme where you can clearly tell the gender colors apart. When you´re done, click \"Start the meeting\".",
    two: "2. Use the timing tool during the meeting.",
    twoMore: "Everytime someone starts speaking, click the corresponding gender button (1 click). If there's a pause in the conversation, click the pause button. When the meeting is over, click the \"End meeting button\". That´s all!",
    example: "Example:",
    twoExample: "A woman starts speaking -> click the \"Woman speaking\" button.\n" +
        "A man starts speaking -> click the \"Man speaking\" button.\n" +
        "Another man starts speaking -> click the \"Man speaking\" button again.\n" +
        "Nobody speaks -> click \"Pause\".\n" +
        "And so on.\n",
    note: "Note:",
    twoNote: "You can see the clock ticking when a gender button is active. (An active gender button is slightly bigger than the other gender buttons.)  The clock will run until a gender button is pressed anew, causing it to start over, or until the meeting is paused or ended.\n" +
        "You DO NOT have to stop the clock manually in between two speakers.\n" +
        "Don't worry if the displayed seconds seem to tick unevenly, it won’t affect the timing.",
    three: "3. See the stats after the meeting",
    threeMore: "The result will be visualized in pie charts. The first pie shows the meeting participants. The next pie shows how the speaking time was distributed amongst the present gender groups. The third pie shows statement distribution; by statements, we mean speaking sessions – one gender button press equals one statement.\n" +
        "You can think of the first pie as your benchmark. If the second or third pie chart differs greatly from the first pie, speaking time or statements have been very unevenly distributed. If all pies look more or less the same, you did good in terms of gender group speaking time equality!\n" +
        "If you want to save the result, you can either create an account before starting a meeting, or take a screen shot of the charts. (Soon you will also have the alternative to save the statistics as a PDF.)"
,
    tip: "Tip:",
    tipMore: "Before you look at the result, you might ask the meeting group to reflect upon the meeting. Does it feel like the time was evenly distributed or not? Are you happy that everybody felt welcome to have their say, without fear of interruptions?",
    lastly: "And one last thing:",
    lastlyMore: "Every meeting is a unique mix of circumstances and personalities. No matter what result you got, keep using the timer for a while, and note if there’s a pattern. And remember: this app is not here to judge you – it is here to visualize one aspect of your conversation patterns and offer you a chance to reflect on it.",

    withAccount: "Use with account:",
    disclaimer: "Please note that this app is still under construction, and that some of these features are not yet in place!",
    withAccountMore: "If you create an account for yourself or your organization, you will be able to create different meeting groups, and save the meeting statistics to see if the speaking patterns in a group change over time.",
    createAccount: "Create an account:",
    createAccountMore: "Use your email to sign up, and add a user name if you want to. (If you choose not to enter a user name, your email will be your user name).\n" +
        "\n" +
        "On the dashboard overview, you will see your groups and meetings. (Click on a heading or a specific group or meeting to see more.)\n",
    groups: "Groups:",
    groupsMore: "When you create a meeting group, you become “keeper” for that group: you can create and access group meetings, edit group details and \n" +
        "add and remove other users as “clockers”. The clockers will be able to create and access meetings within your group.\n",
    groupsNote: "A group must have a keeper; if you want to leave the group or delete your account, you must first make another user group keeper, or delete the group.",
    groupsExample: "You create the group “Office Party Committee”. You want other members in the committee to be able to clock meetings, since you won't always be able to attend. Therefore, you add them as \"clockers\". A few months later, you leave the office, but the rest of the party committee still want to use the group, so you transfer the \"keeper\" status to one of the group clockers.",
    meetings:  "Meetings:",
    meetingsMore: "When you have an account, your meeting data will be saved, so that you can access it later. When you create a new meeting, you will be listed as meeting clocker. If you are keeper or clocker in any meeting groups, you can choose to create the meeting within the group, or to add a past meeting to one of your group.\n" +
        "\n" +
        "If your meeting is added to a group, you will not be able to delete it, since it belongs to all group members.\n",
    meetingNote: "If you are listed as clocker in a meeting or keeper in a group, you cannot delete your account until you have either deleted the meeting or group, or transferred the keeper / klocker status to another group member. \n",
    upcoming:   "Upcoming features",
    upcomingMore: "Soon you will be able to see meeting statistics from group meetings as a graph, in order to see how speaking patterns change over time. \n" +
        "Later updates will also include a notification system for clocker requests etc.\n",
}