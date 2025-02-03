import React from 'react';
import styles from './Searchbar.module.css';
import Button from '@/components/buttons/Buttons';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch?: () => void;
    placeholder?: string;
    disabled?: boolean;
    icon?: boolean;
    className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    onSearch,
    placeholder = 'Search',
    disabled = false,
    icon = true,
    className,
}) => {
    return (
        <div className={`${styles.searchbar_container} ${className}`}>
            {icon && onSearch && (
                <Button 
                    variant='icon' 
                    icon="search" 
                    className={styles.search_button} 
                    disabled={disabled} 
                    type='submit'
                    onClick={onSearch} 
                />
            )}
            <input
                type="text"
                className={styles.search_input}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                name='search'
            />
        </div>
    );
};

export default SearchBar;
export { type SearchBarProps }