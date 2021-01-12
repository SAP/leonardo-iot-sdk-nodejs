const AssertionUtil = require('../AssertionUtil');
const LeonardoIoT = require('../../../lib/LeonardoIoT');

const appiotMdsUrl = 'https://appiot-mds.cfapps.eu10.hana.ondemand.com';

describe('Time Series Store', function () {
    let client;
    let currentTime;

    beforeEach(function () {
        client = new LeonardoIoT();
        currentTime = new Date().toISOString();
    });

    describe('Time Series Data', function () {
        it('read thing snapshot', function () {
            const thingId = 'MyThing';
            const dataCategory = 'TimeSeries';

            client.request = (requestConfig) => {
                AssertionUtil.assertRequestConfig(requestConfig, {
                    url: `${appiotMdsUrl}/Snapshot(thingId='${thingId}',fromTime='',dataCategory='${dataCategory}')`
                });
            };

            return client.getThingSnapshot(thingId, dataCategory);
        });

        it('read thing snapshot within time range', function () {
            const thingId = 'MyThing';
            const fromTime = currentTime;
            const toTime = new Date().toISOString();
            const dataCategory = 'TimeSeries';

            client.request = (requestConfig) => {
                AssertionUtil.assertRequestConfig(requestConfig, {
                    url: `${appiotMdsUrl}/v2/Snapshot(thingId='${thingId}',fromTime='${fromTime}',toTime='${toTime}',dataCategory='${dataCategory}')`
                });
            };

            return client.getThingSnapshotWithinTimeRange(thingId, fromTime, toTime, dataCategory);
        });

        it('recalculate aggregates', function () {
            const thingId = 'MyThing';
            const thingTypeName = 'MyThingType';
            const propertySetName = 'MyPropertySet';
            const fromTime = currentTime;
            const toTime = new Date().toISOString();

            client.request = (requestConfig) => {
                AssertionUtil.assertRequestConfig(requestConfig, {
                    method: 'POST',
                    url: `${appiotMdsUrl}/Things('${thingId}')/${thingTypeName}/${propertySetName}/RecalculateAggregate?timerange=${fromTime}-${toTime}`
                });
            };

            return client.recalculateAggregates(thingId, thingTypeName, propertySetName, fromTime, toTime);
        });
    });
});
