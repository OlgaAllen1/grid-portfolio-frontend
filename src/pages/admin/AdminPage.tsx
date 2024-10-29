import "./AdminPage.css";
import noAvatar from "../../assets/user.png";
import { BiPencil } from "react-icons/bi";
import { useState } from "react";
import { useData } from "../../contexts/useData";

const AdminPage = () => {
    const { mainData, updateMainData } = useData();

    const [selectedAvatar, setSelectedAvatar] = useState<File>();
    const [avatar, setAvatar] = useState<string>(
        mainData.avatar
    );

    const [selectedLogo, setSelectedLogo] = useState<File>();
    const [logo, setLogo] = useState<string>(
        mainData.logo
    );

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

    const handleLogoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setSelectedLogo(file);
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setLogo(reader.result.toString());
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
            description
        })
    };

    return (
        <main className="container admin">
            <form action="">
                <nav className="menu">
                    <div className="menu__logo block">
                        <img
                            src={logo ? logo.toString() : noAvatar}
                            alt="avatar"
                        />
                        <input
                            type="file"
                            id="logo"
                            onChange={handleLogoSelect}
                        />
                        <label htmlFor="logo">
                            <BiPencil />
                        </label>
                    </div>
                </nav>
            </form>
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
                            src={avatar ? avatar.toString() : noAvatar}
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
        </main>
    );
};

export default AdminPage;
