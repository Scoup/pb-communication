// package: discounts
// file: discounts/discount.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as discounts_discount_pb from "../discounts/discount_pb";

interface IDiscountServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    get: IDiscountServiceService_IGet;
}

interface IDiscountServiceService_IGet extends grpc.MethodDefinition<discounts_discount_pb.DiscountRequest, discounts_discount_pb.DiscountResponse> {
    path: string; // "/discounts.DiscountService/Get"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<discounts_discount_pb.DiscountRequest>;
    requestDeserialize: grpc.deserialize<discounts_discount_pb.DiscountRequest>;
    responseSerialize: grpc.serialize<discounts_discount_pb.DiscountResponse>;
    responseDeserialize: grpc.deserialize<discounts_discount_pb.DiscountResponse>;
}

export const DiscountServiceService: IDiscountServiceService;

export interface IDiscountServiceServer {
    get: grpc.handleUnaryCall<discounts_discount_pb.DiscountRequest, discounts_discount_pb.DiscountResponse>;
}

export interface IDiscountServiceClient {
    get(request: discounts_discount_pb.DiscountRequest, callback: (error: grpc.ServiceError | null, response: discounts_discount_pb.DiscountResponse) => void): grpc.ClientUnaryCall;
    get(request: discounts_discount_pb.DiscountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: discounts_discount_pb.DiscountResponse) => void): grpc.ClientUnaryCall;
    get(request: discounts_discount_pb.DiscountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: discounts_discount_pb.DiscountResponse) => void): grpc.ClientUnaryCall;
}

export class DiscountServiceClient extends grpc.Client implements IDiscountServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public get(request: discounts_discount_pb.DiscountRequest, callback: (error: grpc.ServiceError | null, response: discounts_discount_pb.DiscountResponse) => void): grpc.ClientUnaryCall;
    public get(request: discounts_discount_pb.DiscountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: discounts_discount_pb.DiscountResponse) => void): grpc.ClientUnaryCall;
    public get(request: discounts_discount_pb.DiscountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: discounts_discount_pb.DiscountResponse) => void): grpc.ClientUnaryCall;
}
