(function () {
    'use strict';

    angular
        .module('app')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$log', '$q', 'toaster', 'errorService'];

    function dataService($http, $log, $q, toaster, errorService) {
        var apiUrl = '../api/';

        var odataUrl = 'odata/';

        var service = {
            addEntity: addEntity,
            updateEntity: updateEntity,
            deleteEntity: deleteEntity,
            softDeleteEntity: softDeleteEntity,
            getEntity: getEntity,
            getEntities: getEntities,
            searchEntities: searchEntities,
            searchEntitiesCount: searchEntitiesCount,
            // End of standard methods.
            getLoggedInUser: getLoggedInUser,
            getFileByteStream: getFileByteStream,
            validate: validate,
            getHistory: getHistory,
            getAuthorization: getAuthorization,
            getLatestUserActionLogs: getLatestUserActionLogs,
        };

        return service;

        function getLatestUserActionLogs(take) {
            return $http.get(apiUrl + 'userActionLogs/getLatestUserActionLogs', { params: { take: take } })
                    .then(getLatestUserActionLogsComplete, getLatestUserActionLogsFailed);

            function getLatestUserActionLogsComplete(response) {
                return response.data;
            }

            function getLatestUserActionLogsFailed(error) {
                errorService.handleError(error);

                return $q.reject(error);
            }
        }

        function getScopedPaymentTypes(contractNumber) {
            return $http.get(apiUrl + 'paymentTypes/getScopedPaymentTypes', { params: { contractNumber: contractNumber }, cache: true })
                    .then(getPaymentTypesComplete, getPaymentTypesFailed);

            function getPaymentTypesComplete(response) {
                return response.data;
            }

            function getPaymentTypesFailed(error) {
                errorService.handleError(error);

                return $q.reject(error);
            }
        }

        function getAuthorization(loginRequired, requiredPermissions, permissionCheckType, uri, parameters) {
            var methodRoute = 'authorize';

            //if (parameters) {
            //    methodRoute = 'authorize/getWithParams';

            //    return $http.post(apiUrl + methodRoute + '?loginRequired=' + loginRequired + '&requiredPermissions=' + requiredPermissions +
            //        '&permissionCheckType=' + permissionCheckType + '&uri=' + uri, parameters)
            //        .then(getAuthorizationComplete, getAuthorizationFailed);
            //} else {
            return $http.get(apiUrl + methodRoute, {
                params: {
                    loginRequired: loginRequired,
                    requiredPermissions: requiredPermissions,
                    permissionCheckType: permissionCheckType,
                    uri: uri,
                    parameters: parameters
                },
                cache: true
            }).then(getAuthorizationComplete, getAuthorizationFailed);
            //}            

            function getAuthorizationComplete(response) {
                return response.data;
            }

            function getAuthorizationFailed(error) {
                errorService.handleError(error);

                return $q.reject(error);
            }
        }

        function getUsers(sectionName) {
            return $http.get(apiUrl + 'users/getUsers', { params: { sectionName: sectionName } })
                    .then(getUsersComplete, getUsersFailed);

            function getUsersComplete(response) {
                return response.data;
            }

            function getUsersFailed(error) {
                errorService.handleError(error);

                return $q.reject(error);
            }
        }

        function addRenewalContract(entityDataStore, entity, showToaster, successMessage, failureMessage) {
            return $http.post(apiUrl + entityDataStore + '/addRenewalContract', entity)
                            .then(addRenewalContractComplete, addRenewalContractFailed);

            function addRenewalContractComplete(response) {
                if (showToaster == undefined ? false : showToaster) {
                    toaster.pop('success', 'Saved', successMessage || 'Saved successfully.');
                }

                return response.data;
            }

            function addRenewalContractFailed(error) {
                errorService.handleError(error, showToaster || true, entityDataStore, failureMessage);

                // If there is a failure method the below line will
                // have it called.
                // http://stackoverflow.com/questions/28076258/reject-http-promise-on-success
                return $q.reject(error);
            }
        }

        function getHistory(typeFullName, id) {
            return $http.get('api/histories', { params: { typeFullName: typeFullName, id: id }, cache: true })
                        .then(getHistoryCompleted, getHistoryFailed);

            function getHistoryCompleted(response) {
                return response;
            }

            function getHistoryFailed(error) {
                errorService.handleError(error);

                return error;
            }
        }

        function getInitialRenewalContract(originalContractNumber) {
            return $http.get('api/contracts/getInitialRenewalContract', { params: { originalContractNumber: originalContractNumber }, cache: true })
                           .then(getInitialRenewalContractComplete, getInitialRenewalContractFailed);

            function getInitialRenewalContractComplete(response) {
                return response.data;
            }

            function getInitialRenewalContractFailed(error) {
                errorService.handleError(error);

                return error;
            }
        }

        function getInitialContract(sectionName) {
            return $http.get('api/contracts/getInitialContract', { params: { sectionName: sectionName }, cache: true })
                        .then(getInitialContractComplete, getInitialContractFailed);

            function getInitialContractComplete(response) {
                return response.data;
            }

            function getInitialContractFailed(error) {
                errorService.handleError(error);

                return error;
            }
        }

        function getFileByteStream(address, fileId) {
            return $http.get('api/files', { params: { address: address || '', fileId: fileId }, responseType: 'arraybuffer', cache: true })
                        .then(getFileByteStreamCompleted)
                        .catch(getFileByteStreamFailed);

            function getFileByteStreamCompleted(response) {
                return response;
            }

            function getFileByteStreamFailed(error) {
                $log.error('XHR failed for getFileByteStream. '
                 + (error.data ? error.data.message + ': ' : '') + (error.data ? error.data.message + ': ' + (error.data.messageDetail || error.data.ExceptionMessage || error.data.Message) : ''));

                return error;
            }
        }

        // OData
        function getLoggedInUser() {
            return $http.get('odata/users/usersService.GetLoggedInUser', { cache: true })
                        .then(getLoggedInUserCompleted)
                        .catch(getLoggedInUserFailed);

            function getLoggedInUserCompleted(response) {
                return response.data;
            }

            function getLoggedInUserFailed(error) {
                $log.error('XHR failed for sendPickupSessionsEmailMessage. '
                  + (error.data ? error.data.message + ': ' : '') + (error.data ? error.data.message + ': ' + (error.data.messageDetail || error.data.ExceptionMessage || error.data.Message) : ''));

                return error;
            }
        }

        function validate(entityDataStore, fieldName, fieldValue, inspectionEntryId) {
            return $http.get(apiUrl + entityDataStore + '/validate/' + fieldName + '/' + fieldValue + '/' + inspectionEntryId, { ignoreLoadingBar: true })
                        .then(validateComplete)
                        .catch(validateFailed);

            function validateComplete(response) {
                return response.data;
            }

            function validateFailed(error) {
                $log.error('XHR failed for sendPickupSessionsEmailMessage. '
                  + (error.data ? error.data.message + ': ' : '') + (error.data ? error.data.message + ': ' + (error.data.messageDetail || error.data.ExceptionMessage || error.data.Message) : ''));

                return error;
            }
        }

        // OData
        function getEntity(entityDataStore, id, expand) {
            if (expand) {
                return $http.get(odataUrl + entityDataStore + (id ? '(' + id + ')' : '') + '?$expand=' + expand)
                            .then(getComplete, getFailed);
            }
            else {
                return $http.get(odataUrl + entityDataStore + (id ? '(' + id + ')' : ''))
                                       .then(getComplete)
                                       .catch(getFailed);
            }
            function getComplete(response) {
                return response.data;
            }

            function getFailed(error) {
                errorService.handleError(error, showToaster || true, entityDataStore, failureMessage);

                // If there is a failure method the below line will have it called.
                // http://stackoverflow.com/questions/28076258/reject-http-promise-on-success
                return $q.reject(error);
            }
        }

        // OData GetEntities.
        function getEntities(entityDataStore, expand) {
            return $http.get(odataUrl + entityDataStore, { params: expand })
                        .then(getEntitiesComplete, getEntitiesFailed);

            function getEntitiesComplete(response) {
                return response.data.value;
            }

            function getEntitiesFailed(error) {
                errorService.handleError(error);

                return $q.reject(error);
            }
        }

        // Replace all $values with ''.
        // OData SearchEntities.
        function searchEntities(entityDataStore, searchCriteria, cache) {
            return $http.get(odataUrl + entityDataStore, {
                params:
                         {
                             $skip: searchCriteria == undefined || searchCriteria.currentPage == undefined ? null : (searchCriteria.currentPage - 1) * searchCriteria.itemsPerPage,
                             $top: searchCriteria == undefined ? null : searchCriteria.itemsPerPage,
                             sort: searchCriteria == undefined ? null : searchCriteria.orderBy,
                             search: searchCriteria == undefined ? null : searchCriteria.searchText,
                             searchFields: searchCriteria == undefined ? null : searchCriteria.searchTextFields,
                             $expand: searchCriteria == undefined ? null : searchCriteria.expand,
                             $filter: searchCriteria == undefined || searchCriteria.q == undefined ? null : searchCriteria.q.replace('=', ' eq '),
                             fields: searchCriteria == undefined ? null : searchCriteria.fields
                         },
                cache: cache == undefined ? false : cache
            })
            .then(searchComplete, searchFailed);

            function searchComplete(response) {
                return response.data.value;
            }

            function searchFailed(error) {
                errorService.handleError(error);

                return $q.reject(error);
            }
        }

        // OData
        function searchEntitiesCount(entityDataStore, searchCriteria, cache) {
            return $http.get(odataUrl + entityDataStore, {
                params:
                        {
                            $count: true,
                            search: searchCriteria == undefined ? null : searchCriteria.searchText,
                            searchFields: searchCriteria == undefined ? null : searchCriteria.searchTextFields,
                            q: searchCriteria == undefined ? null : searchCriteria.q
                        },
                cache: cache == undefined ? false : cache
            })
            .then(searchCountComplete, searchCountFailed);

            function searchCountComplete(response) {
                return response.data['@odata.count'];
            }

            function searchCountFailed(error) {
                errorService.handleError(error);

                return $q.reject(error);
            }
        }

        function updateEntity(entityDataStore, id, entity, showToaster, successMessage, failureMessage, ignoreLoadingBar) {
            return $http.put(apiUrl + entityDataStore + '/' + id, entity)
                            .then(updateEntityComplete, updateEntityFailed);

            function updateEntityComplete(response) {
                if (showToaster == undefined ? false : showToaster) {
                    toaster.pop('success', 'Saved', successMessage || 'Saved successfully.');
                }

                return response.data;
            }

            function updateEntityFailed(error) {
                errorService.handleError(error, showToaster || true, entityDataStore, failureMessage);

                // If there is a failure method the below line will
                // have it called.
                // http://stackoverflow.com/questions/28076258/reject-http-promise-on-success
                return $q.reject(error);
            }
        }

        function addEntity(entityDataStore, entity, showToaster, successMessage, failureMessage) {
            return $http.post(apiUrl + entityDataStore, entity)
                            .then(addEntityComplete)
                            .catch(addEntityFailed);

            function addEntityComplete(response) {
                if (showToaster == undefined ? false : showToaster) {
                    toaster.pop('success', 'Saved', successMessage || 'Saved successfully.');
                }

                return response.data;
            }

            function addEntityFailed(error) {
                errorService.handleError(error, showToaster || true, entityDataStore, failureMessage);

                // If there is a failure method the below line will
                // have it called.
                // http://stackoverflow.com/questions/28076258/reject-http-promise-on-success
                return $q.reject(error);
            }
        }

        function addOrUpdateEntity(entityDataStore, entity, showToaster, successMessage, failureMessage) {
            return $http.post(apiUrl + entityDataStore, entity)
                            .then(addOrUpdateComplete)
                            .catch(addOrUpdateFailed);

            function addOrUpdateComplete(response) {
                if (showToaster == undefined ? true : showToaster) {
                    toaster.pop('success', 'Saved', successMessage || 'Saved successfully.');
                }

                return response.data;
            }

            function addOrUpdateFailed(error) {
                if (showToaster == undefined ? true : (showToaster || failureMessage)) {
                    toaster.pop(
                            {
                                type: 'error',
                                title: 'Problem',
                                timeout: 15000,
                                body: failureMessage || 'Unable to continue, A problem occurred at ' + new Date() + '. '
                                    + ((error.data.ModelState != undefined && error.data.ModelState['']) ? error.data.ModelState[''] : (error.data ? error.data.message + ': ' : '') + (error.data ? error.data.message + ': ' + (error.data.messageDetail || error.data.ExceptionMessage || error.data.Message) : '')),
                                showCloseButton: true
                            });
                }

                $log.error('XHR failed for addOrUpdate ' + entityDataStore + '.'
                    + (error.data ? error.data.message + ': ' : '') + (error.data ? error.data.message + ': ' + (error.data.messageDetail || error.data.ExceptionMessage || error.data.Message) : ''));

                error = undefined; return error;
            }
        }

        function addOrUpdateEntities(entityDataStore, entities, showToaster, successMessage, failureMessage) {
            return $http.post(apiUrl + entityDataStore + '/postEntities', entities)
                            .then(addOrUpdateEntitiesComplete)
                            .catch(addOrUpdateEntitiesFailed);

            function addOrUpdateEntitiesComplete(response) {
                if (showToaster == undefined ? true : showToaster) {
                    toaster.pop('success', 'Saved', successMessage || 'Saved successfully.');
                }

                return response.data;
            }

            function addOrUpdateEntitiesFailed(error) {
                if (showToaster == undefined ? true : showToaster) {
                    toaster.pop(
                            {
                                type: 'error',
                                title: 'Problem',
                                timeout: 15000,
                                body: failureMessage || ('Unable to continue, A problem occurred at ' + new Date() + '. '
                                    + ((error.data.ModelState != undefined && error.data.ModelState['']) ? error.data.ModelState[''] : (error.data ? error.data.message + ': ' : '') + (error.data ? error.data.message + ': ' + (error.data.messageDetail || error.data.ExceptionMessage || error.data.Message) : ''))),
                                showCloseButton: true
                            });
                }

                $log.error('XHR failed for addOrUpdate ' + entityDataStore + '.'
                    + (error.data ? error.data.message + ': ' : '') + (error.data ? error.data.message + ': ' + (error.data.messageDetail || error.data.ExceptionMessage || error.data.Message) : ''));

                error = undefined; return error;
            }
        }

        function deleteEntity(entityDataStore, id) {
            return $http.delete(apiUrl + entityDataStore + '/' + id)
                        .then(deleteComplete, deleteFailed);

            function deleteComplete(response) {
                return response.data;
            }

            function deleteFailed(error) {
                errorService.handleError(error, showToaster || true, entityDataStore, failureMessage);

                // If there is a failure method the below line will
                // have it called.
                // http://stackoverflow.com/questions/28076258/reject-http-promise-on-success
                return $q.reject(error);
            }
        }

        function softDeleteEntity(entityDataStore, id) {
            return $http.delete(apiUrl + entityDataStore + '/' + id, {
                params: {
                    softDelete: true,
                },
            })
            .then(softDeleteComplete, softDeleteFailed);

            function softDeleteComplete(response) {
                return response.data;
            }

            function softDeleteFailed(error) {
                errorService.handleError(error, showToaster || true, entityDataStore, failureMessage);

                // If there is a failure method the below line will
                // have it called.
                // http://stackoverflow.com/questions/28076258/reject-http-promise-on-success
                return $q.reject(error);
            }
        }

    }
})();
