import './search.scss';
import { useEffect, useState } from 'react';

interface SearchBarProps {
    style?: 'white' | 'red';
    placeholder?: string;
    onSearch?: (value: string) => void;
    searchDebouce?: number;
}

export const Search: React.FC<SearchBarProps> = ({
    style = false,
    placeholder = 'Search...',
    searchDebouce = 300,
    onSearch,
}) => {
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (onSearch) {
                onSearch(searchValue);
            }
        }, searchDebouce);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchValue, onSearch, searchDebouce]);
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return (
        <div data-testid='search-bar' className={`search-bar ${style === 'red' ? 'search-bar--dark' : ''}`}>
            <span className="search-bar__icon"></span>
            <input
                type="text"
                className="search-bar__input"
                placeholder={placeholder}
                value={searchValue}
                onChange={handleInputChange}
            />
        </div>
    );
};
