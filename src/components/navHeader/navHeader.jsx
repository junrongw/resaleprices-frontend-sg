import { Link } from "react-router-dom";

function NavHeader(){

    const defaultLink = "/resaleprices-frontend-sg"
    return(
        <nav>
          <Link to={defaultLink}>Home</Link> | <Link to={`${defaultLink}/about`}>About</Link>
        </nav>
    )
}

export default NavHeader;