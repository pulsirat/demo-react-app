import React, { useState, useEffect } from 'react';
import './ExchangeRate.scss';

const countryName = {
    "ZAR": "South Africa",
    "AED": "United Arab Emirates",
    "AFN": "Afghanistan",
    "ALL": "Albania",
    "AMD": "Armenia",
    "ANG": "Netherlands Antilles (Curaçao, Sint Maarten)",
    "AOA": "Angola",
    "ARS": "Argentina",
    "AUD": "Australia",
    "AWG": "Aruba",
    "AZN": "Azerbaijan",
    "BAM": "Bosnia and Herzegovina",
    "BBD": "Barbados",
    "BDT": "Bangladesh",
    "BGN": "Bulgaria",
    "BHD": "Bahrain",
    "BIF": "Burundi",
    "BMD": "Bermuda",
    "BND": "Brunei",
    "BOB": "Bolivia",
    "BRL": "Brazil",
    "BSD": "Bahamas",
    "BTN": "Bhutan",
    "BWP": "Botswana",
    "BYN": "Belarus",
    "BZD": "Belize",
    "CAD": "Canada",
    "CDF": "Democratic Republic of the Congo",
    "CHF": "Switzerland",
    "CLP": "Chile",
    "CNY": "China",
    "COP": "Colombia",
    "CRC": "Costa Rica",
    "CUP": "Cuba",
    "CVE": "Cape Verde",
    "CZK": "Czech Republic",
    "DJF": "Djibouti",
    "DKK": "Denmark",
    "DOP": "Dominican Republic",
    "DZD": "Algeria",
    "EGP": "Egypt",
    "ERN": "Eritrea",
    "ETB": "Ethiopia",
    "EUR": "Eurozone (Multiple countries)",
    "FJD": "Fiji",
    "FKP": "Falkland Islands",
    "GBP": "United Kingdom",
    "GEL": "Georgia",
    "GGP": "Guernsey",
    "GHS": "Ghana",
    "GIP": "Gibraltar",
    "GMD": "Gambia",
    "GNF": "Guinea",
    "GTQ": "Guatemala",
    "GYD": "Guyana",
    "HKD": "Hong Kong",
    "HNL": "Honduras",
    "HRK": "Croatia",
    "HTG": "Haiti",
    "HUF": "Hungary",
    "IDR": "Indonesia",
    "ILS": "Israel",
    "IMP": "Isle of Man",
    "INR": "India",
    "IQD": "Iraq",
    "IRR": "Iran",
    "ISK": "Iceland",
    "JEP": "Jersey",
    "JMD": "Jamaica",
    "JOD": "Jordan",
    "JPY": "Japan",
    "KES": "Kenya",
    "KGS": "Kyrgyzstan",
    "KHR": "Cambodia",
    "KMF": "Comoros",
    "KRW": "South Korea",
    "KWD": "Kuwait",
    "KYD": "Cayman Islands",
    "KZT": "Kazakhstan",
    "LAK": "Laos",
    "LBP": "Lebanon",
    "LKR": "Sri Lanka",
    "LRD": "Liberia",
    "LSL": "Lesotho",
    "LYD": "Libya",
    "MAD": "Morocco",
    "MDL": "Moldova",
    "MGA": "Madagascar",
    "MKD": "North Macedonia",
    "MMK": "Myanmar (Burma)",
    "MNT": "Mongolia",
    "MOP": "Macau",
    "MRU": "Mauritania",
    "MUR": "Mauritius",
    "MVR": "Maldives",
    "MWK": "Malawi",
    "MXN": "Mexico",
    "MYR": "Malaysia",
    "MZN": "Mozambique",
    "NAD": "Namibia",
    "NGN": "Nigeria",
    "NIO": "Nicaragua",
    "NOK": "Norway",
    "NPR": "Nepal",
    "NZD": "New Zealand",
    "OMR": "Oman",
    "PAB": "Panama",
    "PEN": "Peru",
    "PGK": "Papua New Guinea",
    "PHP": "Philippines",
    "PKR": "Pakistan",
    "PLN": "Poland",
    "PYG": "Paraguay",
    "QAR": "Qatar",
    "RON": "Romania",
    "RSD": "Serbia",
    "RUB": "Russia",
    "RWF": "Rwanda",
    "SAR": "Saudi Arabia",
    "SBD": "Solomon Islands",
    "SCR": "Seychelles",
    "SDG": "Sudan",
    "SEK": "Sweden",
    "SGD": "Singapore",
    "SHP": "Saint Helena",
    "SLL": "Sierra Leone",
    "SOS": "Somalia",
    "SRD": "Suriname",
    "SSP": "South Sudan",
    "STN": "São Tomé and Príncipe",
    "SYP": "Syria",
    "SZL": "Eswatini",
    "THB": "Thailand",
    "TJS": "Tajikistan",
    "TMT": "Turkmenistan",
    "TND": "Tunisia",
    "TOP": "Tonga",
    "TRY": "Turkey",
    "TTD": "Trinidad and Tobago",
    "TWD": "Taiwan",
    "TZS": "Tanzania",
    "UAH": "Ukraine",
    "UGX": "Uganda",
    "USD": "United States",
    "UYU": "Uruguay",
    "UZS": "Uzbekistan",
    "VES": "Venezuela",
    "VND": "Vietnam",
    "VUV": "Vanuatu",
    "WST": "Samoa",
    "XAF": "Central African countries",
    "XCD": "Eastern Caribbean countries",
    "XDR": "International Monetary Fund (Special Drawing Rights)",
    "XOF": "West African countries",
    "XPF": "French overseas territories",
    "YER": "Yemen",
    "ZMW": "Zambia",
    "ZWL": "Zimbabwe"
};

const ExchangeRate = () => {
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [rates, setRates] = useState({});

    const handleChange = (e) => {
        setSelectedCurrency(e.target.value);
    };

    useEffect(() => {
        if (!selectedCurrency) return;

        const fetchRates = async () => {
            try {
                const response = await fetch(`https://open.er-api.com/v6/latest/${selectedCurrency}`);
                const data = await response.json();
                setRates(data.rates || {});
            } catch (error) {
                console.error('Error fetching rates:', error);
            }
        };

        fetchRates();
    }, [selectedCurrency]);

    return (
        <div className="dropdown-container">
            <label htmlFor="currency">Select Currency Code:</label>
            <select
                id="currency"
                value={selectedCurrency}
                onChange={handleChange}
                className="dropdown-select"
            >
                <option value="">-- Choose Currency --</option>
                {Object.entries(countryName).map(([code]) => (
                    <option key={code} value={code}>
                        {code}
                    </option>
                ))}
            </select>

            {selectedCurrency && (
                <p className="selected-output">
                    <strong>{selectedCurrency}</strong> is used in{' '}
                    <strong>{countryName[selectedCurrency]}</strong>.
                </p>
            )}

            <div className="rate-box">
                {Object.entries(rates).map(([currency, value]) => (
                    <p className='currency-text' key={currency}>
                        <strong>{currency}</strong>: {value}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default ExchangeRate;
