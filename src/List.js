function List(props) {
    return (
        <div className={`user-list grid-${props.limit}`}>
            {
                props.users.map(user => {
                    return (
                        <div
                            className="user-card"
                            key={user.id}
                            onClick={props.setActiveUser.bind(this, user)}>
                            <img src={user.url}/>
                            <span>{user.name.split(' ').shift()}</span>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default List;
