
'use client'
import React from "react"
import { Accordion , AccordionItem} from "@/components/accordions/Accordions";
import CoreSearchbarAppbar from "@/widgets/UI/SearchbarAppbar";
import useScreenSize from "@/hooks/useScreenSize";
import CoreNormalAppbar from "@/widgets/UI/NormalAppbar";
import CoreNavDrawer from "@/widgets/UI/NavDrawer";
import CoreNavbar from "@/widgets/UI/Navbar";
import { useNavDrawer } from "@/context/NavDrawerContext";
import Container from "@/components/containers/Containers";
import List, { ListItem } from "@/components/lists/Lists";

export default function EditAttendancePortal() {
	const { isNavDrawerOpen, toggleNavDrawer } = useNavDrawer();

	const isLargeScreen: boolean = useScreenSize(1024);

	return (
	  	<>
			{isLargeScreen ? <CoreNormalAppbar navdrawerOpener={toggleNavDrawer} title="Edit Attendance Portal" /> : <CoreSearchbarAppbar title="Edit Attendance Portal" />}
			{isLargeScreen ? <CoreNavDrawer isOpen={isNavDrawerOpen} active={3} /> : <CoreNavbar active={3} />}
            <Container hasSearchbarAppbar navDrawerOpen={isNavDrawerOpen}>
                <Accordion variant="filled" title="Select Grade and Section">
                    <AccordionItem label="Grade 9">
                        <List>
                            <ListItem href="/attendance/edit?grade=9&section=A" heading="section A" />
                            <ListItem href="/attendance/edit?grade=9&section=B" heading="section B" />
                            <ListItem href="/attendance/edit?grade=9&section=C" heading="section C" />
                            <ListItem href="/attendance/edit?grade=9&section=D" heading="section D" />
                        </List>
                    </AccordionItem>
                    <AccordionItem label="Grade 10">
                        <List>
                            <ListItem href="/attendance/edit?grade=10&section=A" heading="section A" />
                            <ListItem href="/attendance/edit?grade=10&section=B" heading="section B" />
                            <ListItem href="/attendance/edit?grade=10&section=C" heading="section C" />
                            <ListItem href="/attendance/edit?grade=10&section=D" heading="section D" />
                        </List>
                    </AccordionItem>
                    <AccordionItem label="Grade 11">
                        <Accordion variant="filled">
                            <AccordionItem label="Natural Science">
                                <List>
                                    <ListItem href="/attendance/edit?grade=11&section=A&&stream=N" heading="section A" />
                                    <ListItem href="/attendance/edit?grade=11&section=B&&stream=N" heading="section B" />
                                    <ListItem href="/attendance/edit?grade=11&section=C&&stream=N" heading="section C" />
                                    <ListItem href="/attendance/edit?grade=11&section=D&&stream=N" heading="section D" />
                                </List>
                            </AccordionItem>
                            <AccordionItem label="Social Science">
                                <List>
                                    <ListItem href="/attendance/edit?grade=11&section=A&&streamS" heading="section A" />
                                    <ListItem href="/attendance/edit?grade=11&section=B&&streamS" heading="section B" />
                                    <ListItem href="/attendance/edit?grade=11&section=C&&streamS" heading="section C" />
                                    <ListItem href="/attendance/edit?grade=11&section=D&&streamS" heading="section D" />
                                </List>
                            </AccordionItem>
                        </Accordion>
                    </AccordionItem>
                </Accordion>
            </Container>
		</>
	);
}