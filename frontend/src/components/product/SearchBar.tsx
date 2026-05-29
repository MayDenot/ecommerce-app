type SearchBarProps = {
    textSearch: string;
    onTextChange: (value: string) => void;
    onSearch: () => void;
};

const SearchBar = ({ textSearch, onTextChange, onSearch }: SearchBarProps) => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>

                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={textSearch}
                    className="w-full border-none bg-transparent text-sm focus:outline-none focus:ring-0"
                    onChange={(e) => onTextChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSearch()
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default SearchBar;