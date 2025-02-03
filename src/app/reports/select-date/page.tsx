'use client'
import * as React from "react";
import styles from "../page.module.css";
import CoreSearchbarAppbar from "@/widgets/UI/SearchbarAppbar";
import useScreenSize from "@/hooks/useScreenSize";
import CoreNormalAppbar from "@/widgets/UI/NormalAppbar";
import CoreNavDrawer from "@/widgets/UI/NavDrawer";
import List, { ListItem } from "@/components/lists/Lists";
import { useNavDrawer } from "@/context/NavDrawerContext";
import Container from "@/components/containers/Containers";
import CoreNavbar from "@/widgets/UI/Navbar";
import { ReportByDate } from "./data";
import ReactPaginate from "react-paginate";

export default function SelectDate() {

	const { isNavDrawerOpen, toggleNavDrawer } = useNavDrawer();
    const [pageNumber, setPageNumber] = React.useState(0);
    const studentsPerPage = 10;
    const pagesVisited = pageNumber * studentsPerPage;

    // Slice data to show only items for the current page
    const displayedData = ReportByDate.slice(pagesVisited, pagesVisited + studentsPerPage);
    const pageCount = Math.ceil(ReportByDate.length / studentsPerPage);
	const isLargeScreen: boolean = useScreenSize(1024);

	return (
	  	<>
			{isLargeScreen ? <CoreNormalAppbar navdrawerOpener={toggleNavDrawer} title="Select Date" /> : <CoreSearchbarAppbar title="Select Date" />}
			{isLargeScreen ? <CoreNavDrawer isOpen={isNavDrawerOpen} active={4} /> : <CoreNavbar active={4} /> }
			<Container hasSearchbarAppbar hasNavbar={false} navDrawerOpen={isNavDrawerOpen}>
                    <List heading="Select Date">
                        {displayedData.map((list) => (
                            <ListItem 
                                key={list.id} 
                                listNum={list.id} 
                                heading={list.date} 
                                supportingText={list.dateName ? list.dateName : ""} 
                                href={`/reports/portal?date=${list.date}`}
                            />
                        ))}
                    </List>
					<ReactPaginate
						previousLabel={<span className="material-symbols-outlined">chevron_left</span>}
						nextLabel={<span className="material-symbols-outlined">chevron_right</span>}
						pageCount={pageCount}
						onPageChange={({selected}) => {
							setPageNumber(selected);
						}}
						containerClassName={styles.pagination}
						activeClassName={styles.active}
						previousClassName={styles.prev_next_btn}
						nextClassName={styles.prev_next_btn}
					/>
			</Container>
		</>
	);
}