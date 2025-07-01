import React from 'react';
import Link from 'next/link';
import { BiUser } from 'react-icons/bi';
import { BsBookmark, BsTwitterX , BsThreeDots } from 'react-icons/bs';
import { GoHomeFill, GoSearch  } from "react-icons/go";
import { GrNotification } from "react-icons/gr";
import { FaRegEnvelope } from "react-icons/fa";

const NAVIGATION_ITEMS = [
  { title: 'Home', icon: GoHomeFill },
  { title: 'Explore', icon: GoSearch  },
  { title: 'Notifications', icon: GrNotification },
  { title: 'Messages', icon: FaRegEnvelope },
  { title: 'Bookmarks', icon: BsBookmark },
  { title: 'Profile', icon: BiUser },
];

const LeftSideBar = () => {
  return (
    <header className="flex flex-col items-end flex-grow">
      <div className="w-[275px] ml-[52px] items-stretch flex flex-col ">
        <div className=" fixed top-0 h-full items-stretch flex flex-col">
          <div className="justify-between w-[275px] h-full overflow-y-auto">
            <div className= "top-0 h-[100%] flex flex-col justify-between px-[8px]">
              {/* TOP: Logo + Nav + Post */}
              <div className="flex flex-col items-start">

                <div className = " flex pt-[2px] pb-[2px] justify-center items-stretch">
                  {/* Logo (circular hover) */}
                  <Link
                    href="/"
                    className="min-h-[52px] min-w-[52px] flex items-center justify-center self-stretch"
                  >
                    <BsTwitterX className="w-[27px] h-[27px]" />
                  </Link>
                </div>

                {/* Navigation */}
                <div className="flex flex-col mt-[2px] mb-[4px] w-[100%]">
                  <nav className="flex flex-col items-start">
                    {NAVIGATION_ITEMS.map((item, index) => (
                      <Link
                        key={index}
                        href={`/${item.title.toLowerCase()}`}
                        className="flex flex-col items-start w-full py-[4px]"
                      >
                      <div className = "p-[12px] flex flex-row items-center justify-center  ">
                          {/* Icon Container */}
                          <div className="w-[26.25px] h-[26.25px]">
                            <item.icon className="w-full h-full text-foreground" />
                          </div>

                          {/* Text Container */}
                          <div className="break-words max-w-full min-w-0 font-normal text-[20px] leading-[24px] ml-[20px] mr-[16px]">
                            <span className="min-w-0 word-wrap-break-word text-foreground">
                              {item.title}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </nav>
                </div>


                {/* Post Button */}
                <button className="bg-foreground hover:bg-opacity-90 text-background font-bold text-lg rounded-full px-6 py-3 mt-4 w-[90%] self-start">
                  Post
                </button>
              </div>

              {/* BOTTOM: Profile */}
              <div className = "my-[12px] items-stretch flex flex-col">
                <button className = "p-[12px] rounded-full flex flex-row items-center cursor-pointer outline-none ">
                  <div className="w-[40px] h-[40px] rounded-full bg-slate-400" />
                  <div className="text-left mx-[12px] flex-shrink max-w-full outline-none flex flex-col">
                    <div className = "flex-shrink outline-none max-w-full ">
                      <div className = "text-foreground text-[15px]/[20px] font-bold items-center ">
                        <span>Garrett Hockersmith</span>
                      </div>
                    </div>
                    <div className = "flex-shrink items-center">
                      <div className = "text-accent text-[15px]/[20px] font-normal ">
                        <span>@garrhock</span>
                      </div>
                    </div>
                  </div>
                  <div className = "items-end flex-grow fill-foreground align-bottom max-w-full h-5 ">
                    <BsThreeDots/>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LeftSideBar;
