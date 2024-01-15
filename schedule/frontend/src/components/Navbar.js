import "./Navbar.css";

// Components
import { BsSearch, BsClock } from "react-icons/bs";

// Hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ selectedRoute }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };
  
  return (
    <nav id="nav">
      {selectedRoute ? (
        <h3>{selectedRoute}</h3>
      ) : (
        <span id="legend">
          <BsClock /> 
          <h2>Schedule</h2>
        </span>
      )}
      
      <form id="search-form" onSubmit={handleSearch}>
        <BsSearch />
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </nav>
  );
};

export default Navbar;
