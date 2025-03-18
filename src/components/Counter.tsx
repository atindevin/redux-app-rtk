import React from 'react';

const Counter = React.memo(({ onClick }) => {

    return <button onClick={onClick}>Click</button>
});

export default Counter;