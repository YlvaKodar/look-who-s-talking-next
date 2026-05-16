'use client'
import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer() {
    const [tickingSec, setTickingSec] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number | null>(null)

    const startTimer = useCallback(() =>  {
        startTimeRef.current = Date.now();

        intervalRef.current = setInterval(() => {
            if (!startTimeRef.current) return;
            setTickingSec((Date.now() - startTimeRef.current) / 1000)
        }, 100)
    }, [])

    const stopTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;

        const statementTime = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 0;

        startTimeRef.current = null;
        return statementTime;
    }, [])

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    }, []);

    return { startTimer, stopTimer, tickingSec };
}