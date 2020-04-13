# DNAC integration with Tableau

A web data connector (WDC) to make use of DNAC API calls to get wireless health data and orchestrate into data reporting tool Tableau.

---

The "wdc.html" file will be the landing web page allowing user input. The input data will determine which devices' wireless health data to be retrieved in DNAC API calls later on. The filter can be exact match or containing string.

The "wdcdata.js" file will take the user input from "wdc.html" and call DNAC API accordingly. This javascript is embedded in "wdc.html" and composed under the WDC framework provided by Tableau. Data schema and retrieved data will be passed to Tableau. For the DNAC API calls, this script first authenticates with DNAC. Then it retrieves all network devices according to the filter by device name. Finally, for each network device, it gets all the device details.


## Contacts
* Alvin Lau (alvlau@cisco.com)
* Abdelbar Aglagane (agabdelb@cisco.com)


## Solution Components
* DNAC
* javascript


## Installation

In "wdcdata.js", update your DNAC hostname, username and password

DNAC_HOST = "your_dnac";
DNAC_USER = "dnac_username";
DNAC_PASSWORD = "dnac_password";


## Usage

1. Host the WDC in the server of your choice. (Using ngrok would be a quick alternative.)
2. From Tableau, under "Connect" select "Web Data Connector".
3. Put the URL of the WDC pointing at the "wdc.html" in the pop-up window.


## License
Provided under Cisco Sample Code License, for details see [LICENSE](./LICENSE)


## Code of Conduct
Our code of conduct is available [here](./CODE_OF_CONDUCT.md)


## Contributing
See our contributing guidelines [here](./CONTRIBUTING.md)
