import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

const NavBar = () => {
    const menuItems = [
        { id: 1, label: 'Resume' },
        { id: 2, label: 'Experience' },
        { id: 3, label: 'Research' },
        { id: 4, label: 'Projects' },
        { id: 5, label: 'Skills' }
    ];
    return (
        <div className="flex justify-start bg-[#000300] rounded-xl p-3 px-4 mx-auto">
            <h1 className="text-[#5dff4e] w-full text-3xl font-extrabold">SWETHA.</h1>
            <ul className="text-white flex">
                <li className="p-4">Resume</li>
                <li className="p-4">Experience</li>
                <li className="p-4">Research</li>
                <li className="p-4">Projects</li>
                <li className="p-4">Skills</li>
            </ul>
            <div>
                <AiOutlineMenu size={20}/>
            </div>
        </div>
    )
}

export default NavBar;