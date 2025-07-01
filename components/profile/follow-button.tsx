export default function FollowButton() {
    return (
        <div className = "min-w-[78px] ml-[12px] ">
            <button className='bg-foreground cursor-pointer px-[16px] min-h-[32px] min-w-[32px] border-transparent rounded-full '>
                <div className = "text-background text-[15px]/[20px] font-bold wrap-break-word justify-center text-center grow ">
                    <span>Follow</span>
                </div>
            </button>
        </div>
    );
}