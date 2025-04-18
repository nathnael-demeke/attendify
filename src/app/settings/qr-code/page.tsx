'use client'
import * as React from "react";
import styles from "../page.module.css";
import CoreSearchbarAppbar from "@/widgets/UI/SearchbarAppbar";
import useScreenSize from "@/hooks/useScreenSize";
import CoreNormalAppbar from "@/widgets/UI/NormalAppbar";
import CoreNavDrawer from "@/widgets/UI/NavDrawer";
import List, { ListItem, ListItemToggle } from "@/components/lists/Lists";
import { useNavDrawer } from "@/context/NavDrawerContext";
import Container from "@/components/containers/Containers";
import Link from "@/components/links/Links";
import Dialog from "@/components/dialogs/Dialogs";
import Form from "@/components/forms/Forms";
import ToggleInput from "@/components/inputs/toggle-inputs/Toggle-inputs";
import Button from "@/components/buttons/Buttons";

export default function QRCodeSettings() {

	const { isNavDrawerOpen, toggleNavDrawer } = useNavDrawer();
	const isLargeScreen: boolean = useScreenSize(1024);

	const [isQRCodeDialogOpened, setQRCodeDialog] = React.useState(false);
	const [selectedQRCodeOption, setSelectedQRCodeOption] = React.useState("10");
    const [ isManualAttendanceChecked, setManualAttendance ] = React.useState(true);
    const [ isContinuousScanningChecked, setContinuousScanning ] = React.useState(false);

	const handleRadioChange = (value: string) => {
		setSelectedQRCodeOption(value);
	};

	return (
		<>
			{isLargeScreen ? <CoreNormalAppbar navdrawerOpener={toggleNavDrawer} title="QR Code Settings" /> : <CoreSearchbarAppbar hideSettingsBtn title="QR Code Settings" />}
			{isLargeScreen && <CoreNavDrawer isOpen={isNavDrawerOpen} active={1} />}
			<Container hasSearchbarAppbar hasNavbar={false} navDrawerOpen={isNavDrawerOpen}>
				<List>
					<ListItem icon="qr_code" heading="QR Code in a paper" supportingText={selectedQRCodeOption} onClick={() => setQRCodeDialog(true)} />
				</List>
				<List>
					<ListItemToggle checked={isManualAttendanceChecked} onChange={() => setManualAttendance(!isManualAttendanceChecked)} id="manual-attendance" icon="auto_transmission" heading="Manual Attendance Entry" supportingText="Manual attendance entry if QR code scanning fails." />
					<ListItemToggle checked={isContinuousScanningChecked} onChange={() => setContinuousScanning(!isContinuousScanningChecked)} id="continuous-scanning" icon="resume" heading="Continuous Scanning" supportingText="Scan without restarting the scanner for each student." />
				</List>
                <List heading="Looking for something?" sectionClassName={styles.ql_list} >
					<Link padded href="/settings/account">Account Settings</Link>
					<Link padded href="/settings/account">Privacy Policy</Link>
					<Link padded href="/settings/account">Help & Support</Link>
					<Link padded href="/settings/account">User Guides</Link>
				</List>
				<Dialog
					isOpen={isQRCodeDialogOpened}
					onClose={() => setQRCodeDialog(false)}
					subtitle="Select QR code number in a paper"
					type="basic"
					actions={<Button variant="filled" onClick={() => setQRCodeDialog(false)}>Close</Button>}
				>
					<Form
						inputs={<>
							<ToggleInput
								type="radio"
								name="qrCodeOption"
								label="10"
								checked={selectedQRCodeOption === "10"}
								onChange={() => handleRadioChange("10")}
								color="primary"
							/>
							<ToggleInput
								type="radio"
								name="qrCodeOption"
								label="15"
								checked={selectedQRCodeOption === "15"}
								onChange={() => handleRadioChange("15")}
								color="primary"
							/>
							<ToggleInput
								type="radio"
								name="qrCodeOption"
								label="20"
								checked={selectedQRCodeOption === "20"}
								onChange={() => handleRadioChange("20")}
								color="primary"
							/>
						</>}
					/>
				</Dialog>
			</Container>
		</>
	);
}
