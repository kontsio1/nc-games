export const ErrorPage = ({errStatus, errMessage})=> {

    if (errStatus) {
        return (
            <section>
                <p> Error {errStatus} </p>
                <p> {errMessage} </p>
                <img src='https://media.tenor.com/sSYnkkUnFyIAAAAM/error-fail.gif' alt='indicating error'></img>
            </section>
        )
    } else {
        return (
        <section>
                <p> An error occured </p>
                <p> Page not found </p>
                <img src='https://media.tenor.com/sSYnkkUnFyIAAAAM/error-fail.gif' alt='indicating error'></img>
        </section>
        )
    }
}