import { useState } from "react"
import { useHistory } from "react-router-dom";

export default function EmptyMemberForm({ 
    umember, 
    handleSumbit,
    btnName,
    url 
}){
    const history = useHistory();
    const [member, setMemeber] = useState( umember || { name: '', email: '', city: '' } );

    const handleChange = ({ name, value }) => {
        setMemeber({...member, [name]: value });
    }

    const handleLocalSubmit = (event) => {
        event.preventDefault();
        handleSumbit(member);
    }

    return (
        <form onSubmit={handleLocalSubmit}>
        <label htmlFor="name">Name:</label>
        <input 
            type="text"
            name="name"
            value={member.name}
            placeholder="Enter name"
            onChange={({ target }) => handleChange(target)} />
        <label htmlFor="email">Email:</label>
        <input 
            type="email"
            name="email"
            value={member.email}
            placeholder="Enter email"
            onChange={({ target }) => handleChange(target)} />
        <label htmlFor="city">City:</label>
        <input 
            type="city"
            name="city"
            value={member.city}
            placeholder="Enter city"
            onChange={({ target }) => handleChange(target)} />
        <button
            type="submit">{btnName}</button>
        <button
            type="button"
            onClick={() => history.push(url)}>Cancel</button>
    </form>
    )
}