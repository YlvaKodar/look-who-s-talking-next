'use client'
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CurrentMeeting } from "@/types/meeting";
import { STORAGE } from "@/constants/constants";

export function useMeetingStorage() {
    const meeting = useLocalStorage<CurrentMeeting>(STORAGE.ACTIVE_MEETING);
    const setup = useLocalStorage<CurrentMeeting>(STORAGE.SETUP_MEETING_DATA);

    const clearAll = () => {
        meeting.clear()
        setup.clear()
    }

    return { meeting, setup, clearAll }
}