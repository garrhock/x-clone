import React from 'react'
import { GoSearch } from 'react-icons/go'
import { MdMoreHoriz } from 'react-icons/md'

const RightSideBar = () => {
  return (
    <div className = "max-w-[350px] w-full mr-[70px]">
        <div className = "min-h-[1246.19px] h-full ">
            <div className = "top-0 w-[350px] fixed ">
                <div className = "flex flex-col items-stretch ">
                    <div className = "flex flex-col items-stretch pb-[64px] pt-[12px] ">
                        {/* Search */}
                        <div className="mb-[12px] h-[53px] w-[350px] items-center flex-row min-h-[32px] ">
                            <form action="#" >
                                <div className = "min-h-[40px] flex flex-col justify-center border-1 border-border rounded-full focus-within:ring-highlight focus-within:ring-2 transition-colors flex-grow">
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
                        {/*What's happening */}
                        <div className = "mb-[16px] bg-background border-1 border-border rounded-2xl ">
                            <div className = "flex flex-col items-stretch">
                                <div>
                                    <div className = "px-[16px] py-[12px] justify-center">
                                        <div className = "text-[20px]/[24px] font-bold wrap-break-word text-foreground ">
                                            <span>
                                                What's happening?
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Start Posts */}
                                <div className = "flex flex-col items-stretch p-[16px]">
                                    <div className = "flex flex-row justify-between">
                                        <div className = 'flex flex-row'>
                                            {/* Category */}
                                            <div className = "text-muted text-[13px]/[16px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
                                                <span className = "wrap-break-word min-w-0">Category</span>
                                            </div>
                                            {/* - */}
                                            <div className = "text-muted text-[13px]/[16px] font-normal px-[4px] min-w-0 items-center wrap-break-word overflow-hidden">
                                                <span className = "min-w-0 wrap-break-word ">·</span>
                                            </div>
                                            {/* Trending*/}
                                            <div className = "text-muted text-[13px]/[16px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
                                                <span className = "wrap-break-word min-w-0">Trending</span>
                                            </div>
                                        </div>
                                        <div className = "fill-muted">
                                            <div className = "text-muted text-[15px]/[20px] items-center font-normal justify-start min-w-0 wrap-break-word flex">
                                                <MdMoreHoriz className = "w-[1.25em] fill-gray-500 align-text-bottom max-w-full h-[1.25em] inline-block"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className = "mt-[2px] text-[15px]/[20px] font-bold text-foreground">
                                        <span>
                                            TITLE
                                        </span>
                                    </div>
                                    <div className = "mt-[4px] text-muted text-[13px]/[16px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
                                        <span className = "wrap-break-word min-w-0">1,000 posts</span>
                                    </div>
                                </div>
                                <div className = "flex flex-col items-stretch p-[16px]">
                                    <div className = "flex flex-row justify-between">
                                        <div className = 'flex flex-row'>
                                            {/* Category */}
                                            <div className = "text-muted text-[13px]/[16px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
                                                <span className = "wrap-break-word min-w-0">Category</span>
                                            </div>
                                            {/* - */}
                                            <div className = "text-muted text-[13px]/[16px] font-normal px-[4px] min-w-0 items-center wrap-break-word overflow-hidden">
                                                <span className = "min-w-0 wrap-break-word ">·</span>
                                            </div>
                                            {/* Trending*/}
                                            <div className = "text-muted text-[13px]/[16px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
                                                <span className = "wrap-break-word min-w-0">Trending</span>
                                            </div>
                                        </div>
                                        <div className = "fill-muted">
                                            <div className = "text-muted text-[15px]/[20px] items-center font-normal justify-start min-w-0 wrap-break-word flex">
                                                <MdMoreHoriz className = "w-[1.25em] fill-muted align-text-bottom max-w-full h-[1.25em] inline-block"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className = "mt-[2px] text-[15px]/[20px] font-bold text-foreground">
                                        <span>
                                            TITLE
                                        </span>
                                    </div>
                                    <div className = "mt-[4px] text-muted text-[13px]/[16px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
                                        <span className = "wrap-break-word min-w-0">1,000 posts</span>
                                    </div>
                                </div>
                                <div className = "flex flex-col items-stretch p-[16px]">
                                    <div className = "flex flex-row justify-between">
                                        <div className = 'flex flex-row'>
                                            {/* Category */}
                                            <div className = "text-muted text-[13px]/[16px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
                                                <span className = "wrap-break-word min-w-0">Category</span>
                                            </div>
                                            {/* - */}
                                            <div className = "text-muted text-[13px]/[16px] font-normal px-[4px] min-w-0 items-center wrap-break-word overflow-hidden">
                                                <span className = "min-w-0 wrap-break-word ">·</span>
                                            </div>
                                            {/* Trending*/}
                                            <div className = "text-muted text-[13px]/[16px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
                                                <span className = "wrap-break-word min-w-0">Trending</span>
                                            </div>
                                        </div>
                                        <div className = "fill-muted">
                                            <div className = "text-muted text-[15px]/[20px] items-center font-normal justify-start min-w-0 wrap-break-word flex">
                                                <MdMoreHoriz className = "w-[1.25em] fill-muted align-text-bottom max-w-full h-[1.25em] inline-block"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className = "mt-[2px] text-[15px]/[20px] font-bold text-foreground">
                                        <span>
                                            TITLE
                                        </span>
                                    </div>
                                    <div className = "mt-[4px] text-muted text-[13px]/[16px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
                                        <span className = "wrap-break-word min-w-0">1,000 posts</span>
                                    </div>
                                </div>
                                <div className = "flex flex-col items-stretch p-[16px]">
                                    <div className = "flex flex-row justify-between">
                                        <div className = 'flex flex-row'>
                                            {/* Category */}
                                            <div className = "text-muted text-[13px]/[16px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
                                                <span className = "wrap-break-word min-w-0">Category</span>
                                            </div>
                                            {/* - */}
                                            <div className = "text-muted text-[13px]/[16px] font-normal px-[4px] min-w-0 items-center wrap-break-word overflow-hidden">
                                                <span className = "min-w-0 wrap-break-word ">·</span>
                                            </div>
                                            {/* Trending*/}
                                            <div className = "text-muted text-[13px]/[16px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
                                                <span className = "wrap-break-word min-w-0">Trending</span>
                                            </div>
                                        </div>
                                        <div className = "fill-muted">
                                            <div className = "text-muted text-[15px]/[20px] items-center font-normal justify-start min-w-0 wrap-break-word flex">
                                                <MdMoreHoriz className = "w-[1.25em] fill-muted align-text-bottom max-w-full h-[1.25em] inline-block"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className = "mt-[2px] text-[15px]/[20px] font-bold text-foreground">
                                        <span>
                                            TITLE
                                        </span>
                                    </div>
                                    <div className = "mt-[4px] text-muted text-[13px]/[16px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
                                        <span className = "wrap-break-word min-w-0">1,000 posts</span>
                                    </div>
                                </div>
                                {/* End Posts */}
                                {/* Show more */}
                                <div>
                                    <a href="" className='p-[16px] flex flex-col'>
                                        <div className = "text-[15px]/[20px] text-highlight font-normal wrap-break-word">
                                            <span>
                                                Show more
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Who to follow */}
                        <div className = "mb-[16px] bg-background border-1 border-border rounded-2xl ">
                            <div className = "flex flex-col items-stretch">
                                {/* Title */}
                                <div>
                                    <div className = "px-[16px] py-[12px] justify-center">
                                        <div className = "text-[20px]/[24px] font-bold wrap-break-word text-foreground ">
                                            <span>
                                                Who to follow
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Suggested Following List */}
                                <ul role='list'>
                                    <li role='listitem' className = "py-[12px] px-[16px] cursor-pointer">
                                        <div className = "flex flex-row flex-grow">
                                            {/* Pfp */}
                                            <div className = "basis-[40px] justify-center mr-[8px] h-[40px] w-[40px]">
                                                <img
                                                        src="https://pbs.twimg.com/profile_images/1880129627672219648/alLHN898_normal.jpg"
                                                        alt="User avatar"
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                            </div>
                                            {/* Username  */}
                                            <div className = "flex flex-row justify-between w-full">
                                                <div className = "flex flex-col">
                                                    <div className = "text-foreground text-[15px]/[20px] font-bold overflow-hidden wrap-break-word">
                                                        <span>User's Name</span>
                                                    </div>
                                                    <div className = "text-muted text-[15px]/[20px] font-normal text-ellipsis wrap-break-word">
                                                        <span>@username</span>
                                                    </div>
                                                </div>
                                                {/* Follow button */}
                                                <div className = "min-w-[78px] ml-[12px] ">
                                                    <button className='bg-foreground cursor-pointer px-[16px] min-h-[32px] min-w-[32px] border-transparent rounded-full '>
                                                        <div className = "text-background text-[15px]/[20px] font-bold wrap-break-word justify-center text-center grow ">
                                                            <span>Follow</span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li role='listitem' className = "py-[12px] px-[16px] cursor-pointer">
                                        <div className = "flex flex-row flex-grow">
                                            {/* Pfp */}
                                            <div className = "basis-[40px] justify-center mr-[8px] h-[40px] w-[40px]">
                                                <img
                                                        src="https://pbs.twimg.com/profile_images/1880129627672219648/alLHN898_normal.jpg"
                                                        alt="User avatar"
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                            </div>
                                            {/* Username  */}
                                            <div className = "flex flex-row justify-between w-full">
                                                <div className = "flex flex-col">
                                                    <div className = "text-foreground text-[15px]/[20px] font-bold overflow-hidden wrap-break-word">
                                                        <span>User's Name</span>
                                                    </div>
                                                    <div className = "text-muted text-[15px]/[20px] font-normal text-ellipsis wrap-break-word">
                                                        <span>@username</span>
                                                    </div>
                                                </div>
                                                {/* Follow button */}
                                                <div className = "min-w-[78px] ml-[12px] ">
                                                    <button className='bg-foreground cursor-pointer px-[16px] min-h-[32px] min-w-[32px] border-transparent rounded-full '>
                                                        <div className = "text-background text-[15px]/[20px] font-bold wrap-break-word justify-center text-center flex-grow ">
                                                            <span>Follow</span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li role='listitem' className = "py-[12px] px-[16px] cursor-pointer">
                                        <div className = "flex flex-row flex-grow">
                                            {/* Pfp */}
                                            <div className = "basis-[40px] justify-center mr-[8px] h-[40px] w-[40px]">
                                                <img
                                                        src="https://pbs.twimg.com/profile_images/1880129627672219648/alLHN898_normal.jpg"
                                                        alt="User avatar"
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                            </div>
                                            {/* Username  */}
                                            <div className = "flex flex-row justify-between w-full">
                                                <div className = "flex flex-col">
                                                    <div className = "text-foreground text-[15px]/[20px] font-bold overflow-hidden wrap-break-word">
                                                        <span>User's Name</span>
                                                    </div>
                                                    <div className = "text-muted text-[15px]/[20px] font-normal text-ellipsis wrap-break-word">
                                                        <span>@username</span>
                                                    </div>
                                                </div>
                                                {/* Follow button */}
                                                <div className = "min-w-[78px] ml-[12px] ">
                                                    <button className='bg-foreground cursor-pointer px-[16px] min-h-[32px] min-w-[32px] border-transparent rounded-full '>
                                                        <div className = "text-background text-[15px]/[20px] font-bold wrap-break-word justify-center text-center flex-grow ">
                                                            <span>Follow</span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                {/* Show more */}
                                <div>
                                    <a href="" className='p-[16px] flex flex-col'>
                                        <div className = "text-[15px]/[20px] text-highlight font-normal wrap-break-word">
                                            <span>
                                                Show more
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* legal .. */}
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RightSideBar