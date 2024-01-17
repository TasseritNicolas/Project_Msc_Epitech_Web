import React from 'react';
import GetHistory from './getHistory-component';
import GetUser from './getUser-component';
import Cardannonce from './cardAnnonce-component';
import Adduser from './addUser-component';
import AddAnnonce from './addAnnonce-component';
import AddHistory from './addHistory-component';

export default function AdminListComponent() {
    return (
        <div className="container mt-5">
            <div className="row">

                {/* Users section */}
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h2 className="mb-0">Users</h2>
                        </div>
                        <div className="card-body">
                            <h4>List of all users</h4>
                            <GetUser />
                        </div>
                        <div className="card-footer">
                            <h4>Add users</h4>
                            <Adduser />
                        </div>
                    </div>
                </div>

                {/* History section */}
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header bg-secondary text-white">
                            <h2 className="mb-0">History</h2>
                        </div>
                        <div className="card-body">
                            <h4>List of history</h4>
                            <GetHistory/>
                        </div>
                        <div className="card-footer">
                            <h4>Add history</h4>
                            <AddHistory />
                        </div>
                    </div>
                </div>

                {/* Annonces section */}
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header bg-info text-white">
                            <h2 className="mb-0">Annonces</h2>
                        </div>
                        <div className="card-body">
                            <h4>List of all annonces</h4>
                            <Cardannonce />
                        </div>
                        <div className="card-footer">
                            <h4>Add annonces</h4>
                            <AddAnnonce />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
