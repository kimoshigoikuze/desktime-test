import icon from './logo.svg'

function Header(props) {
    const handleChange = event => props.changeLimit(event.target.value)

    return (
        <div className='header'>
            <div className='logo'>
               <img alt={'icon'} src={icon}/>
            </div>
            <div className='name'>
                <h2> {props?.activeUser?.name || "Hi!"} </h2>
            </div>
            <div className='opts'>
                <button className="switch-light" onClick={props?.setTheme.bind(this, 'light')}>
                    &#9788;
                </button>
                <button className="switch-dark" onClick={props?.setTheme.bind(this, 'dark')}>
                    &#9789;
                </button>
                <select onChange={handleChange}   defaultValue="12">
                    <option value="6">6</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                    <option value="18">18</option>
                    <option value="24">24</option>
                </select>
            </div>
        </div>
    );
}

export default Header;
