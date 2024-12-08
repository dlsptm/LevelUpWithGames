import { useState } from 'react';

function ConfigForm({ onFormChange, onValidate }) {
    const [formValues, setFormValues] = useState({
        round: 1,
        option: "Computer",
        username: "",
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const updatedValues = { ...formValues, [id]: value };

        setFormValues(updatedValues);
        onFormChange(updatedValues);
    };

    const handleValidateClick = () => {
        onValidate();
    };

    return (
        <>
            <aside>
                <h1>
                    <span className="paper-name">Paper</span>
                    <span className="rock-name">Rock</span>
                    <span className="scissors-name">Scissors</span>
                </h1>
                <form>
                    <div>
                        <div className="config-fo">
                            <div>
                                <label htmlFor="round">
                                    Round:
                                </label>
                                <input
                                    id="round"
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={formValues.round}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="option">
                                    Option:
                                </label>
                                <select
                                    id="option"
                                    value={formValues.option}
                                    onChange={handleInputChange}
                                >
                                    <option value="Computer">Computer</option>
                                    <option value="Player">Player</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="username">
                                Username:
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={formValues.username}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button type="button" onClick={handleValidateClick}>
                        Valider
                    </button>
                </form>
            </aside>
        </>
    );
}

export default ConfigForm