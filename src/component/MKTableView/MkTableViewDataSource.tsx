import ReactElement = React.ReactElement;

/**
 * Created by Gene on 16/4/8.
 */

interface IndexPath {
    section: number,
    row:number
}

interface MkTableViewDataSource {
    numberOfRowsInSection(tableView: ReactElement<any>|any, section: number): number;
    cellForRowAtIndexPath(tableView: ReactElement<any>, indexPath: IndexPath, settings: Object): ReactElement<any>;
    numberOfSectionsInTableView(tableView: ReactElement<any>|any): number;
    titleForHeaderInSection?(tableView: ReactElement<any>, section: number): string;
    titleForFooterInSection?(tableView: ReactElement<any>, section: number): string;
    // todo 暂时未实现
    canEditRowAtIndexPath?(tableView: ReactElement<any>, indexPath: IndexPath): boolean;
    canMoveRowAtIndexPath?(tableView: ReactElement<any>, indexPath: IndexPath): boolean;
    sectionIndexTitlesForTableView?(tableView: ReactElement<any>): Array<string>;
    moveRowAtIndexPathToIndexPath?(sourceIndexPath: IndexPath, destinationIndexPath: IndexPath): void
}
