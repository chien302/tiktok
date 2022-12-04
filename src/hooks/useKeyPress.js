import { useRef, useEffect } from 'react';

const useKeyPress = (key, cb) => {
    const cbRef = useRef();
    useEffect(() => {
        cbRef.current = cb;
    });

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.code === key) {
                cbRef.current(e);
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [key]);
};

export default useKeyPress;
