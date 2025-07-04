import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import Heading from "../text/heading";
import ProfilePictureLG from "../profile/profile-picture-lg";
import Banner from "../profile/profile-banner";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
const ProfileSettings: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className = "min-w-[600px] min-h-[400px] w-[600px] h-[650px] bg-background border border-border rounded-2xl">
            <div className="flex flex-col h-full">
                {                    /* Header */}
                <div className="sticky top-0 z-2 ">
                    <div className="flex flex-row items-center justify-center h-[53px] px-4">
                        <div className = "flex flex-col min-w-[56px] min-h-[32px] align-stretch items-start justify-center ">
                            <button className = "rounded-full hover:bg-foreground/10 transition-colors duration-200 min-w-[36px] min-h-[36px]">
                                <div className = "items-start flex flex-col">
                                    <IoCloseOutline  className = "size-6 align-middle"/>
                                </div>
                            </button>
                        </div>
                        <div className = "flex flex-col flex-grow">
                            <div className = "relative h-full items-start flex flex-col justify-center">
                                <div className = "py-[2px] max-w-full">
                                    <Heading>Edit profile</Heading>
                                </div>
                            </div>
                        </div>
                        <div className = "min-w-[78px] ml-[12px] ">
                            <button className='bg-foreground cursor-pointer px-[16px] min-h-[32px] min-w-[32px] border-transparent rounded-full '>
                                <div className = "text-background text-[15px]/[20px] font-bold wrap-break-word justify-center text-center grow ">
                                    <span>Save</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                {                    /* Content */}
                <div className="flex flex-col pb-16 ">
                    {/* Banner */}
                    <div className="max-h-[200px]">
                        Fill
                    </div>
                    {/* Info */}
                    <div className = "flex pt-3 px-4 mb-4 w-full items-start">
                        <Avatar className = "border border-border">
                            <AvatarImage src="https://pbs.twimg.com/profile_images/1880129627672219648/alLHN898_normal.jpg" />
                        </Avatar>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProfileSettings;