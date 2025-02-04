'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import CoreSearchbarAppbar from "@/widgets/UI/SearchbarAppbar";
import useScreenSize from "@/hooks/useScreenSize";
import CoreNormalAppbar from "@/widgets/UI/NormalAppbar";
import CoreNavDrawer from "@/widgets/UI/NavDrawer";
import CoreNavbar from "@/widgets/UI/Navbar";
import { useNavDrawer } from "@/context/NavDrawerContext";
import Container from "@/components/containers/Containers";
import Form from "@/components/forms/Forms";
import TextField from "@/components/inputs/fields/Fields";
import ToggleInput from "@/components/inputs/toggle-inputs/Toggle-inputs";
import Link from "@/components/links/Links";
import Button from "@/components/buttons/Buttons";
import Dialog from "@/components/dialogs/Dialogs";
import axios from "axios";


interface studentData {
	first_name: string,
	last_name: string,
	phone_number: string,
	username: string,
	id: number | "unknown",
	section: string,
	grade: string,
	qrcode_path: string,
	photo: string,
	birthday: string,
	gender: string,
	mother_name: string,
	father_name: string,
	email: string,
    father_phone_number: string,
    mother_phone_number: string
}

export default function Edit() {
	const { isNavDrawerOpen, toggleNavDrawer } = useNavDrawer();
    const [ isDialogOpen, setDialogOpen ] = useState(false);

	const handleDialogOpen = () => {
		setDialogOpen(true)
	}

	const isLargeScreen: boolean = useScreenSize(1024);

    const [ data, setData ] = useState<studentData>();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/student/getInfo`, {
                    params: {
                        studentID:7 ,
						schoolID: 1
                    },
                });
				setData(response.data);
				console.log(response.data)
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudentData();
    }, []);

	return (
	  	<>
			{isLargeScreen ? <CoreNormalAppbar navdrawerOpener={toggleNavDrawer} title="Edit Student" /> : <CoreSearchbarAppbar title="Edit Student" />}
			{isLargeScreen ? <CoreNavDrawer isOpen={isNavDrawerOpen} active={2} /> : <CoreNavbar active={2} />}
            <Container 
                hasSearchbarAppbar 
                navDrawerOpen={isNavDrawerOpen} 
                icon="edit" 
                animateContextBar={false} 
                rightActions={
                    <Button variant="filled" onClick={handleDialogOpen} icon="delete">Delete</Button>
                }
            >
                <Form 
                    // heading="Edit student profile"
                    className={styles.form}
                    inputs={
                        <>
                            <div className={styles.profile_info}>
                                <div className={styles.profile_pic_container}>
                                    <Image src={"/images/profile-pic/default-avatar-icon.png"} alt="" width="100" height="100" className={styles.profile_pic} />
                                    <div className={styles.ab_button_pp}>
                                        <Button variant="icon" icon="edit"></Button>
                                    </div>
                                </div>
                                <div className={styles.qr_code_container}>
                                    <Image src={"/images/test-qr-code.png"} alt="" width="100" height="100" className={styles.qr_code}></Image>
                                    <div className={styles.ab_button_qr}>
                                        <Button variant="filled-tonal" icon="print"></Button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.field}>
                                <span className={`material-symbols-outlined ${styles.field_icon}`}>person</span>
                                <div className={styles.field_cont}>
                                    <TextField label="First Name" name="first_name" value={data ? data.first_name : ""} required />
                                    <TextField label="Last Name" name="last_name" value={data ? data.last_name : ""} required />
                                </div>
                            </div>
                            <div className={styles.field}>
                                <span className={`material-symbols-outlined ${styles.field_icon}`}>mail</span>
                                <div className={styles.field_cont}>
                                    <TextField label="Email" name="email" type="name" value={data ? data.email : ""} required />
                                    {/* <TextField label="Username" name="username" required /> */}
                                </div>
                            </div> 
                            <div className={styles.field}>
                                <span className={`material-symbols-outlined ${styles.field_icon}`}>family_restroom</span>
                                <div className={styles.field_cont}>
                                    <TextField label="Father Name" name="father_name" value={data ? data.father_name : ""} required />
                                    <TextField label="Mother Name" name="mother_name" value={data ? data.mother_name : ""} required />
                                </div>
                            </div>
                            <div className={styles.field}>
                                <span className={`material-symbols-outlined ${styles.field_icon}`}>call</span>
                                <div className={styles.field_cont}>
                                    <TextField label="Phone Number" name="phone_number" value={data ? data.phone_number : ""} required />
                                    <TextField label="Father's Phone Number" name="f_phone_number" value={data ? data.father_phone_number : ""} required />
                                    <TextField label="Mother's Phone Number" name="m_phone_number" value={data ? data.mother_phone_number : ""} required />
                                </div>
                            </div>
                            {/* <div className={styles.field}>
                                <span className={`material-symbols-outlined ${styles.field_icon}`}>other_admission</span>
                                <div className={styles.field_cont}>
                                    <TextField label="Birthday" name="birthday" type="date" required />
                                </div>
                            </div> */}
                            <div className={styles.field}>
                                <span className={`material-symbols-outlined ${styles.field_icon}`}>grade</span>
                                <div className={styles.field_cont}>
                                    <TextField label="Grade" name="grade" type="number" value={data ? data.grade : ""} required />
                                    <TextField label="section" name="section" value={data ? data.section : ""} required />
                                </div>
                            </div>
                        </>
                    }
                    formLinks={
                        <Link href="/help" padded>Need Help?</Link>
                    }
                    formAction={
                        <>
                            {!isLargeScreen ?
                                <Button variant="outlined" onClick={handleDialogOpen}>Delete</Button> :
                                <Button variant="outlined" type="button" href="/students/">Cancle</Button>
                            }
                            <Button variant="filled" type="submit">Save</Button>
                        </>
                    }
                />
                <Dialog
					isOpen={isDialogOpen}
					onClose={() => setDialogOpen(false)} 
					type="basic"
					title="Delete Student"
					actions={
						<>
							<Button variant="outlined" onClick={() => setDialogOpen(false)}>Cancle</Button>
							<Button variant="filled" href="/students/delete?uid=#1002">Continue</Button>
						</>
					}
				>
					Are you sure you want to permanently delete this student from the database? This action cannot be undone.
				</Dialog>
            </Container>
		</>
	);
}