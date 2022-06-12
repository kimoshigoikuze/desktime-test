function Paginator(props) {
    const handlePrev = () => {
        let page = props.page
        if (page !== 1) props.changePage(--page)
    }
    const handleNext = () => {
        let page = props.page
        if (page < props.total) props.changePage(++page)
    }

    return (
        <div className="paginator">
            {[0, 1].includes(props.total) ? "Not enough entries to paginate!" :
                <>
                    <span
                        className={`chevron ${props.page === 1 ? 'disabled' : ''}`}
                        onClick={handlePrev}
                    >
                    &lsaquo;
                    </span>
                        <div>Page {props.page} </div>
                        <span className="total">&nbsp;of {props.total} </span>
                        <span
                            className={`chevron ${props.page === props.total ? 'disabled' : ''}`}
                            onClick={handleNext}
                        >
                    &rsaquo;
                    </span>
                </>
            }
        </div>
    )
}

export default Paginator;
