import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { ProductboardTestingRound2Auth } from '../ProductboardTestingRound2Auth';
import { ListAllNotesInput } from './input';
import { ListAllNotesOutput } from './output';
import { globalConfigHttp } from '../GlobalConfig';
import { OperationHandlerResult, OperationHandlerError } from '@trayio/cdk-dsl/connector/operation/OperationHandler';

export const listAllNotesHandler = OperationHandlerSetup.configureHandler<
	ProductboardTestingRound2Auth,
	ListAllNotesInput,
	ListAllNotesOutput
>((handler) =>
	handler.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
		http
			.get('/notes')
			.handleRequest((ctx, input, request) =>
				request
					.addQueryString('term', input.term)
					.addQueryString('featureId', input.featureId as string)
					.addQueryString('companyId', input.companyId as string)
					.addQueryString('pageCursor', input.pageCursor as string)
					.withoutBody()
			)
			.handleResponse((ctx, input, response) =>
				response
					.withErrorHandling(() => {
						if (response.getStatusCode() === 422) {
							return OperationHandlerResult.failure(
								OperationHandlerError.userInputError('Page Cursor has expired')
							);
						}
						return OperationHandlerResult.failure(
							OperationHandlerError.apiError(`API error: ${response.getStatusCode()}`)
						);
					})
					.parseWithBodyAsJson()
			)
	)
);