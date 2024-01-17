import React from 'react';
import Offer from '../components/Offer-component'


export default function Home() {

    return (
        <div className="home">
            <section className="text-center mt-5">
                <h2 className="mb-4">Offre d'emploi</h2>
                <br/>
                <Offer />
            </section>
            <aside>
            </aside>
        </div>
    )
}
