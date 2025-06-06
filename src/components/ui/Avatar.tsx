import { useAppSelector } from "@/store/hooks";

const Avatar = () => {
    const { user } = useAppSelector((state) => state.auth);
    
    return (
        <div>Avatar</div>
    )
}

export default Avatar