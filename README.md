# DNAC integration with Tableau

A web data connector (WDC) to make use of DNAC API calls to get wireless health data and orchestrate into data reporting tool Tableau.

---

The "wdc.html" file will be the landing web page allowing user input. The input data will determine which devices' wireless health data to be retrieved in DNAC API calls later on. The filter can be exact match or containing string.

The "wdcdata.js" file will take the user input from "wdc.html" and call DNAC API accordingly. This javascript is embedded in "wdc.html" and composed under the WDC framework provided by Tableau. Data schema and retrieved data will be passed to Tableau. For the DNAC API calls, this script first authenticates with DNAC. Then it retrieves all network devices according to the filter by device name. Finally, for each network device, it gets all the device details.


## Contacts
* Alvin Lau (alvlau@cisco.com)



## Solution Components
* DNA Center (version 1.3.1.4)
* DNA Center Intent API (version 1.3.1.x)
* Tableau (version 10.4 or later)
* Tableau Javascript SDK (version 2.3.0)
* HTML 5
* NodeJS (version 12.16.3 or later) if you host the webpage locally


![Journey  DNAC + Tableau](DNAC_Tableau_Journey.png)


This PoV showcases the integration using DNA Center with the DNA Center Intent API, to extract information for the wireless network, store the data to have the possibility to have insights longer than 14 days and display it into customized dashboard using third party solution – Tableau as the data reporting tool.


You  need to install a Web Data Connector to be able to store network data without constraint of time span and to use data reporting tool in place to create analytic dashboard so that operation efficiency can be enhanced.


## Requirements


-  DNA Center - If you do not have a  DNAC, you  can use the sandbox https://devnetsandbox.cisco.com/RM/Diagram/Index/471eb739-323e-4805-b2a6-d0ec813dc8fc?diagramType=Topology

-  Tableau : This 3rd party application will be connected to the Web Data Connector WDC and should be hosted in your local laptop or in a server that has connectivity with the  DNA Center

- HTML
- Javascript  - The code will be run in  a local laptop or in a server that has connectivity to DNAC

![High Level Design](DNAC_Tableau_HLD.png)



## Installation

1. Clone this repository.<br>
```
git clone <this repo>
```

2. In "wdcdata.js", update your DNAC hostname, username and password.
```
DNAC_HOST = "your_dnac";
DNAC_USER = "dnac_username";
DNAC_PASSWORD = "dnac_password";
```

3. Host the webpage in a server or locally on your laptop. If you proceed to host locally, you may follow the below steps.
```
npm install -g http-server
http-server ./ -p 8080
```
  You webpage can be accessed at http://localhost:8080/wdc.html.


## Usage

1. Host the WDC in the server of your choice.
2. From Tableau, under "Connect" select "Web Data Connector".
3. Put the URL of the WDC pointing at the "wdc.html" in the pop-up window. It would be http://localhost:8080/wdc.html if you chose to host locally.




## License
Provided under Cisco Sample Code License, for details see [LICENSE](./LICENSE)


## Code of Conduct
Our code of conduct is available [here](./CODE_OF_CONDUCT.md)


## Contributing
See our contributing guidelines [here](./CONTRIBUTING.md)
