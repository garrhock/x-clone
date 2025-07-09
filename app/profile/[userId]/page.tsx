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

export default async function ProfilePage({ params }: { params: { userId: string } }) {
  const userProfile = await getProfileById(params.userId);

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
          <div className="w-[1050px] items-stretch flex flex-col flex-grow flex-shrink ">
            <div className="justify-between items-stretch flex flex-row flex-grow w-full ">
              <div className="max-w-[600px] flex flex-col border-l-[1px] border-r-[1px] border-border flex-grow w-full">
                {/* Top Bar */}
                <div className="flex flex-row align- items-stretch z-10 justify-around backdrop-blur-md bg-background/75 sticky top-0 border-b-[0.5px] border-border">
                  <div className="flex flex-row items-center justify-between w-full px-4 h-[53px]">
                    {/* Back Button */}
                    <div className="flex flex-col min-w-[56px] min-h-[32px] align-stretch items-start justify-center ">
                      <button className="rounded-full hover:bg-foreground/10 transition-colors duration-200 min-w-[36px] min-h-[36px]">
                        <div className="items-center flex flex-col">
                          <IoArrowBackOutline className="size-5 align-middle" />
                        </div>
                      </button>
                    </div>
                    {/* Name + num posts */}
                    <div className="flex flex-col flex-grow">
                      <div className="relative h-full items-start flex flex-col justify-center">
                        <div className="py-[2px] max-w-full">
                          <Text variant="heading">{userProfile.full_name}</Text>
                        </div>
                      </div>
                      <Text variant="description" color="muted"> 0 posts </Text>
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
                      <div className="-translate-y-[60%]">
                        <ProfilePicture userId={userProfile.id} avatarUrl={userProfile.avatar_url} size="lg" />
                      </div>
                      <div>
                        {/* This client component decides which button to show */}
                        <ProfileActionButton profileId={userProfile.id} />
                      </div>
                    </div>
                    {/* Name & tag */}
                    <div className="flex flex-col">
                      <Text variant="heading">{userProfile.full_name}</Text>
                      <div className="text-muted text-[15px]/[20px] font-normal text-ellipsis wrap-break-word">
                        <span>@{userProfile.username}</span>
                      </div>
                    </div>
                    {/* Bio */}
                    <Text variant="description" color="foreground">
                      {userProfile.bio}
                    </Text>
                    {/* Location & when Joined */}
                    <div className="flex flex-row ">
                      <div className="flex flex-row">
                        <MdLocationOn />
                        <Text variant="description" color="foreground">
                          Texas
                        </Text>
                      </div>
                      <div className="flex flex-row">
                        <IoCalendarSharp />
                        <Text variant="description" color="foreground">
                          Joined January 2020
                        </Text>
                      </div>
                    </div>
                    {/* following & followers */}
                    <div className="flex flex-row justify-start">
                      <div className="flex flex-row">
                        <Text variant="description" color="foreground">
                          <span className="text-foreground font-bold">n</span>
                        </Text>
                        <Text variant="description" color="foreground">
                          Following
                        </Text>
                      </div>
                      <div className="flex flex-row">
                        <Text variant="description" color="foreground">
                          <span className="text-foreground font-bold">n</span>
                        </Text>
                        <Text variant="description" color="foreground">
                          Followers
                        </Text>
                      </div>
                    </div>
                  </div>
                  {/* Nav */}
                  <Menubar className="border-b-[0.5px] border-border justify-between px-4">
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
                  <UserTimeline userId={params.userId} />
                  <div className="px-[16px] py-[12px] justify-center">
                    <Text variant="heading" color="muted">
                      Who to Follow
                    </Text>
                  </div>
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
