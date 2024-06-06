import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { retrieveASpecificNoteHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(retrieveASpecificNoteHandler, (handlerTest) =>
	handlerTest
		.usingHandlerContext('test')
		.nothingBeforeAll()
		.testCase('should retrieve a specific note by ID', (testCase) =>
			testCase
				.givenNothing()
				.when(() => ({ id: 40340269 }))
				.then(({ output }) => {
					const outputValue =
						OperationHandlerResult.getSuccessfulValueOrFail(output);
					// Add your assertions here based on the expected output
					// For example:
					// expect(outputValue.data).toEqual(expectedData);
				})
				.finallyDoNothing()
		)
		.nothingAfterAll()
);