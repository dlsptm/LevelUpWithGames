import { useState, useEffect } from 'react';

function Cards({ card, isWinner, onClick, disabled }) {
    const [winnerClass, setWinnerClass] = useState('');

    useEffect(() => {
        if (isWinner) {
            setWinnerClass(isWinner);

            const timer = setTimeout(() => {
                setWinnerClass('');
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isWinner]);

    return (
        <button
            type="button"
            className={`cards ${card} ${winnerClass}`}
            onClick={onClick || undefined}
            disabled={disabled}
            title={card}
        >
            <img src={`./${card}.png`} alt={`${card} image`} />
        </button>
    );
}

export default Cards;
