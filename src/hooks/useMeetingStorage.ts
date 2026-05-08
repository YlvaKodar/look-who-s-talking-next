'use client'
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ActiveMeeting, Meeting } from "@/types/meeting";
import { STORAGE } from "@/constants/constants";

export function useMeetingStorage() {
    const meeting = useLocalStorage<ActiveMeeting>(STORAGE.ACTIVE_MEETING);
    const setup = useLocalStorage<ActiveMeeting>(STORAGE.SETUP_MEETING_DATA);

    const clearAll = () => {
        meeting.clear()
        setup.clear()
    }

    return { meeting, setup, clearAll }
}