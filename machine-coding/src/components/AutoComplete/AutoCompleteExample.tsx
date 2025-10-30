import AutoComplete from './AutoComplete';

const fetchCountries = async (query: string): Promise<string[]> => {
    const countries = [
        'United States', 'United Kingdom', 'Canada', 'Australia',
        'Germany', 'France', 'India', 'China', 'Japan', 'Brazil'
    ];

    await new Promise(resolve => setTimeout(resolve, 500));

    return countries.filter(country =>
        country.toLowerCase().includes(query.toLowerCase())
    );
};

function AutoCompleteExample() {
    return (
        <div style={{ padding: '50px', maxWidth: '500px', margin: '0 auto' }}>
            <h1>AutoComplete Demo</h1>
            <AutoComplete
                fetchSuggestions={fetchCountries}
                onSelect={(value) => console.log('Selected:', value)}
                placeholder="Search countries..."
            />
        </div>
    );
}

export default AutoCompleteExample;