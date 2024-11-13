import { useRef, useState } from "react";
import { IEducationData } from "../../types";
import { BiPlus, BiX } from "react-icons/bi";
import Calendar from "../calendar/Calendar";

interface IAdminEducationProps extends IEducationData {
    children?: React.ReactNode;
    onSave: (data: IEducationData) => void;
}
const AdminEducationListItem = ({
    startDate: currentStartDate,
    place: currentPlace,
    subjects: currentSubjects,
    endDate: currentEndDate,
    status: currentStatus,
    id,
    children,
    onSave,
}: IAdminEducationProps) => {
    const [startDate, setStartDate] = useState(currentStartDate);
    const [place, setPlace] = useState(currentPlace);
    const [subjects, setSubjects] = useState(currentSubjects || []);
    const [endDate, setEndDate] = useState(currentEndDate);
    const [subject, setSubject] = useState("");
    const [status, setStatus] = useState(currentStatus);
    const subjectInputRef = useRef<HTMLInputElement>(null);

    const handleAddSubject = () => {
        if (subject.trim().length > 0) {
            setSubjects([...subjects, subject]);
            setSubject("");
            subjectInputRef?.current?.focus();
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave({
            id,
            place,
            startDate,
            status,
            endDate,
            subjects,
        });
    };

    return (
        <form className="item_admin form block" onSubmit={handleSubmit}>
            {children}
            <div className="education__item__info">
                <input
                    type="text"
                    className="form-field"
                    placeholder="Status..."
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                />
                <input
                    className="form-field"
                    type="text"
                    placeholder="Place..."
                    value={place}
                    onChange={(event) => setPlace(event.target.value)}
                />
                <div className="item-description">
                    <input
                        className="form-field"
                        value={subject}
                        onChange={(event) => setSubject(event.target.value)}
                        type="text"
                        ref={subjectInputRef}
                        placeholder="Subject..."
                    />
                    <button
                        onClick={handleAddSubject}
                        className="form-button item-button"
                        type="button"
                    >
                        <BiPlus />
                    </button>
                </div>
            </div>
            <ul className="item-list education__subjects">
                <h3>Subjects</h3>
                {subjects?.map((item, index) => (
                    <li key={index}>
                        <p>{item}</p>
                        <button
                            onClick={() => {
                                setSubjects([
                                    ...subjects.slice(0, index),
                                    ...subjects.slice(index + 1),
                                ]);
                            }}
                            className="form-button"
                            type="button"
                        >
                            <BiX />
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                <Calendar
                    label="Start date:"
                    defaultValue={startDate}
                    onChange={(month, year) => setStartDate(year + "-" + month)}
                />
                <Calendar
                    defaultValue={endDate}
                    label="End date:"
                    onChange={(month, year) => setEndDate(year + "-" + month)}
                />
            </div>
            <button className="form-button" type="submit">
                Save
            </button>
        </form>
    );
};

export default AdminEducationListItem;
