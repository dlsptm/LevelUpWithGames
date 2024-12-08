import { useState, useEffect } from 'react';
import './App.css';
import Cards from './Cards.jsx';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ConfigForm from "./ConfigForm.jsx";

function App() {
    const [choice, setChoice] = useState('');
    const [result, setResult] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [playerOnePoint, setPlayerOnePoint] = useState(0);
    const [playerTwoPoint, setPlayerTwoPoint] = useState(0);
    const [round, setRound] = useState(0);
    const [maxRound, setMaxRound] = useState(5);
    const [playerOneName, setPlayerOneName] = useState('Joueur 1');
    const [playerTwoName, setPlayerTwoName] = useState('Ordinateur');
    const [headerText, setHeaderText] = useState('Make Your Choice');
    const [showConfig, setShowConfig] = useState(true);


    useEffect(() => {
        if (result && choice) {
            if (result === 'player') {
                setPlayerOnePoint(prev => prev + 1);
                setHeaderText('Player wins')
                reFreshHeader(round, maxRound)
            } else if (result === 'computer') {
                setPlayerTwoPoint(prev => prev + 1);
                setHeaderText("Computer wins")
                reFreshHeader(round, maxRound)

            } else if (result === 'tie'){
                setHeaderText("This is a tie")
                reFreshHeader(round, maxRound)
            }
        }

    }, [result, choice]);

    const reFreshHeader = (round, maxround) => {
        if (round < maxround) {
            setTimeout(() => {
                setHeaderText('Make Your Choice');
            }, 1000);
        }
    };

    const handleChoice = (selectedChoice) => {
        if (round < maxRound) {
            setChoice(selectedChoice);
            setRound(round + 1);

            fetch('http://localhost:5002/computer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ choice: selectedChoice })
            })
                .then(response => response.json())
                .then(data => {
                    setResult(data.result);
                    setComputerChoice(data.computer_choice);
                });
        }
    };

    const isWinner = (card, player, winner) => {
        if (
            card === player && result === 'tie'
        ) {
            return 'tie'
        }

        if (
           card === player && winner === result
        ) {
            return 'winner'
        }

        if (
            card === player && winner !== result) {
            return 'looser'
        }
        return ''
    };

    const isFinalWinner = (playerOnePoint, playerTwoPoint, playerName) => {
        if (playerOnePoint > playerTwoPoint) {
            return `${playerName} a gagné la partie`
        }
        return `Vous avez perdu`
    }

    const [formData, setFormData] = useState({
        round: 1,
        option: "Computer",
        username: "",
    });

    const handleFormDataChange = (data) => {
        setFormData(data);
    };

    const handleValidateConfig = () => {
        setShowConfig(false);
    };

    const resetGame = () => {
        setChoice('');
        setResult('');
        setComputerChoice('');
        setPlayerOnePoint(0);
        setPlayerTwoPoint(0);
        setRound(0);
        setMaxRound(5);
        setPlayerOneName('Joueur 1');
        setPlayerTwoName('Ordinateur');
        setHeaderText('Make Your Choice');
        setShowConfig(true);
        setFormData({
            round: 1,
            option: "Computer",
            username: "",
        });
        setShowConfig(true)
    };

    useEffect(() => {
        if (formData.round) {
            setMaxRound(formData.round);
        }

        if (formData.username) {
            setPlayerOneName(formData.username);
        }

        if (formData.option === "Player") {
            setPlayerTwoName("Player 2");
        } else {
            setPlayerTwoName("Computer");
        }
    }, [formData]);


    return (
        <>
            {showConfig && (
                <ConfigForm
                    onFormChange={handleFormDataChange}
                    onValidate={handleValidateConfig}
                />
            )}
            <main>
                <div className="config">
                    <FontAwesomeIcon icon={faArrowLeft} size="3x" onClick={resetGame}/>
                    <h2>{
                        round === maxRound ?
                            isFinalWinner(playerOnePoint, playerTwoPoint, playerOneName) :
                            headerText
                        }
                    </h2>
                    <div>
                        <p>Tour : <span>{round}</span>/ <span>{maxRound}</span></p>
                        <p>{playerOneName} : <span>{playerOnePoint}</span></p>
                        <p>{playerTwoName} : <span>{playerTwoPoint}</span></p>
                    </div>
                </div>
                <div className="cards-container">
                    <Cards
                        card="paper"
                        isWinner={isWinner('paper', computerChoice, 'computer')}
                    />
                    <Cards
                        card="rock"
                        isWinner={isWinner('rock', computerChoice, 'computer')}

                    />
                    <Cards
                        card="cisors"
                        isWinner={isWinner('cisors', computerChoice, 'computer')}
                    />
                </div>
                <div className="cards-container">
                    <Cards
                        card="paper"
                        isWinner={isWinner('paper', choice, 'player')}
                        onClick={() => handleChoice('paper')}
                        disabled={round === maxRound}
                    />
                    <Cards
                        card="rock"
                        isWinner={isWinner('rock', choice, 'player')}
                        onClick={() => handleChoice('rock')}
                        disabled={round === maxRound}
                    />
                    <Cards
                        card="cisors"
                        isWinner={isWinner('cisors', choice, 'player')}
                        onClick={() => handleChoice('cisors')}
                        disabled={round === maxRound}
                    />
                </div>
            </main>
        </>
    );
}

export default App;
