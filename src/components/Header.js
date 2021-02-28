import React from "react";
import Search from "./Search";

function Header() {
    function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitted");
    }

    return (
        <div className="container">
            <header>
                <div className="inside-container">
                    <form onSubmit={handleSubmit}>
                        <Search />
                    </form>
                </div>
            </header>
        </div>
    );
}

export default Header;
