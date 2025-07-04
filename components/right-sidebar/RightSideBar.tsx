'use client'
import React from 'react'
import { useEffect, useState } from "react";
import { MdMoreHoriz } from 'react-icons/md'
import { Container } from '@/components/right-sidebar'
import { Heading, Subheading, Description } from '@/components/text'
import { ProfilePictureSM, NameAndTag, FollowButton } from '@/components/profile'
import SearchBar from '@/components/ui/search-bar'
import { createClient } from '@/lib/supabase/client'
const RightSideBar = () => {
    const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const supabase = createClient(); // <-- no await
            const { data, error } = await supabase
                .from("profiles")
                .select("id, full_name, username, avatar_url")
                .limit(5);
            if (!error && data) setSuggestedUsers(data);
        };
        fetchUsers();
    }, []);
  return (
    <div className = "max-w-[350px] w-full mr-[70px]">
        <div className = "min-h-[1246.19px] h-full ">
            <div className = "top-0 w-[350px] fixed ">
                <div className = "flex flex-col items-stretch ">
                    <div className = "flex flex-col items-stretch pb-[64px] pt-[12px] ">
                        {/* Search */}
                        <SearchBar/>
                        {/*What's happening */}
                        <Container>
                            <div className = "px-[16px] py-[12px] justify-center">
                                <Heading>
                                    What's happening?
                                </Heading>
                            </div>
                            {/* Start Posts */}
                            <div className = "flex flex-col items-stretch px-[16px] py-[12px]">
                                <div className = "flex flex-row justify-between">
                                    <Description>Trending</Description>
                                    <div className = "fill-muted">
                                        <div className = "text-muted text-[15px]/[20px] items-center font-normal justify-start min-w-0 wrap-break-word flex">
                                            <MdMoreHoriz className = "w-[1.25em align-text-bottom max-w-full h-[1.25em] inline-block"/>
                                        </div>
                                    </div>
                                </div>
                                <Subheading>
                                    TITLE
                                </Subheading>
                                <div className='mt-1'>
                                    <Description>
                                        1,000 posts
                                    </Description>
                                </div>
                            </div>
                            <div className = "flex flex-col items-stretch px-[16px] py-[12px]">
                                <div className = "flex flex-row justify-between">
                                    <Description>Trending</Description>
                                    <div className = "fill-muted">
                                        <div className = "text-muted text-[15px]/[20px] items-center font-normal justify-start min-w-0 wrap-break-word flex">
                                            <MdMoreHoriz className = "w-[1.25em align-text-bottom max-w-full h-[1.25em] inline-block"/>
                                        </div>
                                    </div>
                                </div>
                                <Subheading>
                                    TITLE
                                </Subheading>
                                <div className='mt-1'>
                                    <Description>
                                        1,000 posts
                                    </Description>
                                </div>
                            </div>
                            <div className = "flex flex-col items-stretch px-[16px] py-[12px]">
                                <div className = "flex flex-row justify-between">
                                    <Description>Trending</Description>
                                    <div className = "fill-muted">
                                        <div className = "text-muted text-[15px]/[20px] items-center font-normal justify-start min-w-0 wrap-break-word flex">
                                            <MdMoreHoriz className = "w-[1.25em align-text-bottom max-w-full h-[1.25em] inline-block"/>
                                        </div>
                                    </div>
                                </div>
                                <Subheading>
                                    TITLE
                                </Subheading>
                                <div className='mt-1'>
                                    <Description>
                                        1,000 posts
                                    </Description>
                                </div>
                            </div>
                            <div className = "flex flex-col items-stretch px-[16px] py-[12px]">
                                <div className = "flex flex-row justify-between">
                                    <Description>Trending</Description>
                                    <div className = "fill-muted">
                                        <div className = "text-muted text-[15px]/[20px] items-center font-normal justify-start min-w-0 wrap-break-word flex">
                                            <MdMoreHoriz className = "w-[1.25em align-text-bottom max-w-full h-[1.25em] inline-block"/>
                                        </div>
                                    </div>
                                </div>
                                <Subheading>
                                    TITLE
                                </Subheading>
                                <div className='mt-1'>
                                    <Description>
                                        1,000 posts
                                    </Description>
                                </div>
                            </div>
                            {/* End Posts */}
                        </Container>
                        {/* Who to follow */}
                        <Container>
                            {/* Title */}
                            <div className = "px-[16px] py-[12px] justify-center">
                                <Heading>
                                    Who to Follow
                                </Heading>
                            </div>
                            {/* Suggested Following List */}
                            <ul role='list'>
                                {suggestedUsers.map(user => (
                                    <li key={user.id} role='listitem' className="py-[12px] px-[16px] cursor-pointer">
                                        <div className="flex flex-row flex-grow">
                                            <div className="mr-2">
                                                <ProfilePictureSM userId={user.id} avatarUrl={user.avatar_url} />
                                            </div>
                                            <div className="flex flex-row justify-between w-full">
                                                <div className="flex flex-col">
                                                    <span className="font-bold">{user.full_name}</span>
                                                    <span className="text-muted">@{user.username}</span>
                                                </div>
                                                <FollowButton />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RightSideBar