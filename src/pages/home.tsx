import SignOutButton from "@/components/auth/sign-out-button";
import Calendar from "@/components/calendar";

export default function HomePage() {
    return (
        <>
            <Calendar />

            <div className="flex items-center justify-center mt-10">
                <SignOutButton />
            </div>
        </>
    );
}
