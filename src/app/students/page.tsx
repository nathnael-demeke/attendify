'use client';
import React from "react";
import styles from "./page.module.css";
import { useNavDrawer } from "@/context/NavDrawerContext";
import useScreenSize from "@/hooks/useScreenSize";
import CoreSearchbarAppbar from "@/widgets/UI/SearchbarAppbar";
import CoreNormalAppbar from "@/widgets/UI/NormalAppbar";
import CoreNavDrawer from "@/widgets/UI/NavDrawer";
import CoreNavbar from "@/widgets/UI/Navbar";
import Container from "@/components/containers/Containers";
import Button from "@/components/buttons/Buttons";
import Card from "@/components/cards/Cards";

const cardData = [
	{ heading: "Students List", href: "/students/portal", buttonText: "Show List", details: "Explore the comprehensive and detailed list of all students currently enrolled, allowing you to review and manage their information with ease." },
	{ heading: "Add Student", href: "/students/add", buttonText: "Add", details: "Register a new student by adding their details to the system, ensuring they are included in the student database." },
	{ heading: "Reported Students", href: "/reports", buttonText: "See reported", details: "Review the records of all students who were absent today, providing an up-to-date overview of today's attendance." },
	{ heading: "Import Students", href: "#", buttonText: "Import", details: "Import student data seamlessly from another database, allowing you to integrate and consolidate student information into the current system." },
	{ heading: "Download Data", href: "#", buttonText: "Download", details: "Download the complete student data, enabling you to store or analyze the information offline as needed." },
  	{ heading: "School Data", href: "#", buttonText: "Download", details: "Download the entire school's data, including comprehensive information from the main company, to ensure you have a complete and consolidated record for all entities." }
];

export default function Students() {
	const { isNavDrawerOpen, toggleNavDrawer } = useNavDrawer();
	const isLargeScreen = useScreenSize(1024);

	return (
		<>
			{isLargeScreen ? <CoreNormalAppbar navdrawerOpener={toggleNavDrawer} title="Students" /> : <CoreSearchbarAppbar title="Students" />}
			{isLargeScreen ? <CoreNavDrawer isOpen={isNavDrawerOpen} active={2} /> : <CoreNavbar active={2} />}
			<Container hasSearchbarAppbar navDrawerOpen={isNavDrawerOpen} className={styles.container}>
				<div className={styles.actions_list}>
					{cardData.map(({ heading, href, buttonText, details }) => (
						<Card
							key={heading}
							heading={heading}
							type="filled"
							details={details}
							actions={<Button variant="outlined" href={href}>{buttonText}</Button>}
							className={styles.box}
						/>
					))}
				</div>
				<div className={styles.action_button}>
					<Button variant="extended" icon="add" href="/students/add">Add Student</Button>
				</div>
			</Container>
		</>
	);
}	
