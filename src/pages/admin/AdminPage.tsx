import "./AdminPage.css";
import noimage from "../../assets/noimage.png";
import { BiPencil, BiX } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useData } from "../../contexts/useData";
import AdminNav from "../../components/nav/AdminNav";
import AdminExperienceItem from "../../components/experience/AdminExperienceItem";
import { Link, useNavigate } from "react-router-dom";
import AdminEducationListItem from "../../components/education/AdminEducationListItem";
import { Toaster } from "react-hot-toast";

const AdminPage = () => {
    const navigate = useNavigate();

    const {
        mainData,
        aboutData,
        admin,
        educationItems,
        experienceItems,
        signOut,
        updateMainData,
        deleteExperienceItem,
        createExperienceItem,
        updateExperienceItem,
        createEducationItem,
        updateEducationItem,
        deleteEducationItem,
        createOrUpdateAboutData,
    } = useData();

    useEffect(() => {
        if (!admin) {
            navigate("/signin");
        }
    }, [admin]);

    const [selectedAvatar, setSelectedAvatar] = useState<File>();
    const [avatar, setAvatar] = useState<string>(mainData.avatar);

    const [selectedLogo, setSelectedLogo] = useState<File>();

    const [position, setPosition] = useState(mainData.position);
    const [description, setDescription] = useState(mainData.description);
    const [name, setName] = useState(mainData.name);
    const [linkedIn, setLinkedIn] = useState(mainData.linkedIn);
    const [email, setEmail] = useState(mainData.email);
    const [about, setAbout] = useState(aboutData.about);

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

    const saveAbout = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createOrUpdateAboutData(about);
    };

    const now = new Date();
    return (
        <main className="container admin">
            <nav>
                <ul className="menu_admin block section">
                    <li className="menu__link">
                        <Link to={"/"}>
                            <button>View site</button>
                        </Link>
                    </li>
                    <li className="menu__link">
                        <button onClick={signOut}>Sign out</button>
                    </li>
                </ul>
            </nav>
            <section className="block section">
                <h2>Main data</h2>

                <AdminNav
                    onLogoChange={(file) => setSelectedLogo(file)}
                    mainDataLogo={mainData.logo}
                />
                <form
                    className=" form"
                    encType="multipart/form-data"
                    onSubmit={saveMainData}
                >
                    <header className="header header_admin">
                        <h2>
                            <input
                                className="form-field"
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
                                className="form-field"
                                type="text"
                                placeholder="Your name..."
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                        </h1>
                        <p>
                            <textarea
                                className="form-field"
                                placeholder="Description..."
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            ></textarea>
                        </p>
                        <div className="header__buttons">
                            <input
                                className="form-field"
                                type="text"
                                placeholder="Your LinkedIn url..."
                                value={linkedIn}
                                onChange={(event) =>
                                    setLinkedIn(event.target.value)
                                }
                            />
                            <input
                                className="form-field"
                                type="text"
                                placeholder="Your email..."
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </div>
                        <div className="header__avatar">
                            <img
                                src={avatar ? avatar.toString() : noimage}
                                alt="avatar"
                            />
                            <input
                                className="form-field"
                                type="file"
                                id="avatar"
                                onChange={handleAvatarSelect}
                            />
                            <label htmlFor="avatar">
                                <BiPencil />
                            </label>
                        </div>
                    </header>
                    <button className="form-button" type="submit">
                        Save
                    </button>
                </form>
            </section>

            <section className="block section">
                <h2 className="section__title">Education</h2>
                <div className="items_admin">
                    <AdminEducationListItem
                        onSave={createEducationItem}
                        place=""
                        startDate={now.getFullYear() + "-" + now.getMonth() }
                        status=""
                        endDate={now.getFullYear() + "-" + now.getMonth() }
                        id=""
                    />

                    {educationItems.map((item) => (
                        <AdminEducationListItem
                            {...item}
                            key={item.id}
                            onSave={updateEducationItem}
                        >
                            <button
                                onClick={() => {
                                    deleteEducationItem(item.id);
                                }}
                                className="form-button item__delete"
                            >
                                <BiX />
                            </button>
                        </AdminEducationListItem>
                    ))}
                </div>
            </section>

            <section className="block section">
                <h2 className="section__title">About</h2>
                <form action="" className="form" onSubmit={saveAbout}>
                    <textarea
                        value={about}
                        onChange={(event) => setAbout(event.target.value)}
                        className="form-field"
                        placeholder="About..."
                    ></textarea>

                    <button className="form-button">Save</button>
                </form>
            </section>

            <section className="block section">
                <h2 className="section__title">Experience</h2>
                <div className="items_admin">
                    <AdminExperienceItem
                        companyLogo=""
                        companyName=""
                        id=""
                        description={[]}
                        position=""
                        endDate="12-01-2021"
                        startDate="12-01-2020"
                        onSave={createExperienceItem}
                    />
                    {experienceItems.map((experienceItem) => (
                        <AdminExperienceItem
                            onSave={updateExperienceItem}
                            key={experienceItem.id}
                            {...experienceItem}
                        >
                            <button
                                onClick={() => {
                                    deleteExperienceItem(experienceItem.id);
                                }}
                                className="form-button item__delete"
                            >
                                <BiX />
                            </button>
                        </AdminExperienceItem>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default AdminPage;


// TODO: 1. Logout admin on refresh 
// TODO: 2. StartDate and EndDate (need to manage getting month name)
// TODO: 3. Styles of error and loading 
// TODO: 4. Invalid password or email should be a toast message
// TODO: 5. Education / Experience sorting in ASC ordering related to the start date 
