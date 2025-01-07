import { useRef, useState } from "react";
import noimage from "../../assets/noimage.png";
import { BiPencil, BiPlus, BiX } from "react-icons/bi";
import { IExperienceData } from "../../types";
import Calendar from "../calendar/Calendar";
import { IExperiencePostData } from "../../contexts/DataContext";
import toast from "react-hot-toast";

interface IAdminExperienceItemProps extends IExperienceData {
    children?: React.ReactNode;
    onSave: (data: IExperiencePostData) => Promise<void>;
}

const AdminExperienceItem = ({
    companyName: currentCompanyName,
    companyLogo: currentImage,
    description: currentDescription,
    position: currentPosition,
    startDate: currentStartDate,
    endDate: currentEndDate,
    onSave,
    children,
    id,
}: IAdminExperienceItemProps) => {
    const descriptionInputRef = useRef<HTMLInputElement>(null);
    const [companyName, setCompanyName] = useState(currentCompanyName);
    const [position, setPosition] = useState(currentPosition);
    const [description, setDescription] = useState(currentDescription);
    const [image, setImage] = useState<string>(currentImage);
    const [startDate, setStartDate] = useState(currentStartDate);
    const [endDate, setEndDate] = useState(currentEndDate);
    const [currentFile, setCurrentFile] = useState<File>();
    const [descriptionItem, setDescriptionItem] = useState("");
    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    const imageUrl = reader.result.toString();
                    setImage(imageUrl);
                    updateFavicon(imageUrl); 
                }
            };
            setCurrentFile(file);
            reader.readAsDataURL(file);
        }
    };

    const updateFavicon = (imageUrl: string) => {
        const favicon = document.getElementById("favicon") as HTMLLinkElement;
        if (favicon) {
            favicon.href = imageUrl;
        }
    };

    const handleAddDescription = () => {
        if (descriptionItem.trim().length > 0) {
            setDescription([...description, descriptionItem]);
            setDescriptionItem("");
            descriptionInputRef?.current?.focus();
        }
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave({
            companyName,
            companyLogo: currentFile,
            description,
            endDate,
            startDate,
            position,
            id,
        })
            .then(() => {
                if (!id) {
                    setCompanyName("");
                    setCurrentFile(undefined);
                    setDescription([]);
                    setImage("");
                    setPosition("");
                    setEndDate({
                        month: "",
                        year: "",
                    });
                    setStartDate({
                        month: "",
                        year: "",
                    });
                }
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="experience__item_admin item_admin block "
        >
            {children}
            <div className="experience__item-header_admin">
                <div>
                    <input
                        className="form-field"
                        type="text"
                        value={position}
                        onChange={(event) => setPosition(event.target.value)}
                        placeholder="Position..."
                    />
                    <input
                        className="form-field"
                        type="text"
                        value={companyName}
                        onChange={(event) => setCompanyName(event.target.value)}
                        placeholder="Company name..."
                    />
                </div>
                <div className="admin__item-logo">
                    <img src={image ? image : noimage} alt="Company Logo" />
                    <input
                        className="form-field"
                        type="file"
                        id={"experience__item-admin_logo" + id}
                        onChange={handleImageSelect}
                    />
                    <label htmlFor={"experience__item-admin_logo" + id}>
                        <BiPencil />
                    </label>
                </div>
            </div>

            <div>
                <Calendar
                    label="Start date:"
                    defaultValue={startDate}
                    onChange={(month, year) =>
                        setStartDate({
                            month,
                            year,
                        })
                    }
                />
                <Calendar
                    defaultValue={endDate}
                    label="End date:"
                    onChange={(month, year) =>
                        setEndDate({
                            month,
                            year,
                        })
                    }
                />
            </div>

            <div className="item-description">
                <input
                    className="form-field"
                    ref={descriptionInputRef}
                    value={descriptionItem}
                    onChange={(event) => setDescriptionItem(event.target.value)}
                    type="text"
                    placeholder="Description..."
                />
                <button
                    onClick={handleAddDescription}
                    className="form-button item-button"
                    type="button"
                >
                    <BiPlus />
                </button>
            </div>
            <ul className="item-list">
                {description?.map((item, index) => (
                    <li key={index}>
                        <p>{item}</p>
                        <button
                            onClick={() => {
                                setDescription([
                                    ...description.slice(0, index),
                                    ...description.slice(index + 1),
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

            <button className="form-button" type="submit">
                Save
            </button>
        </form>
    );
};

export default AdminExperienceItem;
