import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './views/LoginPage';
import ProfilePage from './views/ProfilePage';
import DashboardPage from './views/DashboardPage';
import NoPage from './views/NoPage';
import SignUpPage from './views/SignUpPage';
import MonetizePage from './views/MonetizePage'

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/links" element={<DashboardPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/monetize" element={<MonetizePage/>} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        );
    }

    async populateWeatherData() {
        const response = await fetch('/api/weatherforecast');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
