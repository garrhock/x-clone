
import LeftSideBar from "@/components/left-sidebar/LeftSideBar";
import HomePageTimeline from "@/components/Timeline/HomePageTimeline";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center relative bg-black text-white">
      <div className="w-full max-w-[1385px] h-full flex relative">
        <LeftSideBar />
        <HomePageTimeline/>
      </div>
    </div>
  );
}
