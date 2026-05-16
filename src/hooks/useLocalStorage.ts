"use client"
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string) {
    const [storedValue, setStoredValue] = useState<T | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    function save(value: T){
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        try {
            const data = localStorage.getItem(key);
            setStoredValue(data ? JSON.parse(data) as T : null);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoaded(true);
        }
    }, [key]);

    function clear(){
        localStorage.removeItem(key);
    }

    return { save, clear, storedValue, isLoaded };
}