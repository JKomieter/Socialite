import Header from "@/components/header";
import NotificationFeed from "@/components/layout/notificationfeed";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";


export async function getServerSideProps(context: NextPageContext) {
    // only signed in user can have access to notifications
    const session = await getSession(context)
    //get the session
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    };

    return {
        props: session
    }
}

const Notifications = () => {

    return (
        <>
            <Header label='Notifications' showBackArrow/>
            <NotificationFeed/>
        </>
    )
}

export default Notifications;