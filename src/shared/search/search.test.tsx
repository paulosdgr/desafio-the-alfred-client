import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Search } from './search';

describe('Search Component', () => {
    it('renders with default white style', () => {
        render(<Search />);
        const searchElement = screen.getByTestId('search-bar');

        expect(searchElement).toBeInTheDocument();
        expect(searchElement).not.toHaveClass('search-bar--dark');
    });

    it('renders with red style', () => {
        render(<Search style="red" />);
        const searchElement = screen.getByTestId('search-bar');

        expect(searchElement).toBeInTheDocument();
        expect(searchElement).toHaveClass('search-bar--dark');
    });

    it('renders with provided placeholder', () => {
        const placeholderText = 'Custom Placeholder';
        render(<Search placeholder={placeholderText} />);
        const inputElement = screen.getByPlaceholderText(placeholderText);

        expect(inputElement).toBeInTheDocument();
    });

    it('triggers onSearch after debounce', async () => {
        const onSearchMock = jest.fn();
        const debounceTime = 300;
        render(<Search onSearch={onSearchMock} searchDebouce={debounceTime} />);
        const inputElement = screen.getByRole('textbox');

        fireEvent.change(inputElement, { target: { value: 'test value' } });

        await waitFor(
            () => {
                expect(onSearchMock).toHaveBeenCalledWith('test value');
            },
            { timeout: debounceTime + 100 },
        );
    });

    it('does not trigger onSearch when input changes quickly', async () => {
        const onSearchMock = jest.fn();
        const debounceTime = 300;
        render(<Search onSearch={onSearchMock} searchDebouce={debounceTime} />);
        const inputElement = screen.getByRole('textbox');

        fireEvent.change(inputElement, { target: { value: 'first value' } });
        fireEvent.change(inputElement, { target: { value: 'second value' } });

        await waitFor(
            () => {
                expect(onSearchMock).not.toHaveBeenCalled();
            },
            { timeout: debounceTime + 100 },
        );
    });
});
