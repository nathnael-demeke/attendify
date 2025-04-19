'use client'

import React, { useState, ChangeEvent, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import styles from "../edit/page.module.css";

import CoreSearchbarAppbar from "@/widgets/UI/SearchbarAppbar";
import CoreNormalAppbar from "@/widgets/UI/NormalAppbar";
import CoreNavDrawer from "@/widgets/UI/NavDrawer";
import CoreNavbar from "@/widgets/UI/Navbar";
import { useNavDrawer } from "@/context/NavDrawerContext";
import useScreenSize from "@/hooks/useScreenSize";

import Container from "@/components/containers/Containers";
import Form from "@/components/forms/Forms";
import TextField from "@/components/inputs/fields/Fields";
import ToggleInput from "@/components/inputs/toggle-inputs/Toggle-inputs";
import Button from "@/components/buttons/Buttons";
import Link from "@/components/links/Links";

// Define a type for formData with index signature allowing string or File | null
interface FormData {
    [key: string]: string | File | null;
}

type ProfileFormProps = {
    formData: FormData;
    handleInputChange: (name: string, value: string | File | null) => void;
};

const fields: { icon: string; inputs: string[] }[] = [
    { icon: "person", inputs: ["first_name", "last_name"] },
    { icon: "mail", inputs: ["email", "username", "password"] },
    { icon: "family_restroom", inputs: ["father_name", "mother_name"] },
    { icon: "call", inputs: ["phone_number", "f_phone_number", "m_phone_number"] },
    { icon: "other_admission", inputs: ["birthday"] },
    { icon: "grade", inputs: ["grade", "section"] }
];

const labels: Record<string, string> = {
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    username: "Username",
    password: "password",
    father_name: "Father Name",
    mother_name: "Mother Name",
    phone_number: "Phone Number",
    f_phone_number: "Father's Phone Number",
    m_phone_number: "Mother's Phone Number",
    birthday: "Birthday",
    gender: "Gender",
    grade: "Grade",
    stream: "Stream",
    section: "Section"
};

const ProfileForm: React.FC<ProfileFormProps> = ({ formData, handleInputChange }) => {
    const [profileImage, setProfileImage] = useState("/images/profile-pic/default-avatar-icon.png");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            handleInputChange("profile_picture", file); // Store the file directly
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleGenderChange = (selectedGender: "m" | "f") => {
        handleInputChange("gender", selectedGender);
    };

    const handleStreamChange = (selectedStream: "n" | "s" | null) => {
        handleInputChange("stream", selectedStream);
    };

    return (
        <div>
            <div className={styles.profile_info}>
                <div className={styles.profile_pic_container}>
                    <Image
                        src={profileImage}
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className={styles.profile_pic}
                    />
                    <div className={styles.ab_button_pp}>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className={styles.image_input}
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                            name="image"
                            required
                        />
                        <Button variant="icon" icon="edit" type="button" onClick={triggerFileInput} />
                    </div>
                </div>
            </div>

            {fields.map(({ icon, inputs }) => (
                <div className={styles.field} key={icon}>
                    <span className={`material-symbols-outlined ${styles.field_icon}`}>{icon}</span>
                    <div className={styles.field_cont}>
                        {inputs.map((name) => (
                            <TextField
                                key={name}
                                label={labels[name]}
                                name={name}
                                value={formData[name] as string} // Explicitly cast to string
                                onChange={(value: string) => handleInputChange(name, value)}
                                required
                                type={
                                    name === "birthday" ? "date" 
                                    : name === "grade" ? "number" 
                                    : name === "password" ? "password" 
                                    : "text"
                                }
                                
                            />
                        ))}
                    </div>
                </div>
            ))}
            <div className={styles.toggle}>
                <span className={`material-symbols-outlined ${styles.field_icon}`}>wc</span>
                <>
                    <ToggleInput type="radio" name="gender" checked={formData.gender === "m"} onChange={() => handleGenderChange("m")} label="Male" />
                    <ToggleInput type="radio" name="gender" checked={formData.gender === "f"} onChange={() => handleGenderChange("f")} label="Female" />
                </>
            </div>
            <div className={styles.toggle}>
                <span className={`material-symbols-outlined ${styles.field_icon}`}>experiment</span>
                <>
                    <ToggleInput type="radio" name="stream" checked={formData.stream === "n"} onChange={() => handleStreamChange("n")} label="Natural Science" />
                    <ToggleInput type="radio" name="stream" checked={formData.stream === "s"} onChange={() => handleStreamChange("s")} label="Social Science" />
                    <ToggleInput type="radio" name="stream" checked={formData.stream === "none"} onChange={() => handleStreamChange(null)} label="None" />
                </>
            </div>
        </div>
    );
};

export default function Add() {
    const { isNavDrawerOpen, toggleNavDrawer } = useNavDrawer();
    const isLargeScreen: boolean = useScreenSize(1024);

    // Define the formData type explicitly
    const [formData, setFormData] = useState<FormData>({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        father_name: "",
        mother_name: "",
        phone_number: "",
        f_phone_number: "",
        m_phone_number: "",
        birthday: "",
        gender: "",
        grade: "",
        stream: "",
        section: "",
        profile_picture: null,
    });

    const handleInputChange = (name: string, value: string | File | null) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        // Append all text fields
        Object.keys(formData).forEach((key) => {
            if (key !== "profile_picture") {
                formDataToSend.append(key, formData[key] as string); // Only append strings
            }
        });

        // Append the profile image if it exists
        if (formData.profile_picture) {
            formDataToSend.append("profile_picture", formData.profile_picture);
        }

        try {
            console.log(formData)
            const response = await axios.post("http://localhost:5000/student/register", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                console.log("Student added successfully");
            } else {
                console.error("Error adding student");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            {isLargeScreen ? <CoreNormalAppbar navdrawerOpener={toggleNavDrawer} title="Add Student" /> : <CoreSearchbarAppbar title="Add Student" />}
            {isLargeScreen ? <CoreNavDrawer isOpen={isNavDrawerOpen} active={2} /> : <CoreNavbar active={2} />}
            <Container hasSearchbarAppbar navDrawerOpen={isNavDrawerOpen} icon="add" animateContextBar={false}>
                <Form
                    className={styles.form}
                    onSubmit={handleSubmit}
                    inputs={<ProfileForm formData={formData} handleInputChange={handleInputChange} />}
                    formLinks={<Link href="/help" padded>Need Help?</Link>}
                    formAction={
                        <>
                            <Button variant="outlined" type="button" href="/students">Cancel</Button>
                            <Button variant="filled" type="submit">Add</Button>
                        </>
                    }
                />
            </Container>
        </>
    );
}
