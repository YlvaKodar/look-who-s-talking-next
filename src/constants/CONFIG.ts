export const VARIANTS = {
    women: {
        base: "bg-women-dark border-2 border-women-light text-bglight hover:bg-women-light",
        active: "bg-women-light border-2 border-women-dark text-bglight scale-102",
        text: "text-women-dark",
        border: "border-women-dark",
    },
    nonbinary: {
        base: "bg-nonbinary-dark border-2  border-nonbinary-light text-bglight hover:bg-nonbinary-light",
        active: "bg-nonbinary-light border-2 border-nonbinary-dark text-bglight scale-102",
        text: "text-nonbinary-dark",
        border: "border-nonbinary-dark",
    },
    men: {
        base: "bg-men-dark border-2  border-men-light text-bglight hover:bg-men-light",
        active: "bg-men-light border-2 border-men-dark text-bglight scale-102",
        text: "text-men-dark",
        border: "border-men-dark",
    },
    primary: {
        base: "bg-primary border-2  border-primary text-bglight hover:bg-primary",
        active: "bg-primary scale-102",
        text: "text-foreground-dark",
        border: "border-foreground-dark",
    },
    danger: {
        base: "bg-danger border-2  border-danger text-bglight hover:bg-danger",
        active: "bg-danger scale-102",
        text: "text-danger",
        border: "border-danger",
    },
    alert: {
        base: "bg-alert-dark border-2  border-alert-dark text-bglight hover:bg-alert-dark",
        active: "bg-alert-dark border-2 border-alert-dark text-bglight scale-102",
        text: "text-alert",
        border: "border-alert",
    },
    example: {
        base: "bg-example-dark border-2  border-example-dark text-bglight hover:bg-example-dark",
        active: "bg-example-dark border-2 border-example-dark text-bglight scale-102",
        text: "text-example",
        border: "border-example",
    },
    tip: {
        base: "bg-tip-dark border-2  border-tip-dark text-bglight hover:bg-tip-dark",
        active: "bg-tip-dark border-2 border-tip-dark text-bglight scale-102",
        text: "text-tip",
        border: "border-tip",
    }
};

export const STORAGE = {
    ACTIVE_MEETING: 'activeMeeting',
    SETUP_MEETING_DATA: 'setupMeetingData',
    COLOR_THEME_PREFERENCE: 'userColorTheme'
};
