
import styles from './Nav.module.css'
const Nav = () => {
    
    return (
        <nav id={styles.mainNav} className="navbar navbar-expand-sm navbar-dark">
            <div className="container-fluid text-center">
                <a className="navbar-brand col-4" href="/">BugBook</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                
                <form className="d-flex col-8">
                    <input className="form-control me-2" type="text" placeholder="Search" />
                    <button className="btn btn-primary" type="button">Search</button>
                </form>
                </div>
            </div>
        </nav>

    )
}

export default Nav;