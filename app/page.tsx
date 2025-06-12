
import LeftSideBar from "@/components/LeftSideBar";
import HomePageTimeline from "@/components/HomePageTimeline";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black text-white">
      <div className="w-full max-w-[1385px] mx-auto h-full flex relative">
        <LeftSideBar />
        <HomePageTimeline/>
      </div>
    </div>
  );
}
