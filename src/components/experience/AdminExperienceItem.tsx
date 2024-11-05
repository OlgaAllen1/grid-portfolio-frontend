import { useRef, useState } from "react";
import noimage from "../../assets/noimage.png";
import { BiPencil, BiPlus } from "react-icons/bi";
import { IExperienceData } from "../../types";
import { useData } from "../../contexts/useData";

const AdminExperienceItem = ({
    company: { image: currentImage, name: currentCompanyName },
    description: currentDescription,
    position: currentPosition,
    startDate: currentStartDate,
    endDate: currentEndDate,
}: IExperienceData) => {
    const { createExperienceItem } = useData();
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
                    setImage(reader.result.toString());
                }
            };
            setCurrentFile(file);
            reader.readAsDataURL(file);
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
        createExperienceItem({
            company: {
                name: companyName,
                image: currentFile,
            },
            description,
            endDate,
            startDate,
            position,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="experience__item_admin block">
            <div className="experience__item-header_admin">
                <div>
                    <input
                        type="text"
                        value={position}
                        onChange={(event) => setPosition(event.target.value)}
                        placeholder="Position..."
                    />
                    <input
                        type="text"
                        value={companyName}
                        onChange={(event) => setCompanyName(event.target.value)}
                        placeholder="Company name..."
                    />
                </div>
                <div className="experience__item-logo">
                    <img src={image ? image : noimage} alt="avatar" />
                    <input
                        type="file"
                        id="experience__item-logo"
                        onChange={handleImageSelect}
                    />
                    <label htmlFor="experience__item-logo">
                        <BiPencil />
                    </label>
                </div>
            </div>

            <div>
                <div>
                    <label htmlFor="">Start date: </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                        placeholder="Position..."
                    />
                </div>
                <div>
                    <label htmlFor="">End date: </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                        placeholder="Company name..."
                    />
                </div>
            </div>

            <div className="experience__item-description">
                <input
                    ref={descriptionInputRef}
                    value={descriptionItem}
                    onChange={(event) => setDescriptionItem(event.target.value)}
                    type="text"
                    placeholder="Description"
                />
                <button
                    onClick={handleAddDescription}
                    className="experience__item-button"
                    type="button"
                >
                    <BiPlus />
                </button>
            </div>
            <ul className="experience__item-list">
                {description?.map((item, index) => (
                    <li>{item}</li>
                ))}
            </ul>

            <button type="submit">Save</button>
        </form>
    );
};

export default AdminExperienceItem;
