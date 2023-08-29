import React from 'react';
import './checkbox.scss';
interface CheckboxProps {
    checked: boolean;
    onChange: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
    return (
        <label className={`checkbox ${checked ? 'checkbox--checked' : ''}`} data-testid="checkbox-label">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="checkbox__icon" data-testid="checkbox-icon"></span>
        </label>
    );
};
