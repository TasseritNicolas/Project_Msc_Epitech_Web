import React, {useState} from 'react';



export default function More (props){
    const {announces} = props;
    console.log(announces.description)

    const text = "Societe : " + announces.societe +  "| Description : " + announces.description + " |  Lieu : " + announces.adresse + " | Compétence : " + announces.competence + "   Contrat : " + announces.contrat

    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
        console.log(text);
    };
    return (
        <p className="text">
            {isReadMore ? text.slice(0, 15) : text}
            <span  onClick={toggleReadMore} className="read-or-hide text-primary">
          {isReadMore ? "...En savoir plus" : " Réduire"}
        </span>
        </p>
    );
};
