interface DataType {
    id: number;
    fullname: string;
    grade: string;
    uid: `#${string}`;
}

export const absentData: Array<DataType> = [
    { 
        id: 1, 
        fullname: "John Doe", 
        grade: "10 A",
        uid: "#1" //which school id
    },
    { 
        id: 2, 
        fullname: "Jane Smith", 
        grade: "10 B", 
        uid: "#1" 
    },
];

export const presentData: Array<DataType> = [
    {
        id: 1, 
        fullname: "John Doe", 
        grade: "10 A",
        uid: "#1" //which school id
    },
    { 
        id: 2, 
        fullname: "Jane Smith", 
        grade: "10 B", 
        uid: "#1" 
    },
];

export const data2 = {
    "absent": [
        {
            "id": 2,
            "name": "Safari Oumer Sibhatu Branch",
            "school_id": 1,
            "first_name": "Alazar",
            "father_name": "Belayhun",
            "birthday": "2008-03-28T21:00:00.000Z",
            "grade": 11,
            "section": "DN"
        },
        {
            "id": 9,
            "name": "Safari Oumer Sibhatu Branch",
            "school_id": 1,
            "first_name": "Yonathan",
            "father_name": "Mengistu",
            "birthday": "2007-06-18T21:00:00.000Z",
            "grade": 11,
            "section": "DN"
        },
                {
            "id": 21,
            "name": "Safari Oumer Sibhatu Branch",
            "school_id": 1,
            "first_name": "Makbel",
            "father_name": "Sileshi",
            "birthday": "2008-06-09T21:00:00.000Z",
            "grade": 9,
            "section": "O"
        }
    ],
    "Present": [
        {
            "id": 1,
            "name": "Safari Oumer Sibhatu Branch",
            "school_id": 1,
            "first_name": "Nathnael",
            "father_name": "Demeke",
            "birthday": "2007-03-27T21:00:00.000Z",
            "grade": 12,
            "section": "HN"
        },
        {
            "id": 1,
            "name": "Safari Oumer Sibhatu Branch",
            "school_id": 1,
            "first_name": "Nathnael",
            "father_name": "Demeke",
            "birthday": "2007-03-27T21:00:00.000Z",
            "grade": 12,
            "section": "HN"
        },
        {
            "id": 1,
            "name": "Safari Oumer Sibhatu Branch",
            "school_id": 1,
            "first_name": "Nathnael",
            "father_name": "Demeke",
            "birthday": "2007-03-27T21:00:00.000Z",
            "grade": 12,
            "section": "HN"
        },
        {
            "id": 1,
            "name": "Safari Oumer Sibhatu Branch",
            "school_id": 1,
            "first_name": "Nathnael",
            "father_name": "Demeke",
            "birthday": "2007-03-27T21:00:00.000Z",
            "grade": 12,
            "section": "HN"
        }
    ]
}
