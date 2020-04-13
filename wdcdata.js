/**
 * @license
 * Copyright (c) 2020 Cisco and/or its affiliates.
 *
 * This software is licensed to you under the terms of the Cisco Sample
 * Code License, Version 1.1 (the "License"). You may obtain a copy of the
 * License at
 *
 *                https://developer.cisco.com/docs/licenses
 *
 * All use of the material herein must be in accordance with the terms of
 * the License. All rights not expressly granted by the License are
 * reserved. Unless required by applicable law or agreed to separately in
 * writing, software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied.
 */


// update your DNAC details here
DNAC_HOST = "your_dnac";
DNAC_USER = "dnac_username";
DNAC_PASSWORD = "dnac_password";

(function () {
    var myConnector = tableau.makeConnector();

    // provide data schema to be imported to Tableau
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "HALastResetReason",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "managementIpAddr",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "HAPrimaryPowerStatus",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "redundancyMode",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "communicationState",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "nwDeviceName",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "redundancyUnit",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "platformId",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "redundancyPeerState",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "nwDeviceId",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "redundancyState",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "nwDeviceRole",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "nwDeviceFamily",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "macAddress",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "collectionStatus",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "deviceSeries",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "osType",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "clientCount",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "HASecondaryPowerStatus",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "softwareVersion",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "nwDeviceType",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "overallHealth",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "memoryScore",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "cpuScore",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "noiseScore",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "utilizationScore",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "airQualityScore",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "interferenceScore",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "wqeScore",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "freeMbufScore",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "packetPoolScore",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "freeTimerScore",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "memory",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "cpu",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "noise",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "utilization",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "airQuality",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "interference",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "wqe",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "freeMbuf",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "packetPool",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "freeTimer",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "location",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "timestamp",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "DeviceList",
            alias: "Get Device List with Health Scores",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // do API calls to retrieve data from DNAC
    myConnector.getData = function(table, doneCallback) {
        var filterObj = JSON.parse(tableau.connectionData);
        var filter = filterObj.filter;
        tableau.log(filter);

        var auth = {
            "url": DNAC_HOST + "/dna/system/api/v1/auth/token",
            "method": "POST",
            "headers": {
              "Authorization": "Basic " + btoa(DNAC_USER + ":" + DNAC_PASSWORD)
            }
        };

        $.ajax(auth).done(function(auth_res) {
            token = auth_res['Token'];
            tableau.log(token);

            var device_list = {
                "url": DNAC_HOST + "/dna/intent/api/v1/network-device",
                "method": "GET",
                "headers": {
                    "X-Auth-Token": token,
                }
            }

            $.ajax(device_list).done(function(device_list_res){
                var device_list_data = device_list_res['response'];
                var matching_data = [];
                var tableData = [];

                tableau.log(device_list_data);
                for(var i=0, len=device_list_data.length; i<len; i++){
                    if(device_list_data[i].hostname.includes(filter)){
                        matching_data.push(device_list_data[i]);
                    }
                }
                tableau.log(matching_data);

                if(filter == ""){
                    matching_data = device_list_data;
                }

                for(var i=0, len=matching_data.length; i<len; i++){
                    $.ajax({
                        url: DNAC_HOST + "/dna/intent/api/v1/device-detail?searchBy=" + matching_data[i].id + "&identifier=uuid",
                        method: "GET",
                        headers: { "X-Auth-Token": token },
                        async: false,
                        success: function(device_details_res){
                            var device_details_data = JSON.parse(device_details_res)['response'];
                            tableau.log(device_details_data);

                            tableData.push({
                                "HALastResetReason": device_details_data.HALastResetReason,
                                "managementIpAddr": device_details_data.managementIpAddr,
                                "HAPrimaryPowerStatus": device_details_data.HAPrimaryPowerStatus,
                                "redundancyMode": device_details_data.redundancyMode,
                                "communicationState": device_details_data.communicationState,
                                "nwDeviceName": device_details_data.nwDeviceName,
                                "redundancyUnit": device_details_data.redundancyUnit,
                                "platformId": device_details_data.platformId,
                                "redundancyPeerState": device_details_data.redundancyPeerState,
                                "nwDeviceId": device_details_data.nwDeviceId,
                                "redundancyState": device_details_data.redundancyState,
                                "nwDeviceRole": device_details_data.nwDeviceRole,
                                "nwDeviceFamily": device_details_data.nwDeviceFamily,
                                "macAddress": device_details_data.macAddress,
                                "collectionStatus": device_details_data.collectionStatus,
                                "deviceSeries": device_details_data.deviceSeries,
                                "osType": device_details_data.osType,
                                "clientCount": device_details_data.clientCount,
                                "HASecondaryPowerStatus": device_details_data.HASecondaryPowerStatus,
                                "softwareVersion": device_details_data.softwareVersion,
                                "nwDeviceType": device_details_data.nwDeviceType,
                                "overallHealth": device_details_data.overallHealth,
                                "memoryScore": device_details_data.memoryScore,
                                "cpuScore": device_details_data.cpuScore,
                                "noiseScore": device_details_data.noiseScore,
                                "utilizationScore": device_details_data.utilizationScore,
                                "airQualityScore": device_details_data.airQualityScore,
                                "interferenceScore": device_details_data.interferenceScore,
                                "wqeScore": device_details_data.wqeScore,
                                "freeMbufScore": device_details_data.freeMbufScore,
                                "packetPoolScore": device_details_data.packetPoolScore,
                                "freeTimerScore": device_details_data.freeTimerScore,
                                "memory": device_details_data.memory,
                                "cpu": device_details_data.cpu,
                                "noise": device_details_data.noise,
                                "utilization": device_details_data.utilization,
                                "airQuality": device_details_data.airQuality,
                                "interference": device_details_data.interference,
                                "wqe": device_details_data.wqe,
                                "freeMbuf": device_details_data.freeMbuf,
                                "packetPool": device_details_data.packetPool,
                                "freeTimer": device_details_data.freeTimer,
                                "location": device_details_data.location,
                                "timestamp": device_details_data.timestamp
                            });
                        }
                   });
                }
                tableau.log(tableData);

                table.appendRows(tableData);
                doneCallback();
            });
        });
    };

    tableau.registerConnector(myConnector);

    // store user input when submitted and pass on within the WDC
    $(document).ready(function () {
        $("#submitButton").click(function () {
            var filterObj = {
                filter: $('#filter').val()
            };

            tableau.connectionData = JSON.stringify(filterObj);
            tableau.connectionName = "DNAC Data";
            tableau.submit();
        });
    });
})();
