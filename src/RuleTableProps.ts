import { SearchLogEntry } from "./boyerMoore";

export interface RuleTableProps<T> {
    ruleTable: T;
    logEntry: SearchLogEntry|null;
    haystack: string;
    needle: string;
}
