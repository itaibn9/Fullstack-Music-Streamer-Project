import React from 'react'
import { Link } from "react-router-dom";
import './NotFoundPage.css';
function NotFoundPage() {
    return (
        <div className="notfoundPage">
             <div className="mainbox">
            <div className="err">4</div>
            <div className="err1">0</div>
            <div className="err2">4</div>
            <div className="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place? Or Maybe it's just in development...
            <p>Let's go <Link className="linkToHome" to="/">home</Link> and try from there.</p></div>
             </div>
                </div>
    )
}

export default NotFoundPage;
