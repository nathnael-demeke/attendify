'use client'
import * as React from "react";
import styles from "../page.module.css";
import CoreSearchbarAppbar from "@/widgets/UI/SearchbarAppbar";
import useScreenSize from "@/hooks/useScreenSize";
import CoreNormalAppbar from "@/widgets/UI/NormalAppbar";
import CoreNavDrawer from "@/widgets/UI/NavDrawer";
import List, { ListItemToggle } from "@/components/lists/Lists";
import { useNavDrawer } from "@/context/NavDrawerContext";
import Container from "@/components/containers/Containers";
import Link from "@/components/links/Links";

export default function NotificationsSettings() {

	const { isNavDrawerOpen, toggleNavDrawer } = useNavDrawer();
	const isLargeScreen: boolean = useScreenSize(1024);

    const [ isNotificationsChecked, setNotifications ] = React.useState(true);
    const [ isProfileEditedChecked, setProfileEdited ] = React.useState(true);
    const [ isStudentEditedChecked, setStudentEdited ] = React.useState(true);
    const [ isDailyAbsentsChecked, setDailyAbsents ] = React.useState(true);
    const [ isQRCodeStatusChecked, setQRCodeStatus ] = React.useState(true);
    const [ isTechnicalErrorsChecked, setTechnicalErrors ] = React.useState(true);
    const [ isNewLogInChecked, setNewLogIn ] = React.useState(true);
    const [ isCallParentChecked, setCallParent ] = React.useState(true);
	
	return (
	  	<>
			{isLargeScreen ? <CoreNormalAppbar navdrawerOpener={toggleNavDrawer} title="Notifications Settings" /> : <CoreSearchbarAppbar hideSettingsBtn title="Notifications Settings" />}
			{isLargeScreen && <CoreNavDrawer isOpen={isNavDrawerOpen} active={1} /> }
			<Container hasSearchbarAppbar hasNavbar={false} navDrawerOpen={isNavDrawerOpen}>
				<List>
					<ListItemToggle checked={isNotificationsChecked} onChange={() => setNotifications(!isNotificationsChecked)} icon="notifications" id="notifications" heading="Notifications" />
				</List>
				<List>
					<ListItemToggle disabled={!isNotificationsChecked} checked={isProfileEditedChecked} onChange={() => setProfileEdited(!isProfileEditedChecked)} icon="notifications" id="profile-edited" heading="When profile is edited" />
					<ListItemToggle disabled={!isNotificationsChecked} checked={isStudentEditedChecked} onChange={() => setStudentEdited(!isStudentEditedChecked)} icon="notifications" id="student-edited" heading="When student is edited (deleted)" />
					<ListItemToggle disabled={!isNotificationsChecked} checked={isDailyAbsentsChecked} onChange={() => setDailyAbsents(!isDailyAbsentsChecked)} icon="notifications" id="daily-absents" heading="Daily absent students" />
					<ListItemToggle disabled={!isNotificationsChecked} checked={isQRCodeStatusChecked} onChange={() => setQRCodeStatus(!isQRCodeStatusChecked)} icon="notifications" id="qr-code-status" heading="QR Code status" />
					<ListItemToggle disabled={!isNotificationsChecked} checked={isTechnicalErrorsChecked} onChange={() => setTechnicalErrors(!isTechnicalErrorsChecked)} icon="notifications" id="technical-errors" heading="Technical errors" />
					<ListItemToggle disabled={!isNotificationsChecked} checked={isNewLogInChecked} onChange={() => setNewLogIn(!isNewLogInChecked)} icon="notifications" id="new-log-in" heading="New log in" />
				</List>
				<List>
					<ListItemToggle disabled={!isNotificationsChecked} checked={isCallParentChecked} onChange={() => setCallParent(!isCallParentChecked)} icon="notifications" id="call-parent" heading="Call parents" supportingText="notify parents/guardians when a student's is absent." />
				</List>
                <List heading="Looking for something?" sectionClassName={styles.ql_list} >
					<Link padded href="/settings/account/privacy">Updates and Offers</Link>
					<Link padded href="/settings/account">Account settings</Link>
					<Link padded href="/info/support/help">Help & Support</Link>
				</List>
			</Container>
		</>
	);
}