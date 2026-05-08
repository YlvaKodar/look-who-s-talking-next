"use client"

export function useLocalStorage<T>(key: string) {

    function save(value: T){
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.log(error);
        }
    }

    function load(): T | null {
        try {
            if (typeof window === 'undefined') return null
            const data = localStorage.getItem(key)
            if (data){
                return JSON.parse(data) as T;
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    function clear(){
        localStorage.removeItem(key);
    }

    return { save, clear, load };
}