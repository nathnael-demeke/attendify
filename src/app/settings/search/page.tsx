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
import Button from "@/components/buttons/Buttons";

export default function SearchFiltersSettings() {

	const { isNavDrawerOpen, toggleNavDrawer } = useNavDrawer();
	const isLargeScreen: boolean = useScreenSize(1024);

    const [ isSaveHistoryChecked, setSaveHistory ] = React.useState(true);
    const [ isAutoSuggestionsChecked, setAutoSuggestions ] = React.useState(true);

	const [ isClearHistoryDialogOpen, setClearHistoryDialog ] = React.useState(false);

	return (
	  	<>
			{isLargeScreen ? <CoreNormalAppbar navdrawerOpener={toggleNavDrawer} title="Search Filters Settings" /> : <CoreSearchbarAppbar hideSettingsBtn title="Search Filters Settings" />}
			{isLargeScreen && <CoreNavDrawer isOpen={isNavDrawerOpen} active={1} /> }
			<Container hasSearchbarAppbar hasNavbar={false} navDrawerOpen={isNavDrawerOpen}>
				<List>
					<ListItemToggle checked={isSaveHistoryChecked} onChange={() => setSaveHistory(!isSaveHistoryChecked)} icon="bookmark" id="profile-edited" heading="Save Search Queries" />
					<ListItemToggle checked={isAutoSuggestionsChecked} onChange={() => setAutoSuggestions(!isAutoSuggestionsChecked)} icon="prompt_suggestion" id="student-edited" heading="Auto-Suggestions" />
				</List>
				<List>
					<ListItem heading="View Search History" href="/settings/search/history" supportingText=" view recent searches." icon="manage_search" />
					<ListItem heading="Clear Search History" onClick={() => setClearHistoryDialog(true)} supportingText="clear search history for privacy." icon="clear_all" />
				</List>
                <List heading="Looking for something?" sectionClassName={styles.ql_list} >
					<Link padded href="/settings/account">Account Settings</Link>
					<Link padded href="/settings/account">Privacy Policy</Link>
					<Link padded href="/settings/account">Help & Support</Link>
					<Link padded href="/settings/account">User Guides</Link>
				</List>
				<Dialog
					isOpen={isClearHistoryDialogOpen}
					onClose={() => setClearHistoryDialog(false)} 
					title="Clear Search history"
					type="basic"
					actions={<>
						<Button variant="outlined" onClick={() => setClearHistoryDialog(false)}>Cancle</Button>
						<Button variant="filled" /**Perform action */>Continue</Button>
					</>} 
				>
					Are you sure you want to permanently clear search history from the database? This action cannot be undone.
				</Dialog>
			</Container>
		</>
	);
}