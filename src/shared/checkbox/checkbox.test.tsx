import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import { Checkbox } from './checkbox';

describe('Checkbox Component', () => {
    it('renders unchecked checkbox', () => {
        render(<Checkbox checked={false} onChange={() => {}} />);
        const checkboxInput = screen.getByRole('checkbox');
        const checkboxIcon = screen.getByTestId('checkbox-icon');
        const checkboxLabel = screen.getByTestId('checkbox-label');

        expect(checkboxInput).toBeInTheDocument();
        expect(checkboxInput).not.toBeChecked();
        expect(checkboxIcon).toHaveClass('checkbox__icon');
        expect(checkboxLabel).not.toHaveClass('checkbox--checked');
    });

    it('renders checked with checked icon', () => {
        render(<Checkbox checked={true} onChange={() => {}} />);
        const checkboxLabel = screen.getByTestId('checkbox-label');
        const checkboxIcon = screen.getByTestId('checkbox-icon');
        const checkboxInput = screen.getByRole('checkbox');

        expect(checkboxLabel).toBeInTheDocument();
        expect(checkboxIcon).toHaveClass('checkbox__icon');
        expect(checkboxLabel).toHaveClass('checkbox--checked');
        expect(checkboxInput).toBeChecked();
    });
});
