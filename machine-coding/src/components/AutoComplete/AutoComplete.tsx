import React, { useState, useEffect, useRef } from 'react';
import './autocomplete.css';
import useDebounce from './useDebounce';

interface AutoCompleteProps {
    fetchSuggestions: (query: string) => Promise<string[]>;
    onSelect: (value: string) => void;
    placeholder?: string;
    debounceDelay?: number;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
    fetchSuggestions,
    onSelect,
    placeholder = 'Search...',
    debounceDelay = 300
}) => {
    // State
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    // Refs
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Use custom debounce hook
    const debouncedInput = useDebounce(input, debounceDelay);

    // Fetch suggestions when debounced input changes
    useEffect(() => {
        if (debouncedInput.length < 2) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const results = await fetchSuggestions(debouncedInput);
                setSuggestions(results);
                setIsOpen(results.length > 0);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [debouncedInput, fetchSuggestions]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0) {
                    handleSelect(suggestions[selectedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setSelectedIndex(-1);
                break;
        }
    };

    const handleSelect = (value: string) => {
        setInput(value);
        setIsOpen(false);
        setSelectedIndex(-1);
        onSelect(value);
    };

    return (
        <div ref={wrapperRef} className="autocomplete">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="autocomplete-input"
            />

            {loading && <div className="loading">Loading...</div>}

            {isOpen && suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            className={index === selectedIndex ? 'selected' : ''}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;