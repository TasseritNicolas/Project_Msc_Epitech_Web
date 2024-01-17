import React from 'react';
import AddAnnonce from './addAnnonce-component';
import Cardannonce from "./cardAnnonce-component";

export default function PosteComponent(){
    return(
        <div >
            <div className="row">
                <div className="col">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h2 className="mb-0">Add an annonces</h2>
                        </div>
                        <div className="card-footer">
                            <h4>Add annonces</h4>
                            <AddAnnonce />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header bg-info text-white">
                            <h2 className="mb-0">Annonces</h2>
                        </div>
                        <div className="card-body">
                            <h4>List of all annonces</h4>
                            <Cardannonce />
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}