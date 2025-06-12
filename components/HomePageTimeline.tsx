import React from 'react'
import PostForm from './posts/post-form'
import { BsChat,  } from "react-icons/bs";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { IoStatsChart } from "react-icons/io5";
import { IoShareOutline } from "react-icons/io5";
import { MdPhoto } from "react-icons/md";
import { AiOutlineGif } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { MdMoreHoriz } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import RightSideBar from './RightSideBar';

const TOOLBAR_ITEMS = [
  { title: 'Media', icon: MdPhoto },
  { title: 'GIF', icon: AiOutlineGif  },
  { title: 'Poll', icon: BiPoll },
  { title: 'Emoji', icon: HiOutlineEmojiHappy },
  { title: 'Schedule', icon: RiCalendarScheduleLine },
];


const HomePageTimeline = () => {
    return (
         <main className = "w-full h-full flex flex-col items-start">
            <div className = "w-[1050px] items-stretch flex flex-col">
                <div className= "justify-between items-stretch flex flex-row flex-grow w-full ">
                    <div className="max-w-[600px] flex flex-col border-l-[1px] border-r-[1px] border-border">
                        <div className = "flex flex-row align-items-stretch z-10 justify-around backdrop-blur-md bg-background/75 sticky top-0 border-b-[0.5px] border-border">
                            <div className = "flex-grow flex flex-col">
                                <a className = "min-w-[56px] h-[53px] flex flex-col cursor-pointer items-center justify-center px-[16px] hover:bg-white/5 transition">
                                    <div className = "items-stretch flex flex-col">
                                        <div className = "relative py-[16px] text-[15px]/[20px] font-bold wrap-break-word h-full items-center flex flex-col justify-center">
                                            <span className = "wrap-break-word min-w-0">For you</span>
                                            <div className = "bg-highlight min-w-[56px] h-[4px] absolute bottom-0 self-center w-full inline-flex rounded-full"></div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className = "flex-grow flex flex-col">
                                <a className = "min-w-[56px] h-[53px] flex flex-col cursor-pointer items-center justify-center px-[16px] hover:bg-white/5 transition">
                                    <div className = "items-stretch flex flex-col">
                                        <div className = "relative py-[16px] text-[15px]/[20px] font-bold wrap-break-word h-full items-center flex flex-col justify-center">
                                            <span className = "wrap-break-word min-w-0">Following</span>
                                            <div className = "bg-highlight min-w-[56px] h-[4px] absolute bottom-0 self-center w-full inline-flex rounded-full"></div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col items-stretch">
                            <div className="pt-[4px] items-stretch flex flex-col ">
                                <div className = "flex flex-col items-stretch">
                                    <div className = "px-[16px] items-stretch flex flex-col">
                                        <div className = "flex flex-row items-stretch w-full">
                                            {/* Profile Section of User post*/}
                                            <div className="pt-[12px] basis-[40px] mr-[8px] flex flex-col">
                                                {/* Avatar */}
                                                <div className="relative h-[40px] w-[40px]">
                                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                                                    <img
                                                        src="https://pbs.twimg.com/profile_images/1880129627672219648/alLHN898_normal.jpg"
                                                        alt="User avatar"
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Text Section of User post*/}
                                            <div className = "flex flex-col pt-[4px] justify-center basis-0 flex-grow static">
                                                {/*what's happening?*/}
                                                <div className = "ml-[2px] inline-flex py-[12px] w-full text-[20px]/[24px] font-normal"> 
                                                    <div className = "min-h-[24px] max-h-[720px] box-border ">
                                                        <div className = "py-[2px]">
                                                            <div className = "py-[2px]">
                                                                <span className='text-muted'>What's happening?</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*toolbar*/}
                                                <div className = "sticky bottom-[-1px] pb-[8px] top-0 flex flex-col">
                                                    <div></div>
                                                    <div className = "justify-between items-center flex flex-row w-full">
                                                        {/* Toolbar */}
                                                        <nav className = "mt-[8px] ml-[-8px] flex-1 items-center flex flex-row">
                                                            <div className = "basis-0 h-full items-center flex flex-row grow">
                                                                <div className = "overflow-hidden shrink-1 grow-1 h-full block items-stretch">
                                                                    <div className = "scroll-px-[36px] flex-nowrap overflow-x-auto overflow-y-hidden h-full flex flex-row flex-grow p-[2px] items-stretch">
                                                                        {TOOLBAR_ITEMS.map((item, index) => (
                                                                        <div className="justify-center items-stretch flex flex-col">
                                                                            <button className = "cursor-pointer min-h-[36px] min-w-[36px] rounded-full ">
                                                                                <div className = "text-highlight text-[15px]/[20px] font-bold wrap-break-word text-center min-w-0 flex flex-row justify-center flex-grow">
                                                                                    <item.icon className = "relative h-[20px] align-bottom max-w-[100%] w-[20px] inline-block"/>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </nav>
                                                        {/* Post */}
                                                        <div className = "mt-[8px] items-center flex flex-row">
                                                            <button className = "bg-foreground min-h-[36px] min-w-[36px] ml-[12px] px-[16px] rounded-full ">
                                                                <div className = "text-[15px]/[20px] wrap-break-word text-center font-bold items-center flex flex-row justify-center flex-grow">
                                                                    <span className = "text-background text-[15px]/[20px] wrap-break-word max-w-full min-w-0 overflow-ellipsis overflow-hidden ">
                                                                        Post
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = "bg-border h-[1px] items-stretch flex flex-col"></div>
                        <div className="">
                            <section className = "flex flex-col items-stretch">
                                <div className = "relative min-h-[13260.3px]">
                                    {
                                        Array.from({ length: 5 }).map((_, i) => (
                                            <div key={i} className="border-b-[1px] block border-border">
                                                <div className = "flex flex-col items-stretch">
                                                    <article className = "px-[16px] flex flex-row w-full cursor-pointer overflow-hidden">
                                                        <div className = "flex flex-col flex-shrink flex-grow">
                                                            <div className="flex flex-col items-stretch ">
                                                                <div className = "flex flex-row">
                                                                    <div className = "pt-[12px] basis-0 flex-grow"></div>
                                                                </div>
                                                            </div>
                                                            <div className = "flex flex-row items-stretch">
                                                                {/*Pfp*/}
                                                                <div className = "basis-[40px] flex-grow-0 items-center mr-[8px]">
                                                                    <div className="relative h-[40px] w-[40px]">
                                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                                                                        <img
                                                                            src="https://pbs.twimg.com/profile_images/1880129627672219648/alLHN898_normal.jpg"
                                                                            alt="User avatar"
                                                                            className="w-full h-full rounded-full object-cover"
                                                                        />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*post*/}
                                                                <div className = "pb-[12px] basis-0 justify-center flex-grow flex flex-col">
                                                                    {/*User info*/}
                                                                    <div className = "mb-[2px]">
                                                                        <div className = "items-start justify-between flex flex-row">
                                                                            {/*Main prof. info*/}
                                                                            <div className = "items-baseline shrink-1 flex flex-row">
                                                                                <div className = "max-w-full shrink-1 outline-none">
                                                                                    <div className = "max-w-full items-center flex flex-row">
                                                                                        {/* Name */}
                                                                                        <a href="">
                                                                                            <div className = "text-[15px]/[20px] font-bold min-w-0 items-center text-white wrap-break-word overflow-hidden">
                                                                                                <span className = "min-w-0 overflow-ellipsis">
                                                                                                    <span className='min-w-0'>
                                                                                                        Garrett Hockersmith
                                                                                                    </span>
                                                                                                </span>
                                                                                            </div>
                                                                                        </a>
                                                                                        {/* Username */}
                                                                                        <div className = "ml-[4px] flex flex-row shrink-1">
                                                                                            <div className = "items-baseline flex flex-row">
                                                                                                {/* @ */}
                                                                                                <div className = "max-w-full">
                                                                                                    <a href="" className = "cursor-pointer">
                                                                                                        <div className = "text-muted text-[15px]/[20px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
                                                                                                            <span className = "wrap-break-word min-w-0">@garrhock</span>
                                                                                                        </div>
                                                                                                    </a>
                                                                                                </div>
                                                                                                {/* - */}
                                                                                                <div className = "text-muted text-[15px]/[20px] font-normal px-[4px] min-w-0 items-center wrap-break-word overflow-hidden">
                                                                                                    <span className = "min-w-0 wrap-break-word ">·</span>
                                                                                                </div>
                                                                                                {/* time */}
                                                                                                <div className = "shrink-0 flex flex-row">
                                                                                                    <a href="" className = "gap-[4px] flex-wrap text-muted shrink-0 text-[15px]/[20px] wrap-break-word min-w-0 cursor-pointer font-normal inline-flex">
                                                                                                        <time dateTime="2025-06-08T00:37">1 hour ago</time>
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {/*more*/}
                                                                            <div className = "ml-[8px]">
                                                                                <div className = "gap-[8px] justify-between items-center flex flex-row">
                                                                                    {/*more*/}
                                                                                    <div className = "items-center flex flex-row justify-start">
                                                                                        <button className = "cursor-pointer min-h-[20px] justify-center overflow-visible items-stretch">
                                                                                            <div className = "text-muted text-[15px]/[20px] items-center font-normal justify-start min-w-0 wrap-break-word flex">
                                                                                                <MdMoreHoriz className = "w-[1.25em] fill-muted align-text-bottom max-w-full h-[1.25em] inline-block"/>
                                                                                            </div>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/*Caption*/}
                                                                    <div className = "text-foreground text-[15px]/[20px] wrap-break-word relative font-normal min-w-0">
                                                                        <span className = "wrap-break-word min-w-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla saepe quisquam qui perferendis possimus officiis architecto, facilis quae nesciunt magni itaque corrupti tempore magnam harum, vero corporis omnis. Accusamus corrupti quia distinctio voluptates quibusdam ullam obcaecati harum magnam aspernatur! Quam reprehenderit aut eius quod ducimus tempora atque, debitis placeat totam.</span>
                                                                    </div>
                                                                    {/*Attached*/}
                                                                    <div className = "gap-[4px] mt-[12px]">
                                                                        <div className = "gap-[4px]">
                                                                            <div className="bg-slate-400 aspect-square w-[100%] h-80 rounded-xl mt-2"></div>
                                                                        </div>
                                                                    </div>
                                                                    {/*Toolbar*/}
                                                                    <div className = "gap-x-[4px] mt-[12px] justify-between max-w-[600px] flex flex-row items-stretch">
                                                                        <div className = "justify-start flex flex-row flex-1">
                                                                            <button className = "cursor-pointer min-h-[20px] justify-center overflow-visible ">
                                                                                <div className = "flex flex-row text-muted text-[15px]/[20px] wrap-break-word min-w-0 justify-start items-center font-normal">
                                                                                    {/* Icon */}
                                                                                    <BsChat className = "w-[1.25em] max-w-full align-text-bottom fill-muted relative h-[1.25em] inline-block"/>
                                                                                    {/* Amt. */}
                                                                                    <div className="min-w-[calc(1em+24px)] wrap-break-word text-[13px]/[16px] px-[4px]">
                                                                                        <span className = "min-w-0 wrap-break-word">100</span>
                                                                                    </div>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                        <div className = "justify-start flex flex-row flex-1">
                                                                            <button className = "cursor-pointer min-h-[20px] justify-center overflow-visible ">
                                                                                <div className = "flex flex-row text-muted text-[15px]/[20px] wrap-break-word min-w-0 justify-start items-center font-normal">
                                                                                    {/* Icon */}
                                                                                    <AiOutlineRetweet className = "w-[1.25em] max-w-full align-text-bottom fill-muted relative h-[1.25em] inline-block"/>
                                                                                    {/* Amt. */}
                                                                                    <div className="min-w-[calc(1em+24px)] wrap-break-word text-[13px]/[16px] px-[4px]">
                                                                                        <span className = "min-w-0 wrap-break-word">100</span>
                                                                                    </div>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                        <div className = "justify-start flex flex-row flex-1">
                                                                            <button className = "cursor-pointer min-h-[20px] justify-center overflow-visible ">
                                                                                <div className = "flex flex-row text-muted text-[15px]/[20px] wrap-break-word min-w-0 justify-start items-center font-normal">
                                                                                    {/* Icon */}
                                                                                    <AiOutlineHeart className = "w-[1.25em] max-w-full align-text-bottom fill-muted relative h-[1.25em] inline-block"/>
                                                                                    {/* Amt. */}
                                                                                    <div className="min-w-[calc(1em+24px)] wrap-break-word text-[13px]/[16px] px-[4px]">
                                                                                        <span className = "min-w-0 wrap-break-word">100</span>
                                                                                    </div>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                        <div className = "justify-start flex flex-row flex-1">
                                                                            <button className = "cursor-pointer min-h-[20px] justify-center overflow-visible ">
                                                                                <div className = "flex flex-row text-muted text-[15px]/[20px] wrap-break-word min-w-0 justify-start items-center font-normal">
                                                                                    {/* Icon */}
                                                                                    <IoStatsChart className = "w-[1.25em] max-w-full align-text-bottom fill-muted relative h-[1.25em] inline-block"/>
                                                                                    {/* Amt. */}
                                                                                    <div className="min-w-[calc(1em+24px)] wrap-break-word text-[13px]/[16px] px-[4px]">
                                                                                        <span className = "min-w-0 wrap-break-word">100</span>
                                                                                    </div>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                        <div className = "justify-start flex flex-row mr-[8px]">
                                                                            <button className = "cursor-pointer min-h-[20px] justify-center overflow-visible ">
                                                                                <div className = "text-muted text-[15px]/[20px] wrap-break-word min-w-0 justify-start items-center">
                                                                                    <IoBookmarkOutline className = "w-[1.25em] align-text-bottom fill-muted max-w-full h-[1.25em] inline-block relative"/>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                        <div className = "justify-start flex flex-row">
                                                                            <button className = "cursor-pointer min-h-[20px] justify-center overflow-visible ">
                                                                                <div className = "text-muted text-[15px]/[20px] wrap-break-word min-w-0 justify-start items-center">
                                                                                    <IoShareOutline className = "w-[1.25em] align-text-bottom fill-muted max-w-full h-[1.25em] inline-block relative"/>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </article>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </section>
                        </div>
                    </div>
                    <RightSideBar/>
                </div>
            </div>
         </main>
    )
}

export default HomePageTimeline