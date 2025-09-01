import React, { useRef } from "react";
import { MdPhoto } from "react-icons/md";
import { AiOutlineGif } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { RiCalendarScheduleLine } from "react-icons/ri";

const PostingToolBar = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // handle file change logic here
        // e.target.files
    };

    return (
        <nav className="mt-[8px] ml-[-8px] flex-1 items-center flex flex-row">
            <div className="basis-0 h-full items-center flex flex-row grow">
                <div className="overflow-hidden shrink-1 grow-1 h-full block items-stretch">
                    <div className="scroll-px-[36px] flex-nowrap overflow-x-auto overflow-y-hidden h-full flex flex-row flex-grow p-[2px] items-stretch">
                        {/* Attach File Button */}
                        <div>
                            <button
                                type="button"
                                className="cursor-pointer min-h-[36px] min-w-[36px] rounded-full text-highlight"
                                aria-label="Choose attachment"
                                onClick={handleButtonClick}
                            >
                                <div className="text-highlight text-[15px] font-bold wrap-break-word text-center min-w-0 flex flex-row justify-center flex-grow">
                                    <MdPhoto className="relative h-[20px] align-bottom max-w-[100%] w-[20px] inline-block" />
                                </div>
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={onFileChange}
                            />
                        </div>
                        {/* Gif Button */}
                        <div>
                            <button
                                type="button"
                                className="cursor-pointer min-h-[36px] min-w-[36px] rounded-full text-highlight"
                                aria-label="Choose attachment"
                                onClick={handleButtonClick}
                            >
                                <div className="text-highlight text-[15px] font-bold wrap-break-word text-center min-w-0 flex flex-row justify-center flex-grow">
                                    <AiOutlineGif className="relative h-[20px] align-bottom max-w-[100%] w-[20px] inline-block" />
                                </div>
                            </button>
                        </div>
                        {/* Poll Button*/}
                        <div>
                            <button
                                type="button"
                                className="cursor-pointer min-h-[36px] min-w-[36px] rounded-full text-highlight"
                                aria-label="Choose attachment"
                                onClick={handleButtonClick}
                            >
                                <div className="text-highlight text-[15px] font-bold wrap-break-word text-center min-w-0 flex flex-row justify-center flex-grow">
                                    <BiPoll className="relative h-[20px] align-bottom max-w-[100%] w-[20px] inline-block" />
                                </div>
                            </button>
                        </div>
                        {/* Emoji Button */}
                        <div>
                            <button
                                type="button"
                                className="cursor-pointer min-h-[36px] min-w-[36px] rounded-full text-highlight"
                                aria-label="Choose attachment"
                                onClick={handleButtonClick}
                            >
                                <div className="text-highlight text-[15px] font-bold wrap-break-word text-center min-w-0 flex flex-row justify-center flex-grow">
                                    <HiOutlineEmojiHappy className="relative h-[20px] align-bottom max-w-[100%] w-[20px] inline-block" />
                                </div>
                            </button>
                        </div>
                        {/* Schedule Button*/}
                        <div>
                            <button
                                type="button"
                                className="cursor-pointer min-h-[36px] min-w-[36px] rounded-full text-highlight"
                                aria-label="Choose attachment"
                                onClick={handleButtonClick}
                            >
                                <div className="text-highlight text-[15px] font-bold wrap-break-word text-center min-w-0 flex flex-row justify-center flex-grow">
                                    <RiCalendarScheduleLine className="relative h-[20px] align-bottom max-w-[100%] w-[20px] inline-block" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PostingToolBar;