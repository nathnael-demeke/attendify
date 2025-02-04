'use client'
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import CoreSearchbarAppbar from "@/widgets/UI/SearchbarAppbar";
import useScreenSize from "@/hooks/useScreenSize";
import CoreNormalAppbar from "@/widgets/UI/NormalAppbar";
import CoreNavDrawer from "@/widgets/UI/NavDrawer";
import CoreNavbar from "@/widgets/UI/Navbar";
import { useNavDrawer } from "@/context/NavDrawerContext";
import Container from "@/components/containers/Containers";
import List, { ListItem } from "@/components/lists/Lists";
import { data } from "../data";

export default function StudentsList() {
	const { isNavDrawerOpen, toggleNavDrawer } = useNavDrawer();

	const isLargeScreen: boolean = useScreenSize(1024);

    const params: {grade: string} = useParams();

     // Extract the grade, section, and stream
    const grade = parseInt(params.grade, 10);
    const sectionMatch = params.grade.match(/[A-Za-z]+/);
    const section = sectionMatch ? sectionMatch[0] : null;
    const streamMatch = params.grade.match(/[NS]/);
    const stream = streamMatch ? streamMatch[0] : undefined;
    
	return (
	  	<>
			{isLargeScreen ? <CoreNormalAppbar navdrawerOpener={toggleNavDrawer} title="Students List" /> : <CoreSearchbarAppbar title="Students List" />}
			{isLargeScreen ? <CoreNavDrawer isOpen={isNavDrawerOpen} active={2} /> : <CoreNavbar active={2} />}
            <Container hasSearchbarAppbar navDrawerOpen={isNavDrawerOpen}>
                <>
                    <List heading="Grade 10, section B Students">
                        {data.map((student, id) => (
                            <ListItem 
                                key={student.id} 
                                listNum={id + 1}
                                heading={student.fullname} 
                                supportingText={`${student.status} - ${student.grade}`} 
                                info={student.uid} 
                                href={`/students/id${student.id}`}
                            />
                        ))}
                    </List>
                </>
            </Container>
		</>
	);
}
