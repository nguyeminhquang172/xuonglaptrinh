angular .module('app')
		.controller('invoiceCtr', ['$scope', 'getInvoice', function($scope, getInvoice){
			getInvoice.getData().then(function(data){
				$scope.dataInvoices = data;
				console.log($scope.dataInvoices);
			})
		}])