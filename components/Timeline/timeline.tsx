import React from 'react'
import PostForm from '@/components/posts/post-form'
import { MdPhoto } from "react-icons/md";
import { AiOutlineGif } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import RightSideBar from '@/components/right-sidebar/RightSideBar';
import Timeline from '@/components/posts/get-timeline';
import { Subheading } from '@/components/text';

const TOOLBAR_ITEMS = [
  { title: 'Media', icon: MdPhoto },
  { title: 'GIF', icon: AiOutlineGif  },
  { title: 'Poll', icon: BiPoll },
  { title: 'Emoji', icon: HiOutlineEmojiHappy },
  { title: 'Schedule', icon: RiCalendarScheduleLine },
];


const HomePageTimeline = () => {
    return (
         <main className = "w-full h-full flex flex-col items-start flex-grow flex-shrink">
            <div className = "w-[1050px] items-stretch flex flex-col flex-grow flex-shrink ">
                <div className= "justify-between items-stretch flex flex-row flex-grow w-full ">
                    <div className="max-w-[600px] flex flex-col border-l-[1px] border-r-[1px] border-border flex-grow w-full">
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
                                        <div className = "relative py-[16px] h-full items-center flex flex-col justify-center">
                                            <Subheading>
                                                Following
                                            </Subheading>
                                            <div className = "bg-highlight min-w-[56px] h-[4px] absolute bottom-0 self-center w-full inline-flex rounded-full"></div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Post-Form Area*/}
                        <div className="flex flex-col items-stretch">
                            <div className="pt-[4px] items-stretch flex flex-col ">
                                <div className = "flex flex-col items-stretch">
                                    <div className = "px-[16px] items-stretch flex flex-col">
                                        <PostForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = "bg-border h-[1px] items-stretch flex flex-col"></div>
                        <Timeline />
                    </div>
                    <RightSideBar/>
                </div>
            </div>
         </main>
    )
}

export default HomePageTimeline