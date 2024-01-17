import React from 'react';
import More from './More-component';
import Applybouton from './button-component';


 export default function Card(props){
    const {announces} = props;


    const dateParser = (date) => {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return newDate;
    };

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">{announces.intitule}</h2>
                <em className="card-subtitle mb-2 text-muted">Posté le {dateParser(announces.createdAt)}</em>

                <More announces={announces} />
                <Applybouton announces={announces} />

            </div>
            <br/>
            <br/>
        </div>
    );
};



