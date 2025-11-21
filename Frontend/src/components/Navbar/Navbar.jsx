import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
     <img className="logo-img" src= "https://cdn-icons-png.flaticon.com/512/16847/16847436.png"/>

      <ul className="nav-links">
        <li>Dashboard</li>
        <li>My Courses</li>
        <li>Live Classes</li>
        <li>Assignments</li>
        <li>Exams & Results</li>
        <li>Certificates</li>
        <li>Profile</li>
        <li className="logout">Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
