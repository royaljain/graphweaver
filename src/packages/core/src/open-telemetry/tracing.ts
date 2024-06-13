import process from 'process';
import { Span, SpanOptions, SpanStatusCode, Tracer, trace as traceApi } from '@opentelemetry/api';
import * as opentelemetry from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';

// Check is env variable is set to enable tracing
const enableTracing = process.env.OTEL_EXPORTER_OTLP_ENDPOINT ? true : false;

// Decorator to add tracing to any instance method
// Usage:
// @Trace()
// async myMethod() {
//   // Do something
// }
export function TraceMethod() {
	return (_target: any, _fieldName: string, descriptor: PropertyDescriptor) => {
		if (enableTracing) {
			const originalMethod = descriptor.value;
			descriptor.value = function (...args: any[]) {
				return trace(originalMethod.bind(this)).apply(this, args);
			};
		}
	};
}

export interface Trace {
	span: Span;
	tracer: Tracer;
}

export // A generic type to wrap the function args in an array and add Span
type WithSpan<Args extends any[]> = [...Args, Trace | undefined];
export const trace =
	<Args extends any[], T>(
		fn: (...params: WithSpan<Args>) => Promise<T>,
		spanOptions: SpanOptions = {},
		spanName: string = fn.name
	) =>
	async (...functionArgs: Args) => {
		// Check if tracing is enabled
		if (!enableTracing) {
			return fn(...functionArgs, undefined);
		}

		const tracer = traceApi.getTracer('graphweaver');

		return tracer.startActiveSpan(spanName, spanOptions, async (span: Span) => {
			try {
				const traceArg: Trace = { span, tracer };
				const args = [...functionArgs, traceArg] as WithSpan<Args>;
				const result = await fn(...args);
				span.setStatus({
					code: SpanStatusCode.OK,
				});
				return result;
			} catch (error: any) {
				const errorMessage = String(error);
				span.setStatus({ code: SpanStatusCode.ERROR, message: errorMessage });
				span.recordException(error);
				throw error;
			} finally {
				span.end();
			}
		});
	};

export const startTracing = () => {
	if (enableTracing) {
		const traceExporter = new OTLPTraceExporter({
			url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces`,
		});

		const sdk = new opentelemetry.NodeSDK({
			traceExporter,
			resource: new Resource({
				['service.name']: process.env.SERVICE_NAME ?? 'Graphweaver',
			}),
		});
		// initialize the SDK and register with the OpenTelemetry API
		// this enables the API to record telemetry
		sdk.start();

		// gracefully shut down the SDK on process exit
		process.on('SIGTERM', () => {
			sdk
				.shutdown()
				.then(() => console.log('Tracing terminated'))
				.catch((error) => console.log('Error terminating tracing', error))
				.finally(() => process.exit(0));
		});
	}
};
