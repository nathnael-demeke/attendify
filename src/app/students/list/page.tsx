
'use client'

import { Accordion , AccordionItem} from "@/components/accordions/Accordions";
import CoreSearchbarAppbar from "@/widgets/UI/SearchbarAppbar";
import useScreenSize from "@/hooks/useScreenSize";
import CoreNormalAppbar from "@/widgets/UI/NormalAppbar";
import CoreNavDrawer from "@/widgets/UI/NavDrawer";
import CoreNavbar from "@/widgets/UI/Navbar";
import { useNavDrawer } from "@/context/NavDrawerContext";
import Container from "@/components/containers/Containers";
import List, { ListItem } from "@/components/lists/Lists";

export default function StudentsPortal() {
	const { isNavDrawerOpen, toggleNavDrawer } = useNavDrawer();

	const isLargeScreen: boolean = useScreenSize(1024);

	return (
	  	<>
			{isLargeScreen ? <CoreNormalAppbar navdrawerOpener={toggleNavDrawer} title="Students Portal" /> : <CoreSearchbarAppbar title="Students Portal" />}
			{isLargeScreen ? <CoreNavDrawer isOpen={isNavDrawerOpen} active={2} /> : <CoreNavbar active={2} />}
            <Container hasSearchbarAppbar navDrawerOpen={isNavDrawerOpen}>
                <Accordion variant="filled" title="Select Grade and Section">
                    <AccordionItem label="Grade 9">
                        <List>
                            <ListItem href="/students/list/9A" heading="section A" />
                            <ListItem href="/students/list/9B" heading="section B" />
                            <ListItem href="/students/list/9C" heading="section C" />
                            <ListItem href="/students/list/9D" heading="section D" />
                        </List>
                    </AccordionItem>
                    <AccordionItem label="Grade 10">
                        <List>
                            <ListItem href="/students/list/10A" heading="section A" />
                            <ListItem href="/students/list/10B" heading="section B" />
                            <ListItem href="/students/list/10C" heading="section C" />
                            <ListItem href="/students/list/10D" heading="section D" />
                        </List>
                    </AccordionItem>
                    <AccordionItem label="Grade 11">
                        <Accordion variant="filled">
                            <AccordionItem label="Natural Science">
                                <List>
                                    <ListItem href="/students/list/11A-N" heading="section A" />
                                    <ListItem href="/students/list/11B-N" heading="section B" />
                                    <ListItem href="/students/lsit/11C-N" heading="section C" />
                                    <ListItem href="/students/list/11D-N" heading="section D" />
                                </List>
                            </AccordionItem>
                            <AccordionItem label="Social Science">
                                <List>
                                    <ListItem href="/students/list/11A-S" heading="section A" />
                                    <ListItem href="/students/list/11B-S" heading="section B" />
                                    <ListItem href="/students/list/11C-S" heading="section C" />
                                    <ListItem href="/students/list/11D-S" heading="section D" />
                                </List>
                            </AccordionItem>
                        </Accordion>
                    </AccordionItem>
                </Accordion>
            </Container>
		</>
	);
}