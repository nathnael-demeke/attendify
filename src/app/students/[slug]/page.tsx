'use client'
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import style from "./page.module.css";
import { useNavDrawer } from "@/context/NavDrawerContext";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import useScreenSize from "@/hooks/useScreenSize";
import CoreSearchbarAppbar from "@/widgets/UI/SearchbarAppbar";
import CoreNormalAppbar from "@/widgets/UI/NormalAppbar";
import CoreNavDrawer from "@/widgets/UI/NavDrawer";
import CoreNavbar from "@/widgets/UI/Navbar";
import Container from "@/components/containers/Containers";
import Button from "@/components/buttons/Buttons";
import List, { ListItem } from "@/components/lists/Lists";
import Dialog from "@/components/dialogs/Dialogs";
import axios from "axios";

const ChartComponent = dynamic(() => import('./chart'), {ssr: false});

type dialogsProps = Array<
	{isOpen: boolean; onClose: () => void; title: string; actions: React.ReactNode; children: React.ReactNode}
>

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
	email: string
}

export default function StudentProfile() {
	const { isNavDrawerOpen, toggleNavDrawer } = useNavDrawer();
	const isLargeScreen: boolean = useScreenSize(1024);


	const params: {slug: string} = useParams(); // Get `slug` dynamically in Client Component

    if (!params || !params.slug) {
        return <p>Loading...</p>;
    }

	const { slug } = params;

    // Check if it's an ID pattern (starts with "id" and followed by numbers)
    const isIdPattern: boolean = /^id\d+$/.test(slug);

    // Extract ID if matched, otherwise treat as a username
    const user = isIdPattern
        ? { id: slug.slice(2), name: `User with ID ${slug.slice(2)}` }
        : { id: "unknown", name: slug };

    if (!user) {
        return notFound(); 
    }

	const [data, setData] = useState<studentData>({
		first_name: "Loading",
		last_name: "",
		phone_number: "Loading",
		username: "Loading",
		id: "unknown",
		section: "Loading",
		grade: "Loading",
		qrcode_path: "Loading",
		photo: "Loading",
		birthday: "Loading",
		gender: "Loading",
		mother_name: "Loading",
		father_name: "Loading",
		email: "Loading"
	});
	
	useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/student/getInfo`, {
                    params: {
                        studentID: isIdPattern ? user.id : undefined,
                        username: isIdPattern ? undefined : user.name,
						schoolID: 1
                    },
                });
				setData(response.data);
				console.log(response.data)
                console.log("Student Data:", response.data);
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudentData();
    }, [slug]);

	// Dialogs
	const [ isDeleteDialogOpen, setDeleteDialog ] = useState(false);
	const [ isReportFalseDialogOpen, setReportFalseDialog ] = useState(false);
	const [ isAddToPrintQuickOpen, setAddToPrintQuick ] = useState(false);

	const dialogs: dialogsProps= [
		{
			isOpen: isDeleteDialogOpen, 
			onClose: () => setDeleteDialog(false), 
			title: "Delete Student", 
			actions: <>
				<Button variant="outlined" onClick={() => setDeleteDialog(false)}>Cancle</Button>
				<Button variant="filled" href={`/students/delete?uid=${data.id}`}>Continue</Button>
			</>, 
			children: <>Are you sure you want to permanently delete this student from the database? This action cannot be undone.</>
		},
		{
			isOpen: isReportFalseDialogOpen, 
			onClose: () => setReportFalseDialog(false), 
			title: "False Report", 
			actions: <>
				<Button variant="outlined" onClick={() => setReportFalseDialog(false)}>Cancle</Button>
				<Button variant="filled" href={`/attendance/change-status?id=${data.id}`}>Change status</Button>
			</>, 
			children: <>If the current report contains any errors or if a student&apos;s status needs updating, you can make the necessary changes here.</>
		},
		{
			isOpen: isAddToPrintQuickOpen, 
			onClose: () => setAddToPrintQuick(false), 
			title: "Add to print quick", 
			actions: <>
				<Button variant="outlined" onClick={() => setAddToPrintQuick(false)}>Cancle</Button>
				<Button variant="filled" href={`/attendance/print/quick/add?id=${data.id}`}>Add</Button>
			</>, 
			children: <>If the current report contains any errors or if a student&apos;s status needs updating, you can make the necessary changes here.</>
		}
	]

	return (
	  	<>
			{isLargeScreen ? <CoreNormalAppbar navdrawerOpener={toggleNavDrawer} title="Student Profile" /> : <CoreSearchbarAppbar title="Student Profile" />}
			{isLargeScreen ? <CoreNavDrawer isOpen={isNavDrawerOpen} active={2} /> : <CoreNavbar active={2} />}
			<Container hasSearchbarAppbar navDrawerOpen={isNavDrawerOpen}>
				<div className={style.profile_section}>
					<div className={style.profile_info}>
						<div>
							<Image src={"/images/profile-pic/default-avatar-icon.png"} alt="" width="100" height="100" className={style.profile_pic} />
							<div className={style.name_section}>
								<div className={style.name_main}>{`${data.first_name} ${data.last_name}`}</div>
								<div className={style.name_prim}>@{data.username}</div>
								<div className={style.name_seco}>Grade {`${data.grade} - section ${data.section}` }</div>
							</div>
						</div>
						<div className={style.qr_code_container}>
							<Image src={data.qrcode_path == "Loading" ? "/images/profile-pic/default-avatar-icon.png" : data.qrcode_path} alt="" width="100" height="100" className={style.qr_code}></Image>
							<div className={style.ab_button}>
								<Button variant="filled-tonal" onClick={() => setAddToPrintQuick(true)} icon="print"></Button>
							</div>
						</div>
					</div>
					<div className={style.action_buttons}>
						<Button variant="filled-tonal" icon="history" href={`/students/activities?id=${data.id}`} tooltip="Attend History" />
						<Button variant="filled-tonal" icon="edit" href={`/students/edit?id=${data.id}`} tooltip="Edit" />
						<Button variant="filled-tonal" icon="delete" onClick={() => setDeleteDialog(true)} tooltip="Delete" />
					</div>
					<div className={style.description_section}>
						<p>Student&apos;s info</p><br />
						<List>
							<ListItem icon="today" heading="Absent" onClick={() => setReportFalseDialog(true)} supportingText="Today" />
                            <ListItem icon="call" heading={data.phone_number} supportingText="Phone Number" href={`tel:${data.phone_number}`} />
                            <ListItem icon="mail" heading={data.email} supportingText="Email" href={`mailto:${data.email}`} />
                            <ListItem icon="celebration" heading={data.birthday} supportingText="Birthday" />
                            <ListItem icon="family_restroom" heading={data.father_name} supportingText="Father name" />
                            <ListItem icon="family_restroom" heading={data.mother_name} supportingText="Mother Name" />
                            <ListItem icon="male" heading={(data.gender == "m" ? "Male" : "Female")} supportingText="Gender" />
                        </List>
					</div>
					<div className={style.additional_info}>
						<ChartComponent />
					</div>
				</div>
				{dialogs.map(({isOpen, onClose, title, actions, children}, i) => (
					<Dialog
						key={i}
						type="basic"
						title={title}
						isOpen={isOpen}
						onClose={onClose}
						actions={actions}
					>
						{children}
					</Dialog>
				))}
			</Container>
		</>
	);
}
