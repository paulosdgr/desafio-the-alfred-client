import React from 'react';
import './switch.scss';

interface SwitchProps {
    checked: boolean;
    onChange: () => void;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
    const switchClasses = ['switch', checked ? 'switch--checked' : ''];

    return (
        <label className={switchClasses.join(' ')} htmlFor="toggleSwitch">
            <input type="checkbox" id="toggleSwitch" checked={checked} onChange={onChange} />
            <span className="switch__slider"></span>
        </label>
    );
};
