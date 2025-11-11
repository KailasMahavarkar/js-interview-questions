export interface ExplorerConfig {
    id: string;
    name: string;
    isFolder: boolean;
    items: ExplorerConfig[];
}
