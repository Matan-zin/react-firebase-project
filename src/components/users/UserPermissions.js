import { VIEW_SUBSCRIPTIONS,
         CREATE_SUBSCRIPTIONS,
         DELETE_SUBSCRIPTIONS,
         UPDATE_SUBSCRIPTIONS,
         VIEW_MOVIES,
         CREATE_MOVIES,
         DELETE_MOVIES,
         UPDATE_MOVIES } from '../../constants/permissions';

export default function userPermissions({ permissions, handleChange }) {

    return (
        <>
        <label htmlFor={VIEW_SUBSCRIPTIONS}>View Subscriptions:</label>
        <input
            name={VIEW_SUBSCRIPTIONS}
            type="checkbox"
            checked={permissions[VIEW_SUBSCRIPTIONS]}
            onChange={({ target }) => handleChange(target)}
            />

        <label htmlFor={CREATE_SUBSCRIPTIONS}>Create Subscriptions:</label>
        <input
            name={CREATE_SUBSCRIPTIONS}
            type="checkbox"
            checked={permissions[CREATE_SUBSCRIPTIONS]}
            onChange={({ target }) => handleChange(target)}
            />

        <label htmlFor={DELETE_SUBSCRIPTIONS}>Delete Subscriptions:</label>
        <input
            name={DELETE_SUBSCRIPTIONS}
            type="checkbox"
            checked={permissions[DELETE_SUBSCRIPTIONS]}
            onChange={({ target }) => handleChange(target)}
            />

        <label htmlFor={UPDATE_SUBSCRIPTIONS}>Update Subscriptions:</label>
        <input
            name={UPDATE_SUBSCRIPTIONS}
            type="checkbox"
            checked={permissions[UPDATE_SUBSCRIPTIONS]}
            onChange={({ target }) => handleChange(target)}
            />

        <label htmlFor={VIEW_MOVIES}>View Movies:</label>
        <input
            name={VIEW_MOVIES}
            type="checkbox"
            checked={permissions[VIEW_MOVIES]}
            onChange={({ target }) => handleChange(target)}
            />

        <label htmlFor={CREATE_MOVIES}>Create Movies:</label>
        <input
            name={CREATE_MOVIES}
            type="checkbox"
            checked={permissions[CREATE_MOVIES]}
            onChange={({ target }) => handleChange(target)}
            />

        <label htmlFor={DELETE_MOVIES}>Delete Movies:</label>
        <input
            name={DELETE_MOVIES}
            type="checkbox"
            checked={permissions[DELETE_MOVIES]}
            onChange={({ target }) => handleChange(target)}
            />

        <label htmlFor={UPDATE_MOVIES}>Update Movies:</label>
        <input
            name={UPDATE_MOVIES}
            type="checkbox"
            checked={permissions[UPDATE_MOVIES]}
            onChange={({ target }) => handleChange(target)}
            />
        </>
    )

}