
import LeftSideBar from "@/components/left-sidebar/LeftSideBar";
import RightSideBar from '@/components/right-sidebar/RightSideBar';
import { IoArrowBackOutline } from "react-icons/io5";
import { GoSearch  } from "react-icons/go";
import { Heading } from "@/components/text";
import { Description } from "@/components/text";
import ProfilePicture from "@/components/profile/profile-picture";
import EditProfileButton from "@/components/profile/edit-profile-button";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center relative bg-black text-white">
      <div className="w-full max-w-[1385px] mx-auto h-full flex relative">
        <LeftSideBar />
        <main className = "w-full h-full flex flex-col items-start">
            <div className = "w-[1050px] items-stretch flex flex-col flex-grow flex-shrink ">
                <div className= "justify-between items-stretch flex flex-row flex-grow w-full ">
                    <div className="max-w-[600px] flex flex-col border-l-[1px] border-r-[1px] border-border flex-grow w-full">
                        {/* Top Bar*/}
                        <div className = "flex flex-row align- items-stretch z-10 justify-around backdrop-blur-md bg-background/75 sticky top-0 border-b-[0.5px] border-border">                 
                            <div className="flex flex-row items-center justify-between w-full px-4 h-[53px]">
                                {/* Back Button */}
                                <div className = "flex flex-col min-w-[56px] min-h-[32px] align-stretch items-start justify-center ">
                                    <button className = "rounded-full hover:bg-foreground/10 transition-colors duration-200 min-w-[36px] min-h-[36px]">
                                        <div className = "items-center flex flex-col">
                                            <IoArrowBackOutline className = "size-5 align-middle"/>
                                        </div>
                                    </button>
                                </div>
                                {/* Name + num posts */}
                                <div className = "flex flex-col flex-grow">
                                    <div className = "relative h-full items-start flex flex-col justify-center">
                                        <div className = "py-[2px] max-w-full">
                                            <Heading>Garrett Hockersmith</Heading>
                                        </div>
                                    </div>
                                    <Description>0 posts</Description>
                                </div>
                                {/* Search */}
                               <div className = "flex flex-col min-w-[56px] min-h-[32px] align-stretch items-end justify-center ">
                                    <button className = "rounded-full hover:bg-foreground/10 transition-colors duration-200 min-w-[36px] min-h-[36px]">
                                        <div className = "items-center flex flex-col">
                                            <GoSearch className = "size-5 align-middle"/>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Page Content */}
                        <div className = "flex flex-col w-full h-full">
                            {/* Banner */}
                            <div>
                               <img src="https://pbs.twimg.com/profile_banners/1880124371228065792/1737092855/1080x360" alt="" />
                            </div>
                            {/* Info */}
                            <div>
                                {/* Avatar & Edit Profile*/}
                                <div className = "flex flex-row items-center justify-between px-4 pt-4">
                                    <div>
                                        <ProfilePicture/>
                                    </div>
                                    <div>
                                        <EditProfileButton/>
                                    </div>
                                </div>
                                {/* Name & tag */}
                                <div></div>
                                {/* Bio */}
                                <div></div>
                                {/* Stats */}
                                <div></div>
                                {/* following & followers */}
                                <div></div>
                                {/* whos following */}
                                <div></div>
                            </div>
                            {/* Nav */}
                            <div></div>
                            {/* Posts */}
                            <section>
                            </section>
                        </div>
                    </div>
                    <RightSideBar/>
                </div>
            </div>
         </main>
      </div>
    </div>
  );
}
