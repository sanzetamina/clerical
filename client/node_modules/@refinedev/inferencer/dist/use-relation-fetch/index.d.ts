import { FieldInferencer, InferField, InferencerComponentProps } from "../types";
declare type UseRelationFetchProps = {
    record?: Record<string, unknown>;
    fields?: (InferField | null | false)[];
    infer: FieldInferencer;
    meta?: InferencerComponentProps["meta"];
};
export declare const useRelationFetch: ({ record, fields, infer, meta, }: UseRelationFetchProps) => {
    fields: InferField[];
    loading: boolean;
    initial: boolean;
};
export {};
//# sourceMappingURL=index.d.ts.map