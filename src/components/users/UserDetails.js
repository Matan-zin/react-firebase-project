
export default function UserDetails({user, handleChange, readonly}) {

    return (
        <>
        <label htmlFor="First Name">First Name</label>
        <input
            name="First Name"
            type="text"
            value={user["First Name"]}
            onChange={({ target }) => handleChange(target) }
        />
        <label htmlFor="Last Name">Last Name</label>
        <input
            name="Last Name"
            type="text"
            value={user["Last Name"]}
            onChange={({ target }) => handleChange(target) }
        />
         <label htmlFor="Email">Email</label>
        <input
            name="Email"
            type="email"
            value={user["Email"]}
            onChange={({ target }) => handleChange(target) }
        />
         <label htmlFor="Created Date">Created Date</label>
        <input
            readOnly={readonly}
            name="Created Date"
            type="date"
            value={user["Created Date"]}
            onChange={({ target }) => handleChange(target) }
        />
         <label htmlFor="Session Time Out">Session Time Out</label>
        <input
            name="Session Time Out"
            type="number"
            value={user["Session Time Out"]}
            onChange={({ target }) => handleChange(target) }
        />
        </>
    )
}