const AssertionUtil = require('../AssertionUtil');
const LeonardoIoT = require('../../../lib/LeonardoIoT');

const authorizationUrl = 'https://authorization.cfapps.eu10.hana.ondemand.com';

describe('Authorization Service', function () {
    let client;

    beforeEach(function () {
        client = new LeonardoIoT();
    });

    describe('ObjectGroup', function () {
        it('create', function () {
            const objectGroupPayload = { Name: 'MyObjectGroup' };
            client.request = (requestConfig) => {
                AssertionUtil.assertRequestConfig(requestConfig, {
                    url: `${authorizationUrl}/ObjectGroups`,
                    method: 'POST',
                    body: objectGroupPayload
                });
            };

            return client.createObjectGroup(objectGroupPayload);
        });

        it('read single', function () {
            const objectGroupId = 'MyObjectGroup';
            client.request = (requestConfig) => {
                AssertionUtil.assertRequestConfig(requestConfig, {
                    url: `${authorizationUrl}/ObjectGroups('${objectGroupId}')`,
                });
            };

            return client.getObjectGroup(objectGroupId);
        });

        it('read multiple', function () {
            client.request = (requestConfig) => {
                AssertionUtil.assertRequestConfig(requestConfig, {
                    url: `${authorizationUrl}/ObjectGroups`,
                });
            };

            return client.getObjectGroups();
        });

        it('read root', function () {
            client.request = (requestConfig) => {
                AssertionUtil.assertRequestConfig(requestConfig, {
                    url: `${authorizationUrl}/ObjectGroups/TenantRoot`
                });
            };

            return client.getRootObjectGroup();
        });

        it('delete', function () {
            const objectGroupId = 'MyObjectGroup';
            const etag = '8f9da184-5af1-4237-8ede-a7fee8ddc57e';
            client.request = (requestConfig) => {
                AssertionUtil.assertRequestConfig(requestConfig, {
                    url: `${authorizationUrl}/ObjectGroups('${objectGroupId}')`,
                    method: 'DELETE',
                    headers: { 'If-Match': etag }
                });
            };

            return client.deleteObjectGroup(objectGroupId, etag);
        });
    });
});
