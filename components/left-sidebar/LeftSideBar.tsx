"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { BsBookmark, BsTwitterX, BsThreeDots } from "react-icons/bs";
import { GoHomeFill, GoSearch } from "react-icons/go";
import { GrNotification } from "react-icons/gr";
import { FaRegEnvelope } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Description, Heading, Subheading } from "../text";

const NAVIGATION_ITEMS = [
  { title: "Home", icon: GoHomeFill, href: "/" },
  { title: "Explore", icon: GoSearch, href: "/explore" },
  { title: "Notifications", icon: GrNotification, href: "/notifications" },
  { title: "Messages", icon: FaRegEnvelope, href: "/messages" },
  { title: "Bookmarks", icon: BsBookmark, href: "/bookmarks" },
  { title: "Profile", icon: BiUser, href: "/profile" }, // This will be replaced with user profile link below
];

const LeftSideBar = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setUser(profile);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className = "w-full flex">
      <SidebarProvider className = "justify-end">
        <Sidebar side = "left" variant="sidebar" collapsible="none" className="justify-between px-2 w-[275px]">
          <div>
            <div className = "flex self-stretch py-[2px]">
              <Link
                href="/"
                className="items-center justify-center min-h-[52px] min-w-[52px] flex"
              >
                <BsTwitterX className="w-[27px] h-[27px]" />
              </Link>
            </div>
            <div className = "mt-[2px] mb-1 ">
              <SidebarMenu>
                {NAVIGATION_ITEMS.slice(0, -1).map((item, index) => (
                  <div className = "flex self-stretch py-1 "key={index}>
                    <Link href={item.href}>
                      <div className="flex flex-row p-3">
                        <item.icon className=" !w-[26.25px] !h-[26.25px] "/>
                        <div className="flex items-center ml-5 mr-4">
                          <Heading>{item.title}</Heading>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
                {/* User Profile Link */}
                {user && (
                  <div className = "flex self-stretch py-1">
                    <Link href={`/profile/${user.id}`}>
                      <div className = "flex flex-row p-3">
                        <BiUser className=" !w-[26.25px] !h-[26.25px] "/>
                        <div className="flex items-center ml-5 mr-4">
                          <Heading>Profile</Heading>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </SidebarMenu>
            </div>
            <button className="my-4 bg-foreground hover:bg-opacity-90 text-background font-bold text-lg rounded-full px-6 py-3 w-[90%] self-start">
              Post
            </button>
          </div>
          {user && (
              <Link href={`/profile/${user.id}`}>
                <button className="p-[12px] rounded-full flex flex-row items-center cursor-pointer outline-none w-full my-3">
                  <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={user.avatar_url || "/default-avatar.jpg"}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex flex-col align-center min-w-0 mx-3 flex-1 w-full">
                    <Subheading>
                      <span className="whitespace-nowrap overflow-ellipsis block">{user.full_name}</span>
                    </Subheading>
                    <Subheading>
                      <span className="text-muted font-normal">@{user.username}</span>
                    </Subheading>
                  </div>
                  <div className="items-end flex-grow fill-foreground align-bottom h-5 flex justify-end">
                    <BsThreeDots />
                  </div>
                </button>
              </Link>
            )}
        </Sidebar>
      </SidebarProvider>
    </div>
  );
};

export default LeftSideBar;
