import { columnList } from "../common/columnList";

export default function TableHeader() {

    return (
        <tr>
            {columnList.map(header => (
                <th key={header.field} style={{ width: `${header.width}px`, border: `1px solid black` }}>{header.field}</th>
            ))}
        </tr>
    );
}
