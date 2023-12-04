import React, { Link } from "react-router-dom"
import { Children } from "react";
import {ReactNode} from 'react';


interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout({children}: DefaultLayoutProps){
    return(
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/">Login</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>{children}</main>
        </>
    );
}
