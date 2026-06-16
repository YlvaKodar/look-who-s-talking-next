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