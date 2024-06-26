"use client"
import {useState, useEffect, useRef} from "react"
export default function ComboBox ({options, onOptionSelect}){
    const [inputValue, setInputValue] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const comboInputRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (comboInputRef.current && !comboInputRef.current.contains(event.target)) {
          setDropdownVisible(false);
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
      setFilteredOptions(
        options.filter((option) =>
          option.toLowerCase().includes(value.toLowerCase())
        )
      );
      setDropdownVisible(true);
      onOptionSelect(value);
    };
  
    const handleInputFocus = () => {
      setFilteredOptions(options); // 모든 옵션을 표시합니다.
      setDropdownVisible(true);
    };
  
    const handleOptionClick = (option) => {
      setInputValue(option);
      setDropdownVisible(false);
      onOptionSelect(option);
    };
  
    return (
      <div className="combo-container" ref={comboInputRef}>
        <input
          type="text"
          className="combo-input"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="직접 입력 또는 선택"
        />
        {dropdownVisible && filteredOptions.length > 0 && (
          <div className="combo-dropdown">
            {filteredOptions.map((option) => (
              <div key={option} onClick={() => handleOptionClick(option)}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };