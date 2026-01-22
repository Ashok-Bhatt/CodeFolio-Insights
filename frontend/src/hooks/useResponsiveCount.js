import { useState, useEffect } from 'react';

const useResponsiveCount = (containerRef, itemWidth, gap = 16) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateCount = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                if (width === 0) return;

                const calculated = Math.floor((width + gap) / (itemWidth + gap));
                setCount(Math.max(1, calculated));
            }
        };

        const observer = new ResizeObserver(updateCount);
        observer.observe(containerRef.current);

        updateCount();

        return () => observer.disconnect();
    }, [containerRef, itemWidth, gap]);

    return count;
};

export { useResponsiveCount };
export default useResponsiveCount;
