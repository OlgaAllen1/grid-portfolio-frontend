import "./Nav.css";
import noimage from "../../assets/noimage.png";
import { useState } from "react";
import { BiPencil } from "react-icons/bi";

const AdminNav = ({
    mainDataLogo,
    onLogoChange,
}: {
    mainDataLogo: string;
    onLogoChange: (file: File) => void;
}) => {
    const [logo, setLogo] = useState<string>(mainDataLogo);

    const handleLogoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            onLogoChange(file);
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setLogo(reader.result.toString());
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <nav className="menu">
            <div className="menu__logo block">
                <img src={logo ? logo : noimage} alt="avatar" />
                <input type="file" id="logo" onChange={handleLogoSelect} />
                <label htmlFor="logo">
                    <BiPencil />
                </label>
            </div>
        </nav>
    );
};

export default AdminNav;
