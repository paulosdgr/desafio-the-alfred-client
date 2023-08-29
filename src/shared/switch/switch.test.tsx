import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

import { Switch } from './switch';

describe('Switch Component', () => {
    it('renders with default state', () => {
        render(<Switch checked={false} onChange={() => {}} />);
        const switchInput = screen.getByRole('checkbox');

        expect(switchInput).toBeInTheDocument();
        expect(switchInput).not.toBeChecked();
    });

    it('renders with checked state', () => {
        render(<Switch checked={true} onChange={() => {}} />);
        const switchInput = screen.getByRole('checkbox');

        expect(switchInput).toBeInTheDocument();
        expect(switchInput).toBeChecked();
    });

    it('calls the onChange handler when clicked', () => {
        const handleChange = jest.fn();
        render(<Switch checked={false} onChange={handleChange} />);
        const switchInput = screen.getByRole('checkbox');

        fireEvent.click(switchInput);

        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
