import copyIcon from "../../assets/ph_copy.svg"
import avatarImg from "../../assets/avatar.jpg"
import linkedIn from "../../assets/linkedin.svg"
import "./Header.css"

function Header (props){
return <header className="block header">
    <div className="header__left">
        <h2>Technical Business Analyst</h2>
        <h1>Olga Allen</h1>
        <p>with wide experience in multiple stages of software life development life cycle</p>
        <div className="header__buttons">
            <button className="LinkedIn"><img src={linkedIn} alt="LinkedIn"/></button>
            <button className="copy-email">Copy email <span><img src={copyIcon} alt="copy"/></span></button>
        </div>
    </div>
    <div className="header__right">
        <img src={avatarImg} alt="avatar"/>
    </div>
</header>
}
export default Header;