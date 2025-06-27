
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from '@/components/RightSideBar';

import { IoArrowBackOutline } from "react-icons/io5";
import { GoSearch  } from "react-icons/go";
export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center relative bg-black text-white">
      <div className="w-full max-w-[1385px] mx-auto h-full flex relative">
        <LeftSideBar />
        <main className = "w-full h-full flex flex-col items-start">
            <div className = "w-[1050px] items-stretch flex flex-col flex-grow flex-shrink ">
                <div className= "justify-between items-stretch flex flex-row flex-grow w-full ">
                    <div className="max-w-[600px] flex flex-col border-l-[1px] border-r-[1px] border-border flex-grow w-full">
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
                                    <div className = "relative text-[20px]/[24px] font-bold wrap-break-word h-full items-start flex flex-col justify-center">
                                        <span className = "py-[2px] wrap-break-word max-w-full">Garrett Hockersmith</span>
                                    </div>
                                    <div className = "text-muted text-[13px]/[17px] font-normal ">
                                        <span>0 posts</span>
                                    </div>
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
                    </div>
                    <RightSideBar/>
                </div>
            </div>
         </main>
      </div>
    </div>
  );
}
