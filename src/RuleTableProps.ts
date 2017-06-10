import { SearchLog } from "./boyerMoore";

export interface RuleTableProps<T> {
    ruleTable: T;
    action: SearchLog;
    haystack: string;
    needle: string;
}
