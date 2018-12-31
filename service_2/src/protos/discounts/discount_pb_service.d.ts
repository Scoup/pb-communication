// package: discounts
// file: discounts/discount.proto

import * as discounts_discount_pb from "../discounts/discount_pb";
import * as grpc from "grpc";

type DiscountServiceGet = {
  readonly methodName: string;
  readonly service: typeof DiscountService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof discounts_discount_pb.DiscountRequest;
  readonly responseType: typeof discounts_discount_pb.DiscountResponse;
};

export class DiscountService {
  static readonly serviceName: string;
  static readonly Get: DiscountServiceGet;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: () => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: () => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class DiscountServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.LoadObjectOptions);
  get(
    requestMessage: discounts_discount_pb.DiscountRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: discounts_discount_pb.DiscountResponse|null) => void
  ): UnaryResponse;
  get(
    requestMessage: discounts_discount_pb.DiscountRequest,
    callback: (error: ServiceError|null, responseMessage: discounts_discount_pb.DiscountResponse|null) => void
  ): UnaryResponse;
}

