import { Link } from "react-router-dom";

function NavHeader(){

    return(
        <nav style={{zIndex: 1, position: 'relative'}}>
          <Link to={"/"}>Home</Link> | <Link to={`/about`}>Learn How It Works</Link>
        </nav>
    )
}

export default NavHeader;