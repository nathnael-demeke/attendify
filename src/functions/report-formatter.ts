interface DataType {
    id: number;
    fullname: string;
    status: string;
    grade: string;
    uid: `#${string}`;
}

interface DataItem {
    id: number;
    name: string;
    school_id: number;
    first_name: string;
    father_name: string;
    birthday: string;
    grade: number;
    section: string;
}

interface NoAttendanceResponse {
    StatusCode: string;
    Msg: string;
}

export function format(
    data: Record<string, DataItem[]> | NoAttendanceResponse, 
    status: string, 
    grade?: number, 
    stream?: string, 
    section?: string
): DataType[] | NoAttendanceResponse {

    // Handle case where there is no attendance for today
    if ("StatusCode" in data && "Msg" in data) {
        return data as NoAttendanceResponse
    }

    // Utility functions to extract section and stream
    const extractStream = (section: string): string | null => section.length > 1 ? section[1] : null;
    const extractSection = (section: string): string => section.length > 1 ? section[0] : section;

    // Filter data and transform into DataType format
    const filteredData = data[status]
        .filter(item => (
            (!grade || item.grade === grade) &&
            (!section || extractSection(item.section) === section) &&
            (!stream || extractStream(item.section) === stream)
        ))
        .map(item => ({
            id: item.id,
            fullname: `${item.first_name} ${item.father_name}`,
            status: status,
            grade: `${item.grade} ${item.section}`,
            uid: `#${item.school_id}`,
        }));

    return filteredData as DataType[];
}
