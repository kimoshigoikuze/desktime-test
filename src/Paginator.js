import {useState} from 'react'

function Paginator(props) {
    const total = Math.ceil(props.total / props.limit)

    const handlePrev = () => {
        let page = props.page
        if (page !== 1) props.changePage(--page)
    }
    const handleNext = () => {
        let page = props.page
        if (page < total) props.changePage(++page)
    }
    return (
        <div className="paginator">
            {[0, 1].includes(total) ? "Not enough entries to paginate!" :
                <>
                <span
                    className={`chevron ${props.page === 1 ? 'disabled' : ''}`}
                    onClick={handlePrev}
                >
                &lsaquo;
                </span>
                    <div onClick={props.changePage.bind(this, 25)}>Page {props.page} </div>
                    <span className="total">&nbsp;of {total} </span>
                    <span
                        className={`chevron ${props.page === total ? 'disabled' : ''}`}
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
