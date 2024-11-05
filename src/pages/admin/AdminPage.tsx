import "./AdminPage.css";
import noimage from "../../assets/noimage.png";
import { BiPencil, BiX } from "react-icons/bi";
import { useState } from "react";
import { useData } from "../../contexts/useData";
import AdminNav from "../../components/nav/AdminNav";
import AdminExperienceItem from "../../components/experience/AdminExperienceItem";
import { ExperienceItem } from "../../components/experience/Experience";

const AdminPage = () => {
    const { mainData, updateMainData, experienceItems, deleteExperienceItem } =
        useData();

    const [selectedAvatar, setSelectedAvatar] = useState<File>();
    const [avatar, setAvatar] = useState<string>(mainData.avatar);

    const [selectedLogo, setSelectedLogo] = useState<File>();

    const [position, setPosition] = useState(mainData.position);
    const [description, setDescription] = useState(mainData.description);
    const [name, setName] = useState(mainData.name);
    const [linkedIn, setLinkedIn] = useState(mainData.linkedIn);
    const [email, setEmail] = useState(mainData.email);

    const handleAvatarSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setSelectedAvatar(file);
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setAvatar(reader.result.toString());
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const saveMainData = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateMainData({
            selectedAvatar,
            selectedLogo,
            linkedIn,
            position,
            email,
            name,
            description,
        });
    };

    return (
        <main className="container admin">
            <AdminNav
                onLogoChange={(file) => setSelectedLogo(file)}
                mainDataLogo={mainData.logo}
            />
            <form
                className="block section"
                encType="multipart/form-data"
                onSubmit={saveMainData}
            >
                <header className="header">
                    <h2>
                        <input
                            type="text"
                            placeholder="Your job position..."
                            value={position}
                            onChange={(event) =>
                                setPosition(event.target.value)
                            }
                        />
                    </h2>
                    <h1>
                        <input
                            type="text"
                            placeholder="Your name..."
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </h1>
                    <p>
                        <textarea
                            placeholder="Description..."
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        ></textarea>
                    </p>
                    <div className="header__buttons">
                        <input
                            type="text"
                            placeholder="Your LinkedIn url..."
                            value={linkedIn}
                            onChange={(event) =>
                                setLinkedIn(event.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Your email..."
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="header__avatar">
                        <img
                            src={avatar ? avatar.toString() : noimage}
                            alt="avatar"
                        />
                        <input
                            type="file"
                            id="avatar"
                            onChange={handleAvatarSelect}
                        />
                        <label htmlFor="avatar">
                            <BiPencil />
                        </label>
                    </div>
                </header>
                <button type="submit">Save</button>
            </form>

            <div className="block section experience-items_admin">
                <AdminExperienceItem
                    company={{
                        image: "",
                        name: "",
                    }}
                    id=""
                    description={[]}
                    position=""
                    endDate="12-01-2021"
                    startDate="12-01-2020"
                />
                {experienceItems.map((experienceItem) => (
                    <div
                        className="experience-item_admin"
                        key={experienceItem.id}
                    >
                        <button
                            onClick={() => {
                                deleteExperienceItem(experienceItem.id);
                            }}
                            className="experience-item__delete"
                        >
                            <BiX />
                        </button>
                        <ExperienceItem {...experienceItem} />
                    </div>
                ))}
            </div>
        </main>
    );
};

export default AdminPage;
