import { useRef, useState } from "react";
import { IEducationData } from "../../types";
import { BiPencil, BiPlus, BiX } from "react-icons/bi";
import Calendar from "../calendar/Calendar";
import noimage from "../../assets/noimage.png";
import { IEducationPostData } from "../../contexts/DataContext";
import toast from "react-hot-toast";

interface IAdminEducationProps extends IEducationData {
    children?: React.ReactNode;
    onSave: (data: IEducationPostData, id: string) => Promise<void>;
}
const AdminEducationListItem = ({
    startDate: currentStartDate,
    place: currentPlace,
    subjects: currentSubjects,
    endDate: currentEndDate,
    status: currentStatus,
    image: currentImage,
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
    const [image, setImage] = useState<string>(currentImage || "");
    const [currentFile, setCurrentFile] = useState<File>();

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setImage(reader.result.toString());
                }
            };
            setCurrentFile(file);
            reader.readAsDataURL(file);
        }
    };

    const handleAddSubject = () => {
        if (subject.trim().length > 0) {
            setSubjects([...subjects, subject]);
            setSubject("");
            subjectInputRef?.current?.focus();
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave(
            {
                place,
                startDate,
                status,
                endDate,
                subjects,
                image: currentFile,
            },
            id
        )
            .then(() => {
                if (!id) {
                    setStartDate({
                        month: "",
                        year: ""
                    });
                    setEndDate({
                        month: "",
                        year: ""
                    });
                    setSubjects([]);
                    setImage("");
                    setCurrentFile(undefined);
                    setStatus("");
                    setPlace("");
                }
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <form className="item_admin form block" onSubmit={handleSubmit}>
            {children}
            <div className="education__item__info">
                <div className="admin__item-logo">
                    <img src={image ? image : noimage} alt="avatar" />
                    <input
                        className="form-field"
                        type="file"
                        id={"education__item-admin_logo" + id}
                        onChange={handleImageSelect}
                    />
                    <label htmlFor={"education__item-admin_logo" + id}>
                        <BiPencil />
                    </label>
                </div>
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
                    onChange={(month, year) => setStartDate({
                        month,
                        year
                    })}
                />
                <Calendar
                    defaultValue={endDate}
                    label="End date:"
                    onChange={(month, year) => setEndDate({
                        month,
                        year
                    })}
                />
            </div>
            <button className="form-button" type="submit">
                Save
            </button>
        </form>
    );
};

export default AdminEducationListItem;
