import LeftSideBar from "@/components/left-sidebar/LeftSideBar";
import RightSideBar from "@/components/right-sidebar/RightSideBar";
import { IoArrowBackOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import Text from "@/components/text";
import ProfilePicture from "@/components/profile/avatar";
import Banner from "@/components/profile/profile-banner";
import { IoCalendarSharp } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import UserTimeline from "@/components/profile/user-posts";
import ProfileActionButton from "@/components/profile/profile-action-button"; // See below
import { getProfileById } from "@/lib/supabase/queries/get-profile";
import { countFollowers, countFollowing } from "@/lib/supabase/queries/follow";
import { countPosts } from "@/lib/supabase/queries/count-posts";
import Link from "next/dist/client/link";


export default async function ProfilePage({ params }: { params: { userId: string } }) {
  const { userId } = await params; // <-- Await params here
  
  const userProfile = await getProfileById(userId);
  const followersCount = await countFollowers(userId);
  const followingCount = await countFollowing(userId);
  const postsCount = await countPosts(userId);
  if (!userProfile) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black text-white">
        <Text variant="heading">User not found</Text>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center relative bg-black text-white">
      <div className="w-full max-w-[1385px] mx-auto h-full flex relative">
        <LeftSideBar />
        <main className="w-full h-full flex flex-col items-start">
          <div className="w-[1050px] items-stretch flex flex-col flex-grow flex-shrink overflow-y-auto">
            <div className="justify-between items-stretch flex flex-row flex-grow w-full ">
              <div className="max-w-[600px] flex flex-col border-l-[1px] border-r-[1px] border-border flex-grow w-full">
                {/* Top Bar */}
                <div className="flex flex-row align- items-stretch z-10 justify-around backdrop-blur-md bg-background/75 sticky top-0 border-b-[0.5px] border-border">
                  <div className="flex flex-row items-center justify-between w-full px-4 h-[53px]">
                    {/* Back Button */}
                    <div className="flex flex-col min-w-[56px] min-h-[32px] align-stretch items-start justify-center ">
                        <div className="items-center flex flex-col">
                          <Link 
                            href="/"
                            className="rounded-full hover:bg-foreground/10 transition-colors duration-200 min-w-[36px] min-h-[36px] inline-flex items-center justify-center"
                          >
                            <IoArrowBackOutline className="size-5 align-middle" />
                          </Link>
                        </div>
                    </div>
                    {/* Name + num posts */}
                    <div className="flex flex-col flex-grow">
                      <div className="relative h-full items-start flex flex-col justify-center">
                        <div className="py-[2px] max-w-full">
                          <Text variant="heading">{userProfile.full_name}</Text>
                        </div>
                      </div>
                        <Text variant="description" color="muted">
                        {postsCount} posts {/* Display the post count */}
                      </Text>
                    </div>
                    {/* Search */}
                    <div className="flex flex-col min-w-[56px] min-h-[32px] align-stretch items-end justify-center ">
                      <button className="rounded-full hover:bg-foreground/10 transition-colors duration-200 min-w-[36px] min-h-[36px]">
                        <div className="items-center flex flex-col">
                          <GoSearch className="size-5 align-middle" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Page Content */}
                <div className="flex flex-col w-full h-full">
                  {/* Banner */}
                  <Banner userId={userProfile.id} />
                  {/* Info */}
                  <div className="pt-3 px-4 mb-4">
                    {/* Avatar & Edit Profile/Follow */}
                    <div className="flex flex-row items-start justify-between flex-wrap">
                      <div className="mt-[-85px]">
                        <ProfilePicture userId={userProfile.id} avatarUrl={userProfile.avatar_url} size="lg" />
                      </div>
                      <div>
                        {/* This client component decides which button to show */}
                        <ProfileActionButton profileId={userProfile.id} />
                      </div>
                    </div>
                    {/* Name & tag */}
                    <div className="flex flex-col my-6 mb-3">
                      <Text variant="heading">{userProfile.full_name}</Text>
                      <div className="text-muted text-[15px]/[20px] font-normal text-ellipsis wrap-break-word">
                        <span>@{userProfile.username}</span>
                      </div>
                    </div>
                    {/* Bio */}
                    <Text variant="subheading" color="foreground" className="font-normal mb-3">
                      Bio
                      {userProfile.bio}
                    </Text>
                    {/* Location & when Joined */}

                    <div className="flex flex-row gap-3 mb-3">
                      {userProfile.location && (
                        <div className="flex flex-row items-center gap-1">
                          <MdLocationOn className="text-muted size-5" />
                          <Text variant="subheading" color="muted" className="font-normal align-middle">
                            {userProfile.location}
                          </Text>
                        </div>
                      )}
                      <div className="flex flex-row items-center gap-1">
                        <IoCalendarSharp className="text-muted size-4" />
                        <Text variant="subheading" color="muted" className="font-normal align-middle">
                          Joined January 2020
                        </Text>
                      </div>
                    </div>

                    {/* following & followers */}
                    <div className="flex flex-row justify-start gap-3">
                      <div className="flex flex-row items-center gap-1">
                        <Text variant="subheading" color="white" className="font-normal align-middle">
                          <span className="text-foreground font-bold">{followingCount}</span>
                        </Text>
                        <Text variant="subheading" color="muted" className="font-normal align-middle">
                          Following
                        </Text>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <Text variant="subheading" color="white" className="font-normal align-middle">
                          <span className="text-foreground font-bold">{followersCount}</span>
                        </Text>
                        <Text variant="subheading" color="muted" className="font-normal align-middle">
                          Followers
                        </Text>
                      </div>
                    </div>

                  </div>
                  {/* Nav */}
                  <Menubar className="border-b-[0.5px] border-border justify-between px-4 h-[53px]">
                    <MenubarMenu>
                      <MenubarTrigger>Posts</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>Replies</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>Highlights</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>Articles</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>Media</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>Likes</MenubarTrigger>
                    </MenubarMenu>
                  </Menubar>
                  {/* Posts */}
                  <UserTimeline userId={userId} />
                  
                </div>
              </div>
              <RightSideBar />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
