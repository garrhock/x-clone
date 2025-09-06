'use client'
import React from 'react'
import { useEffect, useState } from "react";
import { MdMoreHoriz } from 'react-icons/md'
import Container from './container';
import Text from '@/components/text'
import { ProfilePicture, NameAndTag, FollowButton } from '@/components/profile'
import SearchBar from '@/components/ui/search-bar'
import { getProfileById } from '@/lib/supabase/queries.client';
const RightSideBar = () => {
    const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/suggested-users'); // Example endpoint
                const contentType = response.headers.get('content-type') || '';
                if (!response.ok || !contentType.includes('application/json')) {
                    console.warn('suggested-users endpoint missing or not JSON; skipping');
                    return;
                }
                const userIds: string[] = await response.json();

                const profiles = await Promise.all(
                    userIds.map(async (id) => {
                        try { return await getProfileById(id); } catch { return null; }
                    })
                );
                setSuggestedUsers(profiles.filter(Boolean) as any[]); // Remove nulls
            } catch (e) {
                console.error('Failed to load suggested users', e);
            }
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
                                <Text variant = "heading" color = "foreground"> 
                                    What's happening?
                                </Text>
                            </div>
                            {/* Start Posts */}
                            <div className = "flex flex-col items-stretch px-[16px] py-[12px]">
                                <div className = "flex flex-row justify-between">
                                    <Text variant = "description" color = "muted">Trending</Text>
                                    <div className = "fill-muted">
                                        <div className = "text-muted text-[15px]/[20px] items-center font-normal justify-start min-w-0 wrap-break-word flex">
                                            <MdMoreHoriz className = "w-[1.25em align-text-bottom max-w-full h-[1.25em] inline-block"/>
                                        </div>
                                    </div>
                                </div>
                                <Text variant = "subheading" color = "foreground">
                                    TITLE
                                </Text>
                                <div className='mt-1'>
                                    <Text variant = "description" color = "muted">
                                        1,000 posts
                                    </Text>
                                </div>
                            </div>
                            <div className = "flex flex-col items-stretch px-[16px] py-[12px]">
                                <div className = "flex flex-row justify-between">
                                    <Text variant = "description" color = "muted">Trending</Text>
                                    <div className = "fill-muted">
                                        <div className = "text-muted text-[15px]/[20px] items-center font-normal justify-start min-w-0 wrap-break-word flex">
                                            <MdMoreHoriz className = "w-[1.25em align-text-bottom max-w-full h-[1.25em] inline-block"/>
                                        </div>
                                    </div>
                                </div>
                                <Text variant = "subheading" color = "foreground">
                                    TITLE
                                </Text>
                                <div className='mt-1'>
                                    <Text variant = "description" color = "muted">
                                        1,000 posts
                                    </Text>
                                </div>
                            </div>
                            <div className = "flex flex-col items-stretch px-[16px] py-[12px]">
                                <div className = "flex flex-row justify-between">
                                    <Text variant = "description" color = "muted">Trending</Text>
                                    <div className = "fill-muted">
                                        <div className = "text-muted text-[15px]/[20px] items-center font-normal justify-start min-w-0 wrap-break-word flex">
                                            <MdMoreHoriz className = "w-[1.25em align-text-bottom max-w-full h-[1.25em] inline-block"/>
                                        </div>
                                    </div>
                                </div>
                                <Text variant = "subheading" color = "foreground">
                                    TITLE
                                </Text>
                                <div className='mt-1'>
                                    <Text variant = "description" color = "muted">
                                        1,000 posts
                                    </Text>
                                </div>
                            </div>
                            <div className = "flex flex-col items-stretch px-[16px] py-[12px]">
                                <div className = "flex flex-row justify-between">
                                    <Text variant = "description" color = "muted">Trending</Text>
                                    <div className = "fill-muted">
                                        <div className = "text-muted text-[15px]/[20px] items-center font-normal justify-start min-w-0 wrap-break-word flex">
                                            <MdMoreHoriz className = "w-[1.25em align-text-bottom max-w-full h-[1.25em] inline-block"/>
                                        </div>
                                    </div>
                                </div>
                                <Text variant = "subheading" color = "foreground">
                                    TITLE
                                </Text>
                                <div className='mt-1'>
                                    <Text variant = "description" color = "muted">
                                        1,000 posts
                                    </Text>
                                </div>
                            </div>
                            {/* End Posts */}
                        </Container>
                        {/* Who to follow */}
                        <Container>
                            {/* Title */}
                            <div className = "px-[16px] py-[12px] justify-center">
                                <Text variant = "heading" color = "foreground"> 
                                    Who to Follow
                                </Text>
                            </div>
                            {/* Suggested Following List */}
                            <ul role='list'>
                                {suggestedUsers.map(user => (
                                    <li key={user.id} role='listitem' className="py-[12px] px-[16px] cursor-pointer">
                                        <div className="flex flex-row flex-grow">
                                            <div className="mr-2">
                                                <ProfilePicture userId={user.id} avatarUrl={user.avatar_url} size="sm" />
                                            </div>
                                            <div className="flex flex-row justify-between w-full">
                                                <div className="flex flex-col">
                                                    <span className="font-bold">{user.full_name}</span>
                                                    <span className="text-muted">@{user.username}</span>
                                                </div>
                                                <FollowButton userId={user.id} />
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