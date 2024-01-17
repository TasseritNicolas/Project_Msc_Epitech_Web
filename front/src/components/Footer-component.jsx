import React from 'react';
import '../Style/style.css';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <div id="page-container">
            <div id="content-wrap">
            </div>
            <footer>
                <div className="text-center py-2">
                    {`© JobBoard - MyJob - ${year}`}
                </div>
            </footer>
        </div>
    );
}
