import { InferencerComponentProps } from "../../types";
declare type Action = keyof NonNullable<InferencerComponentProps["meta"]>[string];
export declare const getMetaProps: (identifier?: string, meta?: InferencerComponentProps["meta"], action?: Action) => string;
export declare const pickMeta: (identifier?: string, meta?: InferencerComponentProps["meta"], actions?: Action[]) => Record<string, unknown> | undefined;
export {};
//# sourceMappingURL=index.d.ts.map