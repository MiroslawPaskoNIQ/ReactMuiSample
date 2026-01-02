import { columnList } from "../common/columnList";
import type { Retailer } from "../common/Retailer";

interface MyComponentProps {
  retailer: Retailer;
}

export default function TableRow( retailer:Retailer ) {
    

    return (Object.entries(retailer).map(retailerField => ( 
        retailerField[0] != "RowId" ?
            <span 
                key={retailerField[0]} 
                style={{ display: `inline-block`, border: `1px solid black`, width: columnList.filter(p => p.field == retailerField[0])[0].width -2, height: `100%` }}
            >
                {retailerField[1]}
            </span>
        : ""
    )));
}


            
        

        