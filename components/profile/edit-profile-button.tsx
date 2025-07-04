import { Subheading } from "@/components/text"

export default function EditProfileButton({ onClick }: { onClick?: () => void }) {
    return (
        <div className="mb-3 px-4 min-h-9 min-w-9 border border-muted rounded-full bg-transparent cursor-pointer flex grow">
            <button onClick={onClick}>
                <Subheading>Edit profile</Subheading>
            </button>
        </div>
        
    );
}

