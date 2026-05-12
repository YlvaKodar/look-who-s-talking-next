'use client'
import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer() {
    const [spokenTime, setSpokenTime] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number | null>(null)

    const startTimer = useCallback(() =>  {
        stopTimer()
        startTimeRef.current = Date.now();

        intervalRef.current = setInterval(() => {
            if (!startTimeRef.current) return;
            setSpokenTime((Date.now() - startTimeRef.current) / 1000)
        }, 100)
    }, [])

    const stopTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        startTimeRef.current = null;
    }, [])

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    }, []);

    return { startTimer, stopTimer, spokenTime };
}