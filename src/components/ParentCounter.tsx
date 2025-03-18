import React, { useState, useCallback } from 'react';
import Counter from "./Counter";

const ParentCounter : React.FC = () => {

    const [count, setCount] = useState(0);
    const [otherCount, setOtherCount] = useState(0);

    const handleClick = useCallback(
        () => {
             setCount((prev) => (prev + 1))
        }, []);

    const handleOtherClick = () => { setOtherCount((prev) => (prev + 1)) };

    return (
        <>
            <div>
                <p>Count : {count}</p>
                <p>Other Count : {otherCount}</p>
                <button onClick={handleOtherClick}>Parent Click</button>
            </div>
            <Counter onClick={handleClick}/>
        </>
    )
}

export default ParentCounter;