import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <Link className='header' to={'/reviews'}> <h1> NC-Games Forum </h1> </Link>
    )
}