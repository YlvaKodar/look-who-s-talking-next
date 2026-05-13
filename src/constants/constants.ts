//Temp file based on original JS app
export const CONFIG = {
    THEME: {
        COLORS: {
            PRIMARY: '#281848',
            PRIMARY_HOVER: '#42277c',
            SECONDARY: '#183b48',
            SECONDARY_HOVER: '#296d85',
            TERTIARY: '#2f0402',
            TERTIARY_HOVER: '#690905',
            HEADER_BG: '#a82b05',
            BORDER: '#420407',
            POPUP_BORDER: '#420407',
            POPUP_BUTTON: '#183b48',
            ACTIVE_BORDER: '#2f1848',
            HEADER_FIRST: '#2f0402',
            HEADER_SEC: '#183b48',
            HEADER_THIRD: '#281848',
        },

        // Sizing and dimensions
        SIZING: {
            BODY_MAX_WIDTH: '800px',
            CONTAINER_PADDING: '20px',
            ELEMENT_GAP: '20px',
            BUTTON_PADDING: '10px 20px',
            POPUP_MIN_WIDTH: '250px',
            POPUP_MIN_HEIGHT: '200px',
            CHART_MAX_WIDTH: '400px'
        },

        // Typography
        TYPOGRAPHY: {
            TIMER_FONT_SIZE: '48px',
            POPOUT_TIMER_FONT_SIZE: '28px',
            BUTTON_FONT_SIZE: '16px',
            SPEAKER_BUTTON_FONT_SIZE: '18px',
            POPOUT_FONT_SIZE: '14px'
        },

        // Border styling
        BORDERS: {
            RADIUS: '4px',
            POPUP_RADIUS: '6px',
            ACTIVE_BORDER_WIDTH: '3px'
        },

        // Responsive breakpoints
        BREAKPOINTS: {
            MOBILE: '600px'
        },

        CSS_CLASSES: {
            ACTIVE: 'active',
        },

        POPOUT: {
            PADDING: '15px',
            MAX_WIDTH: '300px',
            HEADING_SCALE: 0.8,
        },

        ALERTS: {
            BG_COLOR: '#ffffff',
            TEXT_COLOR: '#333333',
            OVERLAY_COLOR: 'rgba(0, 0, 0, 0.5)',
            SHADOW: '0 0 10px rgba(0, 0, 0, 0.3)',
            MIN_WIDTH: '300px',
            MAX_WIDTH: '90%',
            PADDING: '20px',
            FONT_SIZE: '16px',
            MARGIN_BOTTOM: '20px',
            OK_BG_COLOR: '#281848',
            OK_HOVER_COLOR: '#42277c',
            CANCEL_BG_COLOR: '#183b48',
            CANCEL_HOVER_COLOR: '#296d85',
            BUTTON_MIN_WIDTH: '80px',
            BUTTON_GAP: '10px',
            BORDER_COLOR: '#281848',
            BORDER_WIDTH: '4px',
            BORDER_STYLE: 'solid',
            Z_INDEX_OVERLAY: 9999,
            Z_INDEX_ALERT: 10000,
        },
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
    menlabel: "Men",
    womenSpeakingButton: 'Woman speaking',
    nonbinarySpeakingButton: 'Nonbinary speaking',
    menSpeakingTime: 'Man speaking',
}
export const StatsText = {
    heading: 'Meeting statistics',
    totalStatementCount: 'Total statement count: ',
    totalSpeakingTime: 'Total speaking time: ',
    participantCount: 'Participants count: ',
    speakingTime: 'Speaking time: ',
    statementCount: 'Statement count: ',
    averageLength: 'Average statement length: ',
    equalTimeShare: "Fair share of speaking time would have been "
}

export const MeetingText = {
    pauseButton: 'Pause timer',
    endButton: 'End meeting',
}

export const MeetingSetupForm = {
    about: "About this meeting:",
    meetingTitleLabel: "Name your meeting:",
    startTimeLabel: "Date and time of the meeting:",
    womenCountLabel: "How many women?",
    nonbinaryCountLabel: "How many nonbinary?",
    menCountLabel: "How many men?",
    submitLabel: "Start the meeting!",
}

export const Validation = {
    meetingTitle: "Your meeting wants a title! Enter 3 to 30 characters.",
    cannotBeNegative: "Can't be fewer than zero. Do a recount!",
    minParticipants: "No meeting without at least 2 meeters. From separate meeting groups.",
}