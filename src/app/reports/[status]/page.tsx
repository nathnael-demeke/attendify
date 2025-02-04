'use client';

import * as React from "react";
import { Suspense, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import loadingStyles from "../page.module.css";
import useScreenSize from "@/hooks/useScreenSize";
import { useNavDrawer } from "@/context/NavDrawerContext";
import CoreNormalAppbar from "@/widgets/UI/NormalAppbar";
import CoreNavDrawer from "@/widgets/UI/NavDrawer";
import CoreNavbar from "@/widgets/UI/Navbar";
import SearchbarAppbar from "@/components/appbars/top-appbar/searchbar/Searchbar";
import Container from "@/components/containers/Containers";
import Button from "@/components/buttons/Buttons";
import List, { ListItem } from "@/components/lists/Lists";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { format } from "@/functions/report-formatter";
import Image from "next/image";

interface DataType {
    id: number;
    fullname: string;
    status: string;
    grade: string;
    uid: `#${string}`;
}

interface NoAttendanceResponse {
    StatusCode: string;
    Msg: string;
}

const ReportsContent: React.FC = () => {
    const { isNavDrawerOpen, toggleNavDrawer } = useNavDrawer();
    const isLargeScreen: boolean = useScreenSize(1024);

  
    
    

    


    const params: {status: string} = useParams();
    const fullRoute = params.status;
    const parts = fullRoute.split('-');
  
    const status = parts[0];
    
    const gradeSection = parts[1];
    const gradeMatch = gradeSection.match(/^(\d{1,2})([A-Za-z]+)$/);

    const grade = gradeMatch ? parseInt(gradeMatch[1], 10) : undefined;
    const section = gradeMatch ? gradeMatch[2] : undefined;
  
    // Extract stream if available
    const stream = parts[2] && ['N', 'S'].includes(parts[2]) ? parts[2] : undefined;
  
    // Extract the date part (either dd-mm-yyyy or 'today')
    const date = parts[parts.length - 1];
  
    let parsedDate = date === 'today' ? new Date() : new Date(date.split('-').reverse().join('-')); // Handle dd-mm-yyyy format

    const [data, setData] = useState<DataType[] | NoAttendanceResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Changed to string or null

    useEffect(() => {
        // Fetching data
        axios.get('/api/proxy/reports')
            .then(response => {
                const formatedData = format(response.data, status, grade, stream, section)
                setData(formatedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError("An error occurred while fetching the data."); // Set error message
                setLoading(false);
            });

    }, []); // Added router to dependencies

    return (
        <>
            {isLargeScreen
                ? <CoreNormalAppbar navdrawerOpener={toggleNavDrawer} title={"Reports"} />
                : <SearchbarAppbar
                    buttons={
                        <>
                            {(!date || date === "today")
                                && <Button variant="icon" href="/attendance/edit/portal" tooltip="Edit" icon="playlist_add_check_circle" />
                            }
                            <Button variant="icon" icon="settings" tooltip="Settings" href="/settings" />
                            <Button variant="icon" icon="notifications" tooltip="Notifications" href="/notifications" alignTooltip="left"></Button>
                        </>
                    }
                    title={"Notifications"}
                />
            }

            {isLargeScreen ? <CoreNavDrawer isOpen={isNavDrawerOpen} active={4} /> : <CoreNavbar active={4} />}

            <Container
                hasSearchbarAppbar
                navDrawerOpen={isNavDrawerOpen}
                title="Today's Records"
                rightActions={(!date || date === "today")
                    ? <Button variant="icon" href="/attendance/edit/portal" tooltip="Edit" icon="playlist_add_check_circle" />
                    : ""
                }
            >
                <div className={styles.list}>
                    <List heading={(status && grade && section) ? `${status.charAt(0).toUpperCase() + status.slice(1)} students of ${grade} - ${section}` : "Loading"}>
                        {loading
                            ? <div className={loadingStyles.container}>
                                <svg className={loadingStyles.spinner} viewBox="0 0 50 50">
                                    <circle
                                        className={loadingStyles.path}
                                        cx="25"
                                        cy="25"
                                        r="20"
                                        fill="none"
                                        strokeWidth="5"
                                    ></circle>
                                </svg>
                            </div>
                            : error
                                ? <div>{error}</div>
                                : (data && !("StatusCode" in (data as NoAttendanceResponse)))
                                    ? (data as DataType[]).map((student: DataType) => (
                                        <ListItem
                                            key={student.id}
                                            listNum={student.id}
                                            heading={student.fullname}
                                            supportingText={`${student.status} - ${student.grade}`}
                                            info={student.uid}
                                            href={`/students/profile?uid=${student.uid}`}
                                        />
                                    ))
                                    : <div className={styles.error_container}>
                                        <Image src={"/images/icons/error.png"} alt="All Done" width={100} height={100} ></Image>
                                        <div className={styles.error_details}>
                                            <div>No attendance yet</div>
                                            <div>It seems We could not find {status} student from {grade}{section}{stream}. Try later</div>
                                        </div>
                                    </div>
                        }
                    </List>
                </div>
                <div className={styles.action_button}>
                    <Button variant="extended" icon="more_time" href="/reports/select-date">Other Days</Button>
                </div>
            </Container>
        </>
    );
}

export default function Reports() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReportsContent />
        </Suspense>
    );
}
