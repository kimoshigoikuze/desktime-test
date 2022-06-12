import useLocalStorage from 'use-local-storage'
import {useEffect, useState} from 'react'
import Header from "./Header"
import List from "./List"
import Paginator from "./Paginator"
import './App.css';


function App() {
    const defaultTheme = window.matchMedia('(prefers-color-scheme: light)').matches
    const [theme, setTheme] = useLocalStorage('theme', defaultTheme ? 'light' : 'dark')
    const [users, setUsers] = useState([])
    const [total, setTotal] = useState(0)
    const [activeUser, setActiveUser] = useState({})
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(12)
    const [timeout, _setTimeout] = useState(0)
    const [error, setError] = useState('')
    const fetchData = async (page = 1, limit = 12, query = null) => {
        try {
            let link = `http://localhost:5555/characters?_page=${page}&_limit=${limit}`

            if (query !== null) {
                link = `${link}&q=${query}`
            }

            const response = await fetch(link)
            const users = await response.json()
            const total = parseInt(response.headers.get('X-Total-Count'))

            setTotal(total)
            setUsers(users)
            setError(users.length === 0 ? 'No users to display!' : '')

            if (Object.entries(activeUser).length === 0) {
                const [user,] = users
                setActiveUser(user)
            }
        } catch (exception) {
            console.error(exception)
            setError(() => exception.toString())
        }
    }
    const changeLimit = limit => {
        setLimit(limit)
        fetchData(page, limit)
    }
    const changePage = page => {
        setPage(page)
        fetchData(page, limit)
    }
    const querySearch = event => {
        if (timeout !== 0) {
            clearTimeout(timeout)
        }

        const id = setTimeout(
            fetchData.bind(this, page, limit, event.target.value),
            400
        )

        _setTimeout(id)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="app" data-theme={theme}>
            <Header
                activeUser={activeUser}
                setTheme={setTheme}
                limit={12}
                changeLimit={changeLimit}
            />
            <div className="error"> {error && error} </div>
            <div className="container">
                <span className="peace"/>
                <input
                    className="query"
                    onChange={querySearch}
                    placeholder="Search for colleague"
                />
                <List
                    limit={limit}
                    users={users}
                    setActiveUser={setActiveUser}
                />
            </div>
            <Paginator
                page={page}
                limit={limit}
                changePage={changePage}
                total={total}
            />
        </div>
    );
}

export default App;
