import "./SigninPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useData } from "../../contexts/useData";

const SigninPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signIn } = useData();

    const navigate = useNavigate();
    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            await signIn(email, password);
            setLoading(false);
            navigate("/admin");
        } catch (error) {
            setError(true);
        }
    };
    return (
        <div className="signin">
            <form
                action=""
                className="form block section"
                onSubmit={handleSignIn}
            >
                <h1>Sign in to admin page</h1>
                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="form-field"
                    type="email"
                    placeholder="Email"
                />
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="form-field"
                    type="password"
                    placeholder="Password"
                />
                <button className="form-button">Sign in</button>
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                    type="button"
                    className="form-link"
                >
                    Go back
                </button>

                {error && <p className="error">Invalid email or password!</p>}
            </form>
        </div>
    );
};

export default SigninPage;
