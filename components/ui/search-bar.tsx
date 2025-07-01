import React from 'react';
import { GoSearch } from 'react-icons/go';

export default function SearchBar() {
    return (
        <div className="mb-[12px] h-[53px] w-full items-center flex-row min-h-[32px] ">
            <form action="#" >
                <div className = "min-h-[40px] flex flex-col justify-center border border-border rounded-full focus-within:ring-highlight focus-within:ring-2 transition-colors flex-grow">
                    <div className = "items-center flex flex-row cursor-text ">
                        {/* Search Icon */}
                        <div className = "justify-center flex flex-col ">
                            <GoSearch className = "fill-muted box-content align-text-bottom max-w-full relative w-[16px] h-[16px] pl-[12px] inline-block "/>
                        </div>
                        {/* Search text */}
                        <div className = "flex-shrink flex-grow text-foreground text-[15px]/[20px] wrap-break-word min-w-0 font-normal flex">
                            <input 
                                type= "text"
                                placeholder="Search"
                                autoCapitalize='sentences'
                                autoComplete='off'
                                autoCorrect='off'
                                spellCheck="false"
                                enterKeyHint='search'
                                aria-label="Search query"
                                role='combobox'
                                aria-autocomplete='list'
                                className = "caret-highlight placeholder-foreground text-foreground focus:outline-none text-left min-h-[40px] border-box text-[14px]/[16px] w-full pr-[16px] pl-[4px] bg-transparent ">
                            </input>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}