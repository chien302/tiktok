import { useState, useEffect } from 'react';

const useDebouned = (value, delay) => {
    const [debounedValue, setDebounedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value]);
    return debounedValue;
};

export default useDebouned;
