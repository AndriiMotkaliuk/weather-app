import React from 'react';
import RemoveIcon from "../images/close.svg";


function AutoComplete({ autoCompleteList, selectHandler, removeHandler }) {
    return (
        <ul>
            {autoCompleteList.map((autoCompleteItem) => (
                <li className="p-2 cursor-pointer hover:bg-blue-300 border-b flex justify-between content-center relative" key={autoCompleteItem}>
                    <span className='h-full truncate pr-6 capitalize' onClick={() => selectHandler(autoCompleteItem)}>{autoCompleteItem}</span>
                    <button className='absolute top-1 right-1'
                        onClick={() => removeHandler(autoCompleteItem)}>
                        <img className='h-8 w-8' src={RemoveIcon} alt="Remove" />
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default AutoComplete;
