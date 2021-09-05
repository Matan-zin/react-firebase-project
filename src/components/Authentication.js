import { useEffect, useState } from "react"

export default function Authentication({handleSubmit, err, btnName}) {

    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState('');

    const isInvalid = password === '' || email === '';

    useEffect(() => {
        if(err) setError(err);
    },[err]);

    const handleLocalSubmit = (event) => {
        event.preventDefault();
        handleSubmit( email, password );
    };

    return (
        <div className="authentication">

        { error && <p role="log" className="error">{error}</p> }

        <form onSubmit={handleLocalSubmit} method="POST">

            <label htmlFor="email">Email:</label>
            <input
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                />
            <label htmlFor="password">Password:</label>
            <input
                name="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                />
            <button
                disabled={isInvalid}
                type="submit" >{btnName}</button>
        </form>
        </div>
    )
}
