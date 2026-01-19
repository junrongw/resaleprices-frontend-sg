import { useState, useRef, useEffect } from "react";
import "./dropdown.css"

const SearchableDropdown = ({ options, onSelect, placeholder}) => {

  const [selected, setSelected] = useState("")
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filteredOptions = options.filter((opt) =>
     opt.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="wrapper">
      <input
        value={selected}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="w-full border p-2 rounded"
      />

      {isOpen && (
        <ul className="dropdown">
          <input 
            placeholder={"Search here - E.,g " + placeholder}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
          />
          {filteredOptions.length > 0 &&
            filteredOptions.map((option, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setSelected(option)
                  onSelect(option);
                  setIsOpen(false);
                  setSearch("");
                }}
                className="p-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap"
              >
                {option}
              </li>
            ))
          }
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
