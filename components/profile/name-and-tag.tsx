export default function NameAndTag() {
    return (
        <div className = "flex flex-col">
            <div className = "text-foreground text-[15px]/[20px] font-bold overflow-hidden wrap-break-word">
                <span>User's Name</span>
            </div>
            <div className = "text-muted text-[15px]/[20px] font-normal text-ellipsis wrap-break-word">
                <span>@username</span>
            </div>
        </div>
    );
}
