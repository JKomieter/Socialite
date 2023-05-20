import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";
import { Tb3DCubeSphere } from "react-icons/tb";

const NotificationFeed = () => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()

    const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id)

    useEffect(() => {
        //refresh to keep the notification dot updated
        //it is set to false whenever notifications is got
        mutateCurrentUser()
    }, [mutateCurrentUser])

    if (fetchedNotifications.length === 0) {
        return (
            <div className="
                text-neutral-600
                text-center
                text-xl
            ">
                No notifications
            </div>
        )
    }


    return (
        <div className="flex flex-col">
            {
                fetchedNotifications?.map((notification: Record<string, any>) => (
                    <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
                        <Tb3DCubeSphere color="white" size={32}/>
                        <p className="text-white">
                            {notification.body}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}


export default NotificationFeed;